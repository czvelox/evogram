import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum DateValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_DATE = 'INVALID_DATE',
	DATE_TOO_EARLY = 'DATE_TOO_EARLY',
	DATE_TOO_LATE = 'DATE_TOO_LATE',
}

export interface DateValidatorOptions extends ValidatorOptions {
	minDate?: Date;
	maxDate?: Date;
}

export const parseDate = (value: string): Date | null => {
	// Убираем лишние пробелы
	const cleanValue = value.trim();

	try {
		// Пробуем разные форматы даты
		const formats = [
			// DD.MM.YYYY
			/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
			// DD/MM/YYYY
			/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
			// YYYY-MM-DD
			/^(\d{4})-(\d{1,2})-(\d{1,2})$/,
			// DD MM YYYY
			/^(\d{1,2})\s+(\d{1,2})\s+(\d{4})$/,
		];

		for (const format of formats) {
			const match = cleanValue.match(format);
			if (match) {
				let [_, first, second, third] = match;

				// Для формата YYYY-MM-DD
				if (format === formats[2]) {
					[_, third, second, first] = match;
				}

				const day = parseInt(first, 10);
				const month = parseInt(second, 10) - 1;
				const year = parseInt(third, 10);

				const date = new Date(year, month, day);

				// Проверяем валидность даты
				if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
					return date;
				}
			}
		}

		// Пробуем стандартный парсинг
		const date = new Date(cleanValue);
		if (!isNaN(date.getTime())) {
			return date;
		}

		return null;
	} catch {
		return null;
	}
};

export const dateValidator: (options?: DateValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<Date | undefined> => {
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
					DateValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(DateValidatorError.VALUE_REQUIRED) || `Date «${arg.name}» is required`
				);
			else return;
		}

		const parsedDate = parseDate(value);

		if (parsedDate === null) {
			throw new ValidatorError(
				options,
				DateValidatorError.INVALID_DATE,
				ValidationErrors.get(DateValidatorError.INVALID_DATE) || `Date «${arg.name}» is invalid`
			);
		}

		// Проверяем минимальную дату
		if (options.minDate && parsedDate < options.minDate) {
			throw new ValidatorError(
				options,
				DateValidatorError.DATE_TOO_EARLY,
				ValidationErrors.get(DateValidatorError.DATE_TOO_EARLY) || `Date «${arg.name}» is too early`
			);
		}

		// Проверяем максимальную дату
		if (options.maxDate && parsedDate > options.maxDate) {
			throw new ValidatorError(
				options,
				DateValidatorError.DATE_TOO_LATE,
				ValidationErrors.get(DateValidatorError.DATE_TOO_LATE) || `Date «${arg.name}» is too late`
			);
		}

		return parsedDate || undefined;
	};
};
