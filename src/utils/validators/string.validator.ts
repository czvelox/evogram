import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum StringValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	TOO_SHORT = 'TOO_SHORT',
	TOO_LONG = 'TOO_LONG',
	INVALID_FORMAT = 'INVALID_FORMAT',
}

export interface StringValidatorOptions extends ValidatorOptions {
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
}

export const stringValidator: (options?: StringValidatorOptions) => ValidatorFunction = (options = {}) => {
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
					StringValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(StringValidatorError.VALUE_REQUIRED) || `String «${arg.name}» is required`
				);
			else return;
		}

		const stringValue = value.trim();

		// Проверяем минимальную длину
		if (typeof options.minLength === 'number' && stringValue.length < options.minLength) {
			throw new ValidatorError(
				options,
				StringValidatorError.TOO_SHORT,
				ValidationErrors.get(StringValidatorError.TOO_SHORT) || `String «${arg.name}» is too short`
			);
		}

		// Проверяем максимальную длину
		if (typeof options.maxLength === 'number' && stringValue.length > options.maxLength) {
			throw new ValidatorError(
				options,
				StringValidatorError.TOO_LONG,
				ValidationErrors.get(StringValidatorError.TOO_LONG) || `String «${arg.name}» is too long`
			);
		}

		// Проверяем соответствие паттерну, если он задан
		if (options.pattern && !options.pattern.test(stringValue)) {
			throw new ValidatorError(
				options,
				StringValidatorError.INVALID_FORMAT,
				ValidationErrors.get(StringValidatorError.INVALID_FORMAT) || `String «${arg.name}» is invalid`
			);
		}

		return stringValue;
	};
};
