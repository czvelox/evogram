import { CommandContext, InlineQueryContext, MessageContext } from '../migrated';
import { Command } from './Command';
import { ICommandArgument } from './commandArgument.decorator';
import { Logger } from '../logger';

export class ArgumentParser {
	private context: CommandContext | MessageContext | InlineQueryContext;
	private command: Command;
	private args: ICommandArgument[];
	private argsType: string[];
	private text: string | undefined;
	private savedArgs: Record<string, any>;

	private logger = new Logger('ArgumentParser');

	constructor(context: CommandContext | MessageContext | InlineQueryContext, command: Command) {
		this.context = context;
		this.command = command;
		this.args = context instanceof CommandContext ? command.arguments : command.inlineArguments;
		this.argsType = (typeof command.params.argsMethod === 'string' ? [command.params.argsMethod] : command.params.argsMethod) || [
			'space',
		];
		this.savedArgs = this.getSavedArgs();
		this.text = this.getCommandText();
	}

	private getSavedArgs(): Record<string, any> {
		if (this.context instanceof InlineQueryContext) {
			return {
				...this.context.arguments,
				...((typeof this.context.state.callbackData === 'object' ? this.context.state.callbackData.payload : {}) || {}),
			};
		}

		return {
			...((typeof this.context.state.callbackData === 'object' ? this.context.state.callbackData.payload : {}) || {}),
		};
	}

	private getCommandText(): string | undefined {
		let text: string | undefined;

		if (this.context instanceof CommandContext) text = this.context.message?.text?.replace(/^\/(\S+)\s?/, '').trim();
		else if (this.context instanceof InlineQueryContext) text = this.context?.query?.replace(/^\/(\S+)\s?/, '').trim();
		else if (this.context instanceof MessageContext) text = this.context.text?.replace(/^\/(\S+)\s?/, '').trim();

		for (const alias of this.command.params.aliases || [])
			if (typeof alias === 'string' && text?.startsWith(alias)) text = text.replace(alias, '').trim();

		return text;
	}

	private getMissingArgs(): ICommandArgument[] {
		return this.args.filter((arg) => !this.savedArgs[typeof arg === 'string' ? arg : arg.name] && !arg.isOptional);
	}

	private async validateArguments(
		resultArguments: Record<string, any>
	): Promise<{ resultArguments: Record<string, any>; validateArgs: Record<string, any> } | null> {
		let validateArgs: Record<string, any> = {};

		if (this.context instanceof CommandContext)
			for (const arg of this.args) {
				let isValid = false;
				let validationError: any = null;

				while (!isValid) {
					const currentValue = resultArguments[arg.name];
					if (arg.question !== undefined && (currentValue === undefined || validationError)) {
						resultArguments[arg.name] = await arg.question({
							args: resultArguments,
							validateArgs,
							context: this.context,
							value: currentValue,
							command: this.command,
							arg,
							error: validationError,
						});
						validationError = null;
					}

					if (arg.validators.length) {
						try {
							const newValue = await arg.validators.reduce(async (promise, validator) => {
								const prevValue = await promise;
								return validator({
									args: resultArguments,
									validateArgs,
									//@ts-ignore
									context: this.context,
									value: prevValue,
									command: this.command,
									arg,
								});
							}, Promise.resolve(resultArguments[arg.name]));

							if ((newValue === undefined || newValue === null) && !arg.isOptional) {
								if (arg.question !== undefined && arg.askAgain) {
									this.logger.warn(`Argument "${arg.name}" is not valid, asking again...`);
									resultArguments[arg.name] = undefined;
									continue;
								}
								this.logger.warn(`Argument "${arg.name}" in command "${this.command.params.name}" is not valid`);
								return null;
							}

							validateArgs[arg.name] = newValue;
							isValid = true;
						} catch (error) {
							if (arg.question !== undefined) {
								validationError = error;
								resultArguments[arg.name] = undefined;
								continue;
							}
							throw error;
						}
					} else {
						validateArgs[arg.name] = currentValue;
						isValid = true;
					}
				}
			}
		else validateArgs = resultArguments;

		if (this.args.find((x) => (validateArgs[x.name] === undefined || validateArgs[x.name] === null) && !x.isOptional)) {
			this.logger.warn(
				`Argument "${this.args.find((x) => (validateArgs[x.name] === undefined || validateArgs[x.name] === null) && !x.isOptional)?.name}" in command "${this.command.params.name}" is not specified by user`
			);
			return null;
		}

		return { resultArguments, validateArgs };
	}

	public async parse() {
		if (!this.command.arguments && !this.command.inlineArguments) return { resultArguments: {}, validateArgs: {} };

		let resultArguments = this.savedArgs;
		const missingArgs = this.getMissingArgs();

		if (!(this.context instanceof InlineQueryContext)) resultArguments = await this.parseArguments(missingArgs, resultArguments);

		return this.validateArguments(resultArguments);
	}

	private async parseArguments(missingArgs: ICommandArgument[], resultArguments: Record<string, any>): Promise<Record<string, any>> {
		for (const type of this.argsType) {
			const splitSpace = this.text?.split(' ') || [];

			if (this.context instanceof CommandContext ? !this.context.callbackQuery : true) {
				if (['parameterized', 'space', 'fulltext', 'newline'].includes(type) && !this.text) continue;
				else if (type === 'space' && this.argsType.includes('parameterized') && this.text && this.text.split('--').length > 1)
					continue;
				else if (type === 'space' && missingArgs.length > splitSpace.length) continue;
				else if (type === 'parameterized' && this.text && this.text.split('--').length < 2) continue;
			}

			resultArguments = await this.parseByType(type, resultArguments, missingArgs);
		}

		return resultArguments;
	}

	private async parseByType(
		type: string,
		resultArguments: Record<string, any>,
		missingArgs: ICommandArgument[]
	): Promise<Record<string, any>> {
		if (!this.text) return resultArguments;

		switch (type) {
			case 'space':
				const spaceValue = getBySpace(this.text, this.args);
				if (spaceValue) resultArguments = { ...spaceValue, ...this.savedArgs };
				break;

			case 'fulltext':
				const fulltextValue = { [typeof missingArgs[0] === 'string' ? missingArgs[0] : missingArgs[0].name]: this.text };
				resultArguments = { ...this.savedArgs, ...fulltextValue };
				break;

			case 'parameterized':
				const paramValue = getByParameterized(this.text);
				if (paramValue) resultArguments = { ...this.savedArgs, ...paramValue };
				break;

			case 'newline':
				const newlineValue = getByNewline(this.text, this.args);
				if (newlineValue) resultArguments = { ...this.savedArgs, ...newlineValue };
				break;
		}

		return resultArguments;
	}
}

export async function getCommandArguments(context: CommandContext | MessageContext | InlineQueryContext, command: Command) {
	const parser = new ArgumentParser(context, command);
	return parser.parse();
}

// Сохраняем существующие вспомогательные функции для обратной совместимости
export { getByNewline, getBySpace, getByParameterized };

function getByNewline(text: string, args: ICommandArgument[]) {
	const splitLines = text.split('\n').filter((x) => x.trim().length > 0);
	return Object.assign(
		//@ts-ignore
		...args.map((x, i) => ({ [typeof x === 'string' ? x.replace('?', '') : x.name.replace('?', '')]: splitLines[i] }))
	);
}

function getBySpace(text: string, args: ICommandArgument[]) {
	const splitSpace = text.split(' ');
	const result = args.map((x, i) => ({ [x.name]: splitSpace[i] }));

	if (!result?.length) return null;
	//@ts-ignore
	return Object.assign(...result);
}

function getByParameterized(text: string) {
	const split = text.split('--');
	if (!split) return;
	split.splice(0, 1);
	//@ts-ignore
	return Object.assign(...split.map((x) => ({ [x.split('=')[0]]: x.split('=')[1]?.trim() })));
}
