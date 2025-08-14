import { ICommandArgumentValidtatorParams } from '../..';
import { ValidationErrors, ValidatorError } from './errors';
import { ValidatorFunction, ValidatorOptions } from './types';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export enum EmailValidatorError {
	VALUE_REQUIRED = 'VALUE_REQUIRED',
	INVALID_FORMAT = 'INVALID_FORMAT',
	INVALID_DOMAIN = 'INVALID_DOMAIN',
	DISPOSABLE_EMAIL = 'DISPOSABLE_EMAIL',
	BLOCKED_DOMAIN = 'BLOCKED_DOMAIN',
	MX_RECORD_NOT_FOUND = 'MX_RECORD_NOT_FOUND',
}

export interface EmailValidatorOptions extends ValidatorOptions {
	checkMx?: boolean;
	allowedDomains?: string[];
	blockedDomains?: string[];
	checkDisposable?: boolean;
}

export const disposableDomains = new Set([
	'tempmail.com',
	'throwawaymail.com',
	'10minutemail.com',
	'guerrillamail.com',
	'mailinator.com',
	'yopmail.com',
	'dispostable.com',
	'maildrop.cc',
	'temp-mail.org',
	'fakeinbox.com',
	'sharklasers.com',
	'trashmail.com',
	'wegwerfmail.de',
	'tempmail.net',
	'emailondeck.com',
	'tempinbox.com',
	'mohmal.com',
	'getnada.com',
	'tempmailaddress.com',
	'mintemail.com',
	'tempmail.ninja',
	'disposablemail.com',
]);

export const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const emailValidator: (options?: EmailValidatorOptions) => ValidatorFunction = (options = {}) => {
	return async (context: ICommandArgumentValidtatorParams): Promise<string | undefined> => {
		const { value, context: cmdContext, arg } = context;

		if (!value && options.question) {
			await options.question(cmdContext);
			return undefined;
		}

		if (!value) {
			if (!arg.isOptional)
				throw new ValidatorError(
					options,
					EmailValidatorError.VALUE_REQUIRED,
					ValidationErrors.get(EmailValidatorError.VALUE_REQUIRED) || `Email is required`
				);
			else return;
		}

		const email = value.trim().toLowerCase();

		if (!EMAIL_REGEX.test(email)) {
			throw new ValidatorError(
				options,
				EmailValidatorError.INVALID_FORMAT,
				ValidationErrors.get(EmailValidatorError.INVALID_FORMAT) || `Email «${arg.name}» is invalid`
			);
		}

		const [, domain] = email.split('@');

		if (options.allowedDomains?.length && !options.allowedDomains.includes(domain)) {
			throw new ValidatorError(
				options,
				EmailValidatorError.INVALID_DOMAIN,
				ValidationErrors.get(EmailValidatorError.INVALID_DOMAIN) || `Email «${arg.name}» is invalid`
			);
		}

		if (options.blockedDomains?.length && options.blockedDomains.includes(domain)) {
			throw new ValidatorError(
				options,
				EmailValidatorError.BLOCKED_DOMAIN,
				ValidationErrors.get(EmailValidatorError.BLOCKED_DOMAIN) || `Email «${arg.name}» is invalid`
			);
		}

		if (options.checkDisposable && disposableDomains.has(domain)) {
			throw new ValidatorError(
				options,
				EmailValidatorError.DISPOSABLE_EMAIL,
				ValidationErrors.get(EmailValidatorError.DISPOSABLE_EMAIL) || `Email «${arg.name}» is disposable`
			);
		}

		if (options.checkMx) {
			try {
				const mxRecords = await resolveMx(domain);
				if (mxRecords.length === 0) {
					throw new ValidatorError(
						options,
						EmailValidatorError.MX_RECORD_NOT_FOUND,
						ValidationErrors.get(EmailValidatorError.MX_RECORD_NOT_FOUND) || `Email «${arg.name}» is invalid`
					);
				}
			} catch {
				throw new ValidatorError(
					options,
					EmailValidatorError.MX_RECORD_NOT_FOUND,
					ValidationErrors.get(EmailValidatorError.MX_RECORD_NOT_FOUND) || `Email «${arg.name}» is invalid`
				);
			}
		}

		return email;
	};
};
