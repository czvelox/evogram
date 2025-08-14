import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum CardValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_FORMAT = 'INVALID_FORMAT',
	INVALID_LENGTH = 'INVALID_LENGTH',
}

export interface CardValidatorOptions extends ValidatorOptions {
	allowedCardTypes?: string[];
}

export const CARD_PATTERNS: Record<string, { pattern: RegExp; length: number }> = {
	VISA: {
		pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
		length: 16,
	},
	MASTERCARD: {
		pattern: /^5[1-5][0-9]{14}$/,
		length: 16,
	},
	AMEX: {
		pattern: /^3[47][0-9]{13}$/,
		length: 15,
	},
	DISCOVER: {
		pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
		length: 16,
	},
	MAESTRO: {
		pattern: /^6(?:759|767)[0-9]{12}$/,
		length: 16,
	},
	RUPAY: {
		pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
		length: 16,
	},
	JCB: {
		pattern: /^(?:2131|1800|35\d{3})\d{11}$/,
		length: 16,
	},
	DINERS_CLUB: {
		pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
		length: 14,
	},
	UNIONPAY: {
		pattern: /^62[0-9]{14,17}$/,
		length: 16,
	},
	INTERAC: {
		pattern: /^0[0-9]{15}$/,
		length: 16,
	},
	MIR: {
		pattern: /^220[0-9]{13}$/,
		length: 16,
	},
};

export const cardValidator: (options?: CardValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<{ card: number; formatted: string; paymentSystem: string }> => {
		const { value, context: cmdContext, arg } = context;

		if (!value && options.question) {
			await options.question(cmdContext);
			return { card: 0, formatted: '', paymentSystem: '' };
		}

		if (!value) {
			if (!arg.isOptional)
				throw new ValidatorError(
					options,
					CardValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(CardValidatorError.VALUE_REQUIRED) || `Card number «${arg.name}» is required`
				);
			else return { card: 0, formatted: '', paymentSystem: '' };
		}

		const normalizedCard = value.replace(/\s+/g, '').replace(/-/g, '');

		if (options.allowedCardTypes?.length) {
			const isValidCardType = options.allowedCardTypes.some((type) => CARD_PATTERNS[type]?.pattern.test(normalizedCard));

			if (!isValidCardType) {
				throw new ValidatorError(
					options,
					CardValidatorError.INVALID_FORMAT,
					ValidationErrors.get(CardValidatorError.INVALID_FORMAT) || `Invalid card type for number: ${normalizedCard}`
				);
			}
		}

		const cardPattern = Object.entries(CARD_PATTERNS).find(([type, pattern]) => pattern.pattern.test(normalizedCard));
		if (!cardPattern) {
			throw new ValidatorError(
				options,
				CardValidatorError.INVALID_FORMAT,
				ValidationErrors.get(CardValidatorError.INVALID_FORMAT) || `Invalid card format for number: ${normalizedCard}`
			);
		}

		if (normalizedCard.length !== cardPattern[1].length) {
			throw new ValidatorError(
				options,
				CardValidatorError.INVALID_LENGTH,
				ValidationErrors.get(CardValidatorError.INVALID_LENGTH) || `Invalid card length for number: ${normalizedCard}`
			);
		}

		const formattedCard = normalizedCard.replace(/(\d{4})(?=\d)/g, '$1 ');

		return {
			card: Number(normalizedCard),
			formatted: formattedCard.trim(),
			paymentSystem: cardPattern[0],
		};
	};
};
