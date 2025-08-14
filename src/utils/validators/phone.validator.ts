import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum PhoneValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_FORMAT = 'INVALID_FORMAT',
	INVALID_COUNTRY_CODE = 'INVALID_COUNTRY_CODE',
	INVALID_LENGTH = 'INVALID_LENGTH',
	INVALID_OPERATOR = 'INVALID_OPERATOR',
}

export interface PhoneValidatorOptions extends ValidatorOptions {
	country?: string;
	allowedCountries?: string[];
	allowedOperators?: string[];
	formats?: ('RU' | 'UA' | 'BY' | 'KZ' | 'DE' | 'FR' | 'GB' | 'CN' | 'JP')[];
}

export const COUNTRY_PATTERNS: Record<string, { pattern: RegExp; length: number }> = {
	RU: {
		pattern: /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
		length: 11,
	},
	US: {
		pattern: /^(\+1|1)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/,
		length: 10,
	},
	UA: {
		pattern: /^(\+380|380|0)?[\s-]?\(?[0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
		length: 12,
	},
	BY: {
		pattern: /^(\+375|375)?[\s-]?\(?[0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
		length: 12,
	},
	KZ: {
		pattern: /^(\+7|7)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
		length: 11,
	},
	DE: {
		pattern: /^(\+49|49)?[\s-]?\(?[0-9]{3,5}\)?[\s-]?[0-9]{3,4}[\s-]?[0-9]{2,4}$/,
		length: 11,
	},
	FR: {
		pattern: /^(\+33|33)?[\s-]?\(?[0-9]{1}\)?[\s-]?[0-9]{2}[\s-]?[0-9]{2}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
		length: 11,
	},
	GB: {
		pattern: /^(\+44|44)?[\s-]?\(?[0-9]{2}\)?[\s-]?[0-9]{4}[\s-]?[0-9]{4}$/,
		length: 11,
	},
	CN: {
		pattern: /^(\+86|86)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{4}[\s-]?[0-9]{4}$/,
		length: 11,
	},
	JP: {
		pattern: /^(\+81|81)?[\s-]?\(?[0-9]{2,3}\)?[\s-]?[0-9]{3,4}[\s-]?[0-9]{4}$/,
		length: 11,
	},
};

export const normalizePhone = (phone: string): string => {
	return phone.replace(/[\s\-\(\)+]/g, '');
};

export const formatPhone = (phone: string, format: string): string => {
	const digits = phone.replace(/\D/g, '');
	let result = format;
	let index = 0;

	return result.replace(/[#]/g, () => digits[index++] || '');
};

export const phoneValidator: (options?: PhoneValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<{ phone: number; formatted: string } | undefined> => {
		const { value, context: cmdContext, arg } = context;

		if (!value && options.question) {
			await options.question(cmdContext);
			return undefined;
		}

		if (!value) {
			if (!arg.isOptional)
				throw new ValidatorError(
					options,
					PhoneValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(PhoneValidatorError.VALUE_REQUIRED) || `Phone «${arg.name}» is required`
				);
			else return { phone: 0, formatted: '' };
		}

		const normalizedPhone = normalizePhone(value);

		if (options.country) {
			const countryPattern = COUNTRY_PATTERNS[options.country];
			if (!countryPattern) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_COUNTRY_CODE,
					ValidationErrors.get(PhoneValidatorError.INVALID_COUNTRY_CODE) || `Invalid country code: ${options.country}`
				);
			}

			if (!countryPattern.pattern.test(value)) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_FORMAT,
					ValidationErrors.get(PhoneValidatorError.INVALID_FORMAT) || `Invalid phone format for country: ${options.country}`
				);
			}

			if (normalizedPhone.length !== countryPattern.length) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_LENGTH,
					ValidationErrors.get(PhoneValidatorError.INVALID_LENGTH) || `Invalid phone length for country: ${options.country}`
				);
			}
		} else {
			const generalPhonePattern = /^\+?[1-9]\d{1,14}$/; // Общий формат номера телефона

			if (!generalPhonePattern.test(normalizedPhone)) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_FORMAT,
					ValidationErrors.get(PhoneValidatorError.INVALID_FORMAT) || `Invalid phone format`
				);
			}
		}

		if (options.allowedCountries?.length) {
			const isValidCountry = options.allowedCountries.some((country) => COUNTRY_PATTERNS[country]?.pattern.test(value));

			if (!isValidCountry) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_COUNTRY_CODE,
					ValidationErrors.get(PhoneValidatorError.INVALID_COUNTRY_CODE) || `Invalid country code: ${options.country}`
				);
			}
		}

		if (options.allowedOperators?.length) {
			const operatorCode = normalizedPhone.slice(1, 4);
			if (!options.allowedOperators.includes(operatorCode)) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_OPERATOR,
					ValidationErrors.get(PhoneValidatorError.INVALID_OPERATOR) || `Invalid operator code: ${operatorCode}`
				);
			}
		}

		let formattedPhone = normalizedPhone;
		if (normalizedPhone.length === 11) {
			formattedPhone = `+${normalizedPhone.slice(0, 1)} (${normalizedPhone.slice(1, 4)}) ${normalizedPhone.slice(4, 6)} ${normalizedPhone.slice(6, 8)} ${normalizedPhone.slice(8)}`;
		} else if (normalizedPhone.length === 12) {
			formattedPhone = `+${normalizedPhone.slice(0, 2)} (${normalizedPhone.slice(2, 5)}) ${normalizedPhone.slice(5, 7)} ${normalizedPhone.slice(7, 9)} ${normalizedPhone.slice(9)}`;
		} else if (normalizedPhone.length > 12) {
			formattedPhone = `+${normalizedPhone.slice(0, 1)} (${normalizedPhone.slice(1, 4)}) ${normalizedPhone.slice(4, 7)} ${normalizedPhone.slice(7, 9)} ${normalizedPhone.slice(9)}`;
		}

		if (options.formats) {
			const format = options.formats.find((format) => COUNTRY_PATTERNS[format]?.pattern.test(value));
			if (!format) {
				throw new ValidatorError(
					options,
					PhoneValidatorError.INVALID_FORMAT,
					ValidationErrors.get(PhoneValidatorError.INVALID_FORMAT) || `Invalid phone format for country: ${options.country}`
				);
			}
			formattedPhone = formatPhone(normalizedPhone, format);
		}

		return { phone: Number(normalizedPhone), formatted: formattedPhone };
	};
};
