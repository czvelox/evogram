import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum BooleanValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_BOOLEAN = 'INVALID_BOOLEAN',
}

export interface BooleanValidatorOptions extends ValidatorOptions {
	trueValues?: string[];
	falseValues?: string[];
}

export const DEFAULT_TRUE_VALUES = ['true', 'yes', 'да', '1', 'on', 'включено', '+'];
export const DEFAULT_FALSE_VALUES = ['false', 'no', 'нет', '0', 'off', 'выключено', '-'];

export const parseBoolean = (
	value: string,
	trueValues: string[] = DEFAULT_TRUE_VALUES,
	falseValues: string[] = DEFAULT_FALSE_VALUES
): boolean | null => {
	const normalizedValue = value.toLowerCase().trim();

	if (trueValues.includes(normalizedValue)) {
		return true;
	}

	if (falseValues.includes(normalizedValue)) {
		return false;
	}

	return null;
};

export const booleanValidator: (options?: BooleanValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<boolean | undefined> => {
		const { value, context: cmdContext, arg } = context;

		if (!value && options.question) {
			await options.question(cmdContext);
			return undefined;
		}

		if (!value) {
			if (!arg.isOptional)
				throw new ValidatorError(
					options,
					BooleanValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(BooleanValidatorError.VALUE_REQUIRED) || `Boolean «${arg.name}» is required`
				);
			else return;
		}

		const parsedBoolean = parseBoolean(value, options.trueValues, options.falseValues);

		if (parsedBoolean === null && !arg.isOptional) {
			throw new ValidatorError(
				options,
				BooleanValidatorError.INVALID_BOOLEAN,
				ValidationErrors.get(BooleanValidatorError.INVALID_BOOLEAN) || `Boolean «${arg.name}» is invalid`
			);
		}

		return parsedBoolean || undefined;
	};
};
