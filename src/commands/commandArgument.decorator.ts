import 'reflect-metadata';
import { Command, CommandContext } from '../migrated';

export type ICommandArgument = {
	index: number;
	name: string;
	type: any;
	validators: ICommandArgumentValidator[];
	isOptional: boolean;
	question: (data: ICommandArgumentQuestionParams) => Promise<any>;
	askAgain: boolean;
};

export type ICommandArgumentName = string;
export type ICommandArgumentValidator = (params: ICommandArgumentValidtatorParams) => any | Promise<any>;
export type ICommandArgumentValidtatorParams = {
	value: string;
	args: Record<string, any>;
	context: CommandContext;
	command: Command;
	arg: ICommandArgument;
	validateArgs: Record<string, any>;
};

export type ICommandArgumentQuestionParams = ICommandArgumentValidtatorParams & { error?: any };

export function CommandArgument(
	nameOrOptions:
		| ICommandArgumentName
		| { name: ICommandArgumentName; question?: (data: ICommandArgumentQuestionParams) => Promise<any>; askAgain?: boolean },
	...validators: ICommandArgumentValidator[]
): Function {
	return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
		// Получаем метаданные о типах аргументов
		const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);

		if (!paramTypes) {
			console.error('paramTypes is undefined. Проверь tsconfig.json и импорт reflect-metadata.');
			return;
		}

		// Сохраняем данные об аргументах
		const existingArguments: {
			index: number;
			name: string;
			type: any;
			validators: ICommandArgumentValidator[];
			isOptional: boolean;
			question: ((data: ICommandArgumentValidtatorParams) => Promise<any>) | undefined;
			askAgain: boolean;
		}[] = Reflect.getOwnMetadata('custom:arguments', target, propertyKey) || [];

		existingArguments.push({
			index: parameterIndex,
			name: (typeof nameOrOptions === 'string' ? nameOrOptions : nameOrOptions.name).replace('?', ''),
			type: paramTypes[parameterIndex], // Тип аргумента
			validators: validators,
			isOptional: (typeof nameOrOptions === 'string' ? nameOrOptions : nameOrOptions.name).endsWith('?'),
			question: (typeof nameOrOptions === 'string' ? undefined : nameOrOptions.question) || undefined,
			askAgain: (typeof nameOrOptions === 'string' ? false : nameOrOptions.askAgain) || false,
		});

		Reflect.defineMetadata('custom:arguments', existingArguments, target, propertyKey);
	};
}
