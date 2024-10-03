import { CommandContext } from '../contexts/migrated';
import { CommandExecuteData, CommandParams } from './command.types';

export abstract class Command {
	constructor(public params: CommandParams) {}

	/**
	 * Checks if a command is executable based on an incoming message.
	 * @param message - The incoming message.
	 */
	public isExecutable(context: CommandContext): boolean {
		if (context.text?.startsWith(`/${this.params.name}`)) return true;
		for (const alias of this.params.aliases || []) if (context.text?.startsWith(alias)) return true;

		return false;
	}

	public validateArguments(context: CommandContext, args: Record<string, any>) {
		const _args: Record<string, any> = {};

		if (this.params.args) {
			for (const arg of this.params.args.value) {
				const name = typeof arg === 'string' ? arg : arg.name;
				const cleanName = name.replace('?', '');
				const isOptional = name.endsWith('?') || Boolean(typeof arg === 'object' && arg.default);
				const argValue = (args && args[cleanName]) || (typeof arg === 'object' && ((typeof arg.default === 'function' && arg.default(context)) || arg.default));

				if (!argValue && !isOptional) {
					//@ts-ignore
					context.send(typeof arg === 'object' && typeof arg.question === 'object' ? arg.question : `Please provide the ${cleanName} argument.`);
					return null;
				} else if (!argValue) {
					_args[cleanName] = typeof arg === 'object' ? arg.default || null : null;
				} else _args[cleanName] = argValue;
			}

			return _args;
		} else return null;
	}

	/**
	 * Executes a command based on an incoming message.
	 * @param message - The incoming message.
	 */
	public abstract execute(context: CommandContext, data: CommandExecuteData): any;

	public onError?: (context: CommandContext, error: Error) => any;
	static onError(context: CommandContext, error: Error) {
		throw error;
	}
}
