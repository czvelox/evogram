import axios from 'axios';
import fs from 'node:fs';
import { ContextManager, Evogram } from '..';
import { KeyboardConvert } from '../keyboard';

export class ApiWorker {
	private url: string; // Private variable to store the base URL of the Telegram API
	private defaultParams: Record<string, any> = {}; // Private variable to store default parameters for API calls

	/**
	 * Set default parameters for a specific API method.
	 * @param {string} method - The API method for which default parameters are being set.
	 * @param {Record<string, any>} [params] - Optional default parameters to be set for the specified method.
	 */
	public setDefaultParams(method: string, params?: Record<string, any>): void {
		if (params) {
			this.defaultParams[method] = params;
		}
	}

	/**
	 * Initializes the ApiWorker instance with the provided bot token.
	 */
	constructor(protected client: Evogram) {
		// Setting the base URL for API requests by concatenating the Telegram bot token to the API URL
		this.url = 'https://api.telegram.org/bot' + client.params.token;
	}

	private isUpload(params: Record<string, any>) {
		return Object.entries(params).some(([key, value]) => {
			return (typeof value === 'string' && fs.existsSync(value)) || Buffer.isBuffer(value);
		});
	}

	/**
	 * Convert parameters into FormData object for API requests.
	 * This method prepares the parameters to be sent in a POST request as FormData,
	 * which is suitable for uploading files or other multipart data.
	 * @param {Record<string, any>} params - The parameters to be converted into FormData.
	 * @returns {FormData} - The FormData object containing the converted parameters.
	 */
	private getFormData(params: Record<string, any>): FormData {
		// Create a new FormData instance
		const formData = new FormData();

		// Iterate through each key-value pair in the parameters object
		for (let [key, value] of Object.entries(params)) {
			if (typeof value === 'object') {
				// Serialize the reply_markup object to JSON string
				formData.append(key, JSON.stringify(value));
			} else if (Buffer.isBuffer(value)) {
				// Append the Buffer to FormData, specifying a default filename "file.data"
				formData.append(key, new Blob([value]), 'file.data');
			} else if (typeof value === 'string' && fs.existsSync(value)) {
				// Read the file content, create a Blob, and append it to FormData, specifying a default filename "file.data"
				formData.append(key, new Blob([fs.readFileSync(value)]), params.filename || 'file.data');
			} else {
				// For other types of values, simply append them to FormData
				formData.append(key, value);
			}
		}

		// Return the FormData object containing the converted parameters
		return formData;
	}

	/**
	 * Make an API call to the Telegram Bot API.
	 * @param {string} method - The API method to be called.
	 * @param {Record<string, any>} [params] - Optional parameters to be passed in the API call.
	 * @returns {Promise<any>} - A promise resolving to the response data from the API call.
	 */
	public async call(method: string, params?: Record<string, any>): Promise<any> {
		// Merging default parameters with provided parameters, if any
		let mergedParams = { ...this.defaultParams[method], ...params };
		// Convert reply_markup if it contains inline_keyboard
		if (mergedParams.reply_markup?.inline_keyboard) mergedParams.reply_markup.inline_keyboard = await KeyboardConvert(this.client, mergedParams.reply_markup.inline_keyboard);

		try {
			// Making the API request using Axios
			const response = await axios({
				method: 'POST',
				url: `${this.url}/${method}`,
				data: this.isUpload(mergedParams) ? this.getFormData(mergedParams) : mergedParams,
			});
			// Returning the API response data
			return response.data.result;
		} catch (error: any) {
			// Handling errors if any
			if (error.code !== 'ECONNRESET') console.error('Error occurred while making API call:', error);
		}
	}

	public async getContext(methodName: string, params: Record<string, any>, context: string): Promise<any> {
		const data = await this.call(methodName, params);
		return ContextManager.getContext(context, { client: this.client, source: data });
	}
}
