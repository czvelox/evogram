import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';
import axios from 'axios';

export enum UrlValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_URL = 'INVALID_URL',
	INVALID_PROTOCOL = 'INVALID_PROTOCOL',
	INVALID_DOMAIN = 'INVALID_DOMAIN',
	INVALID_CONTENT_TYPE = 'INVALID_CONTENT_TYPE',
	REQUEST_FAILED = 'REQUEST_FAILED',
}

export interface UrlValidatorOptions extends ValidatorOptions {
	protocols?: string[];
	allowedDomains?: string[];
	contentType?: string | string[];
}

export const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const urlValidator: (options?: UrlValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<string | undefined> => {
		const { value, context: cmdContext, arg } = context;

		// Если значение отсутствует и есть функция question
		if (!value && options.question) {
			await options.question(cmdContext);
			return undefined;
		}

		if (!value) {
			if (!arg.isOptional)
				throw new ValidatorError(
					options,
					UrlValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(UrlValidatorError.VALUE_REQUIRED) || `URL «${arg.name}» is required`
				);
			else return;
		}

		const urlString = value.trim();

		// Проверяем, является ли строка валидным URL
		if (!isValidUrl(urlString)) {
			throw new ValidatorError(
				options,
				UrlValidatorError.INVALID_URL,
				ValidationErrors.get(UrlValidatorError.INVALID_URL) || `URL «${arg.name}» is invalid`
			);
		}

		const url = new URL(urlString);

		// Проверяем протокол, если указаны разрешенные протоколы
		if (options.protocols?.length) {
			const protocol = url.protocol.replace(':', '');
			if (!options.protocols.includes(protocol)) {
				throw new ValidatorError(
					options,
					UrlValidatorError.INVALID_PROTOCOL,
					ValidationErrors.get(UrlValidatorError.INVALID_PROTOCOL) || `Invalid protocol: ${protocol}`
				);
			}
		}

		// Проверяем домен, если указаны разрешенные домены
		if (options.allowedDomains?.length) {
			const domain = url.hostname;
			if (!options.allowedDomains.some((allowedDomain) => domain === allowedDomain || domain.endsWith(`.${allowedDomain}`))) {
				throw new ValidatorError(
					options,
					UrlValidatorError.INVALID_DOMAIN,
					ValidationErrors.get(UrlValidatorError.INVALID_DOMAIN) || `Invalid domain: ${domain}`
				);
			}
		}

		// Проверяем тип контента, если указан
		if (options.contentType) {
			try {
				const response = await axios.head(urlString);
				const contentType = response.headers['content-type'];

				const allowedTypes = Array.isArray(options.contentType) ? options.contentType : [options.contentType];

				if (!allowedTypes.some((type) => contentType.includes(type))) {
					throw new ValidatorError(
						options,
						UrlValidatorError.INVALID_CONTENT_TYPE,
						ValidationErrors.get(UrlValidatorError.INVALID_CONTENT_TYPE) || `Invalid content type: ${contentType}`
					);
				}
			} catch (error) {
				throw new ValidatorError(
					options,
					UrlValidatorError.REQUEST_FAILED,
					ValidationErrors.get(UrlValidatorError.REQUEST_FAILED) || `Request failed: ${error}`
				);
			}
		}

		return urlString;
	};
};
