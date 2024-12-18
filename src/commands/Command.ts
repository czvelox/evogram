import { Evogram } from '..';
import { CommandContext } from '../migrated';
import { CommandExecuteData, CommandParams } from './command.types';

export abstract class Command {
	public params: CommandParams = { name: 'unknown' };

	constructor(
		private client: Evogram,
		params?: CommandParams
	) {
		if (params) this.params = params;
	}

	/**
	 * Checks if a command is executable based on an incoming message.
	 * @param message - The incoming message.
	 */
	public isExecutable(context: CommandContext): boolean {
		if (this.params.onlyFromKeyboard && !context.callbackQuery) return false;
		if (this.params.onlyFromKeyboard !== false && context.client.params.keyboardMode?.menuCommand && context.client.params.keyboardMode?.menuCommand !== this.params.name)
			return false;

		if (this.params.accessLevel && context.user.userDB.accessLevel < this.params.accessLevel) return false;
		if (context.callbackQuery?.source.data?.includes(this.params.name)) return true;

		if (context.text)
			for (const item of [`/${this.params.name}`, ...(this.params.aliases || [])])
				if (typeof item === 'string' ? context.text.split(' ')[0].toLowerCase() === item.toLowerCase() : item.test(context.text)) return true;

		return false;
	}

	/**
	 * Executes a command based on an incoming message.
	 * @param message - The incoming message.
	 */
	public abstract execute(context: CommandContext, data: CommandExecuteData): any;

	public onError(context: CommandContext, error: Error): any {
		throw error;
	}

	static onError(context: CommandContext, error: Error) {
		throw error;
	}
}
