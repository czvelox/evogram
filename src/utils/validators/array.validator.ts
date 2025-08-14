import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum ArrayValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_ARRAY = 'INVALID_ARRAY',
	TOO_FEW_ITEMS = 'TOO_FEW_ITEMS',
	TOO_MANY_ITEMS = 'TOO_MANY_ITEMS',
	INVALID_ITEM = 'INVALID_ITEM',
}

export interface ArrayValidatorOptions extends ValidatorOptions {
	minLength?: number;
	maxLength?: number;
	separator?: string | RegExp;
	itemValidator?: ValidatorFunction;
}

export const parseArray = (value: string, separator: string | RegExp = /[,\s]+/): string[] => {
	// Убираем лишние пробелы в начале и конце
	const cleanValue = value.trim();

	// Разбиваем строку на массив по разделителю
	return cleanValue
		.split(separator)
		.map((item) => item.trim())
		.filter((item) => item.length > 0);
};

export const arrayValidator: (options?: ArrayValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<string[] | undefined> => {
		const { value, context: cmdContext, arg } = context;

		// Если значение отсутствует и есть функция question
		if (!value && options.question) {
			await options.question(cmdContext);
			return undefined;
		}

		if (!value) {
			if (!arg.isOptional) throw new ValidatorError(options, ArrayValidatorError.VALUE_REQUIRED, `Array «${arg.name}» is required`);
			else return;
		}

		const array = parseArray(value, options.separator);

		// Проверяем минимальную длину
		if (typeof options.minLength === 'number' && array.length < options.minLength) {
			throw new ValidatorError(
				options,
				ArrayValidatorError.TOO_FEW_ITEMS,
				ValidationErrors.get(ArrayValidatorError.TOO_FEW_ITEMS) ||
					`Array «${arg.name}» must contain at least ${options.minLength} items`
			);
		}

		// Проверяем максимальную длину
		if (typeof options.maxLength === 'number' && array.length > options.maxLength) {
			throw new ValidatorError(
				options,
				ArrayValidatorError.TOO_MANY_ITEMS,
				ValidationErrors.get(ArrayValidatorError.TOO_MANY_ITEMS) ||
					`Array «${arg.name}» must contain at most ${options.maxLength} items`
			);
		}

		// Если задан валидатор для элементов
		if (options.itemValidator) {
			const validatedItems = [];

			for (const item of array) {
				const validatedItem = await options.itemValidator({
					...context,
					value: item,
				});

				if (validatedItem === undefined) {
					await options.onError?.(options, ArrayValidatorError.INVALID_ITEM);
					return undefined;
				}

				validatedItems.push(validatedItem);
			}

			return validatedItems;
		}

		return array;
	};
};
