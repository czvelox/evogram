//@ts-check
import { CommandInstance, Evogram, getCommandArguments } from '..';
import { Logger } from '../logger';
import { CommandContext, CommandManager, InlineQueryContext } from '../migrated';
import { CommandExecuteData, CommandParams } from './command.types';
import { ICommandArgument, ICommandArgumentValidator } from './commandArgument.decorator';
import _ from 'lodash';

// Утилита для получения метаданных с учётом наследования
function getInheritedMetadata(target: Object, propertyKey: string | symbol) {
	let prototype = target;

	// Список для сбора метаданных
	const allMetadata: { index: number; name: string }[] = [];

	while (prototype) {
		const metadata = Reflect.getOwnMetadata('custom:arguments', prototype, propertyKey);
		if (metadata) {
			allMetadata.unshift(...metadata); // Добавляем метаданные, найденные выше в цепочке наследования
		}
		prototype = Object.getPrototypeOf(prototype); // Переходим к родительскому классу
	}

	return allMetadata;
}

export abstract class Command {
	static params: CommandParams = {};
	public logger: Logger;

	get params(): CommandParams {
		//@ts-ignore
		return this.constructor.params;
	}

	constructor(public client: Evogram) {
		this.logger = new Logger(this.constructor.name);
	}

	/**
	 * Checks if a command is executable based on an incoming message.
	 * @param message - The incoming message.
	 */
	public isExecutable(context: CommandContext): boolean {
		if (this.params.onlyFromKeyboard && !context.callbackQuery) return false;

		if (this.params.accessLevel && context.user.userDB.accessLevel < this.params.accessLevel) return false;
		for (const item of [this.params.name, this.constructor.name])
			if (context.callbackQuery?.source.data?.startsWith(`cdm ${item};`)) return true;

		if (context.text) {
			const text = context.text.replace(`@${context.client.bot.username}`, '');

			for (const item of [`/${this.params.name}`, `/${this.params.name}`, ...(this.params.aliases || [])])
				if (
					typeof item === 'string'
						? text.replace(/\n/g, ' ').split(' ')[0].toLowerCase() === item.toLowerCase()
						: item.test(text.replace(/\n/g, ' '))
				)
					return true;
		}

		return false;
	}

	public howUse(context: CommandContext): any {}

	public async preExecute(context: CommandContext, args?: any) {
		let command: CommandInstance | undefined;

		try {
			if (this.client.question.priority === 'question' && this.client.question.getQuestion(context.user.id, false)) return;
			if (args) context.state.callbackData = { ...context.state.callbackData, payload: args };

			//@ts-ignore
			command = CommandManager.commands.find((y) => y.params?.name === this.params.name);

			const resultArguments = await getCommandArguments(context, this);
			if (!resultArguments) return await this.howUse(context);

			context.state.commandArguments = resultArguments.resultArguments;
			const sortedArgs = this.arguments.sort((a, b) => a.index - b.index);
			await this.execute(context, ...sortedArgs.map((arg) => resultArguments.validateArgs[arg.name]));
		} catch (error: any) {
			this.onError(context, error);
		}
	}

	public async inlinePreExecute(context: InlineQueryContext, args?: any) {
		if (args) context.state.callbackData = { payload: args };

		const resultArguments = await getCommandArguments(context, this);
		if (!resultArguments) return;

		const sortedArgs = this.inlineArguments.sort((a, b) => a.index - b.index);
		return await this.inlineExecute(context, ...sortedArgs.map((arg) => resultArguments.validateArgs[arg.name]));
	}
	/**
	 * Executes a command based on an incoming message.
	 * @param message - The incoming message.
	 */
	public abstract execute(context: CommandContext, ...args: any): any;

	public inlineExecute(context: InlineQueryContext, ...args: any): any {}

	public onError(context: CommandContext, error: Error): any {
		Command.onError(context, error);
	}

	static onError(context: CommandContext, error: Error) {
		throw error;
	}

	get arguments(): ICommandArgument[] {
		//@ts-ignore
		return getInheritedMetadata(this, 'execute').sort((a, b) => a.index - b.index);
	}

	get inlineArguments(): ICommandArgument[] {
		//@ts-ignore
		return getInheritedMetadata(this, 'inlineExecute').sort((a, b) => a.index - b.index);
	}
}
