import axios from 'axios';
import fs from 'node:fs';
import { ContextManager, Evogram } from '..';
import { EvogramInlineKeyboardButton, KeyboardConvert } from '../keyboard';
import { APIError } from './APIError';
import _ from 'lodash';
import { MiddlewareManager } from './middleware/MiddlewareManager';
import { BaseMiddleware, MiddlewareContext } from './middleware/types';

export class ApiWorker {
	private url: string; // Private variable to store the base URL of the Telegram API
	private defaultParams: Record<string, any> = {}; // Private variable to store default parameters for API calls
	public middlewareManager: MiddlewareManager = new MiddlewareManager(this.client);

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
	constructor(
		protected client: Evogram,
		public state: any = {}
	) {
		// Setting the base URL for API requests by concatenating the Telegram bot token to the API URL
		this.url = 'https://api.telegram.org/bot' + client.params.token;
		// Инициализируем менеджер с middleware из декораторов
	}

	public use(middleware: BaseMiddleware): void {
		this.middlewareManager.use(middleware);
	}

	private isUpload(params: Record<string, any>) {
		const checkValue = (value: any): boolean => {
			if ((typeof value === 'string' && fs.existsSync(value)) || Buffer.isBuffer(value)) {
				return true;
			}

			if (value && typeof value === 'object' && !Buffer.isBuffer(value)) {
				return Object.values(value).some((nestedValue) => checkValue(nestedValue));
			}

			return false;
		};

		return Object.values(params).some((value) => checkValue(value));
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
			if (Buffer.isBuffer(value)) {
				// Append the Buffer to FormData, specifying a default filename "file.data"
				//@ts-ignore
				formData.append(key, new Blob([value]), 'file.data');
			} else if (typeof value === 'object') {
				// Serialize the reply_markup object to JSON string
				formData.append(key, JSON.stringify(value));
			} else if (typeof value === 'string' && fs.existsSync(value)) {
				// Read the file content, create a Blob, and append it to FormData, specifying a default filename "file.data"
				//@ts-ignore
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
		let mergedParams = { ...this.defaultParams[method], ...params };

		const ctx: MiddlewareContext = {
			method,
			params: mergedParams,
			isExecuted: false,
			state: this.state,
		};

		try {
			const result = await this.middlewareManager.executeBefore(ctx);
			if (!result) return null;

			if (mergedParams.reply_markup?.inline_keyboard)
				mergedParams.reply_markup.inline_keyboard = await KeyboardConvert(this.client, mergedParams.reply_markup.inline_keyboard);

			const response = await axios({
				method: 'POST',
				url: `${this.url}/${method}`,
				data: this.isUpload(result) ? this.getFormData(result) : result,
			});

			ctx.result = response.data.result;

			await this.middlewareManager.executeAfter(ctx);
			return ctx.result;
		} catch (error: any) {
			await this.middlewareManager.executeError(ctx, error);

			if (axios.isAxiosError(error) && !error.response?.data) return this.call(method, params);
			if (axios.isAxiosError(error)) throw new APIError({ method, params: ctx.params, error: error.response?.data });

			throw error;
		}
	}

	public async getContext(methodName: string, params: Record<string, any>, context: string): Promise<any> {
		const data = await this.call(methodName, params);
		return ContextManager.getContext(context, { client: this.client, source: data });
	}
}
