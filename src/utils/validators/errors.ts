import { ArrayValidatorError } from './array.validator';
import { BooleanValidatorError } from './boolean.validator';
import { CardValidatorError } from './card.validator';
import { DateValidatorError } from './date.validator';
import { EmailValidatorError } from './email.validator';
import { NumberValidatorError } from './number.validator';
import { PercentValidatorError } from './percent.validator';
import { PhoneValidatorError } from './phone.validator';
import { StringValidatorError } from './string.validator';
import { ValidatorOptions } from './types';
import { UrlValidatorError } from './url.validator';

export type ValidatorErrorCodes =
	| ArrayValidatorError
	| BooleanValidatorError
	| DateValidatorError
	| EmailValidatorError
	| NumberValidatorError
	| PercentValidatorError
	| PhoneValidatorError
	| StringValidatorError
	| UrlValidatorError
	| CardValidatorError;

export interface IValidatorError {
	options: ValidatorOptions;
	code: ValidatorErrorCodes;
	message: string;
}

export class ValidatorError extends Error implements IValidatorError {
	constructor(
		public readonly options: ValidatorOptions,
		public readonly code: ValidatorErrorCodes,
		public readonly message: string
	) {
		super(message);
	}
}

export class ValidationErrors {
	private static errors: Map<string, string> = new Map();

	static add(code: ValidatorErrorCodes, errorMessage: string): void {
		this.errors.set(code, errorMessage);
	}

	static get(code: ValidatorErrorCodes): string | undefined {
		return this.errors.get(code);
	}

	static has(code: ValidatorErrorCodes): boolean {
		return this.errors.has(code);
	}

	static clear(): void {
		this.errors.clear();
	}

	static getAll(): string[] {
		return Array.from(this.errors.values());
	}
}
