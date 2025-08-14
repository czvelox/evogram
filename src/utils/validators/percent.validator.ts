import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum PercentValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_PERCENT = 'INVALID_PERCENT',
	LESS_THAN_MIN = 'LESS_THAN_MIN',
	GREATER_THAN_MAX = 'GREATER_THAN_MAX',
}

export interface PercentValidatorOptions extends ValidatorOptions {
	min?: number;
	max?: number;
	allowDecimal?: boolean;
}

export const parsePercent = (value: string, allowDecimal: boolean = true): number | null => {
	// Убираем все пробелы и знак процента
	const cleanValue = value.replace(/\s+|%/g, '');

	try {
		const number = allowDecimal ? parseFloat(cleanValue) : parseInt(cleanValue);
		return isNaN(number) ? null : number;
	} catch {
		return null;
	}
};

export const percentValidator: (options?: PercentValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<number | undefined> => {
		const { value, context: cmdContext, arg } = context;
		if (typeof value === 'number') return value;

		if (!value && options.question) {
			await options.question(cmdContext);
			return undefined;
		}

		if (!value) {
			if (!arg.isOptional)
				throw new ValidatorError(
					options,
					PercentValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(PercentValidatorError.VALUE_REQUIRED) || `Percent «${arg.name}» is required`
				);
			else return;
		}

		const parsedPercent = parsePercent(value, options.allowDecimal);

		if (parsedPercent === null) {
			throw new ValidatorError(
				options,
				PercentValidatorError.INVALID_PERCENT,
				ValidationErrors.get(PercentValidatorError.INVALID_PERCENT) || `Percent «${arg.name}» is invalid`
			);
		}

		const min = options.min ?? 0;
		const max = options.max ?? 100;

		if (parsedPercent < min) {
			throw new ValidatorError(
				options,
				PercentValidatorError.LESS_THAN_MIN,
				ValidationErrors.get(PercentValidatorError.LESS_THAN_MIN) || `Percent «${arg.name}» is less than ${min}`
			);
		}

		if (parsedPercent > max) {
			throw new ValidatorError(
				options,
				PercentValidatorError.GREATER_THAN_MAX,
				ValidationErrors.get(PercentValidatorError.GREATER_THAN_MAX) || `Percent «${arg.name}» is greater than ${max}`
			);
		}

		return parsedPercent;
	};
};
