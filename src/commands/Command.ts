import { CommandContext } from '../migrated';
import { CommandExecuteData, CommandParams } from './command.types';

export abstract class Command {
	constructor(public params: CommandParams) {}

	/**
	 * Checks if a command is executable based on an incoming message.
	 * @param message - The incoming message.
	 */
	public isExecutable(context: CommandContext): boolean {
		if (this.params.onlyFromKeyboard && !context.callbackQuery) return false;
		if (this.params.onlyFromKeyboard !== false && context.client.params.keyboardMode?.menuCommand && context.client.params.keyboardMode?.menuCommand !== this.params.name)
			return false;
		if (!context.text) return false;
		if (this.params.accessLevel && context.user.userDB.accessLevel < this.params.accessLevel) return false;

		for (const item of [`/${this.params.name}`, ...(this.params.aliases || [])])
			if (typeof item === 'string' ? context.text.split(' ')[0] === item : item.test(context.text)) return true;

		return false;
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
