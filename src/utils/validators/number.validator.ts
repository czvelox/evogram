import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';

export enum NumberValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_NUMBER = 'INVALID_NUMBER',
	LESS_THAN_MIN = 'LESS_THAN_MIN',
	GREATER_THAN_MAX = 'GREATER_THAN_MAX',
	DECIMAL_NOT_ALLOWED = 'DECIMAL_NOT_ALLOWED',
}

export const parseNumber = (value: string, allowFloat: boolean = true): number | null => {
	// Убираем все пробелы
	const cleanValue = value.replace(/\s+/g, '');

	try {
		// Сначала заменяем все K на числовые значения
		let processedValue = cleanValue;
		const kMatches = cleanValue.match(/\d+[KkКк]+/gi) || [];

		for (const match of kMatches) {
			const base = match.replace(/[KkКк]+$/i, '');
			const kCount = (match.match(/[KkКк]/gi) || []).length;
			const expanded = parseInt(base) * Math.pow(1000, kCount);
			processedValue = processedValue.replace(match, expanded.toString());
		}

		// Если это просто число с K без операций
		if (/^\d+[KkКк]+$/i.test(cleanValue)) {
			return parseInt(processedValue);
		}

		// Пробуем вычислить математическое выражение
		if (/[-+*/()]/g.test(processedValue)) {
			// Заменяем русскую 'x' на '*' для умножения
			const normalizedExpr = processedValue.replace(/[хХxX]/g, '*');

			const result = normalizedExpr
				.split(/([+\-*/()])/g)
				.filter(Boolean)
				.map((part) => part.trim())
				.reduce((acc, curr, i, arr) => {
					if (i === 0) return Number(curr);
					switch (arr[i - 1]) {
						case '+':
							return acc + Number(curr);
						case '-':
							return acc - Number(curr);
						case '*':
							return acc * Number(curr);
						case '/':
							return acc / Number(curr);
						default:
							return acc;
					}
				}, 0);

			if (typeof result === 'number' && isFinite(result)) return result;
			return null;
		}

		// Проверяем число
		const parseFunc = allowFloat ? parseFloat : parseInt;
		const number = parseFunc(processedValue.replace(/[^\d.-]/g, ''));
		return isNaN(number) ? null : number;
	} catch {
		return null;
	}
};

export interface NumberValidatorOptions extends ValidatorOptions {
	min?: number;
	max?: number;
	allowFloat?: boolean;
}

export const numberValidator: (options?: NumberValidatorOptions) => ValidatorFunction = (options = {}) => {
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
					NumberValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(NumberValidatorError.VALUE_REQUIRED) || `Number «${arg.name}» is required`
				);
			else return;
		}

		const parsedNumber = parseNumber(value, options.allowFloat);

		if (parsedNumber === null) {
			throw new ValidatorError(
				options,
				NumberValidatorError.INVALID_NUMBER,
				ValidationErrors.get(NumberValidatorError.INVALID_NUMBER) || `Number «${arg.name}» is invalid`
			);
		}

		// Проверяем что число целое если float не разрешен
		if (options.allowFloat === false && !Number.isInteger(parsedNumber)) {
			throw new ValidatorError(
				options,
				NumberValidatorError.DECIMAL_NOT_ALLOWED,
				ValidationErrors.get(NumberValidatorError.DECIMAL_NOT_ALLOWED) || `Number «${arg.name}» is not an integer`
			);
		}

		// Проверяем минимальное значение
		if (typeof options.min === 'number' && parsedNumber < options.min) {
			throw new ValidatorError(
				options,
				NumberValidatorError.LESS_THAN_MIN,
				ValidationErrors.get(NumberValidatorError.LESS_THAN_MIN) || `Number «${arg.name}» is less than ${options.min}`
			);
		}

		// Проверяем максимальное значение
		if (typeof options.max === 'number' && parsedNumber > options.max) {
			throw new ValidatorError(
				options,
				NumberValidatorError.GREATER_THAN_MAX,
				ValidationErrors.get(NumberValidatorError.GREATER_THAN_MAX) || `Number «${arg.name}» is greater than ${options.max}`
			);
		}

		return parsedNumber;
	};
};
