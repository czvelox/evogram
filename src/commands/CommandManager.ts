import type { TelegramSetMyCommandsParams } from '../types';
import { Evogram } from '../Client';
import { CommandContext, MessageContext } from '../contexts';
import { Command } from './Command';

export class CommandManager {
	constructor(private client: Evogram) {
		setTimeout(() => this.setBotCommands, 10000);
	}

	public static commands: Command[] = [];

	/** Sets the bot commands for the client. */
	public setBotCommands() {
		const commands: TelegramSetMyCommandsParams[] = [];
		// Iterate through all the commands in the CommandManager.
		// If a command has a description...
		for (const command of CommandManager.commands)
			if (command.params.description)
				// Iterate through each language and text pair in the command's description.
				// If there's already a command set for the current language...
				for (const [, { text, language }] of command.params.description.entries())
					commands.find((x) => x.language_code === language)
						? // Push the current command to that language's command list.
							commands.find((x) => x.language_code === language)?.commands.push({ command: command.params.name, description: text })
						: // Otherwise, create a new object for that language with the current command.
							commands.push({ language_code: language, commands: [{ command: command.params.name, description: text }] });

		for (const item of commands) this.client.api.setMyCommands(item);
	}

	/**
	 * Gets a command from the list given a command context.
	 * @param {CommandContext} context The command context to search for
	 * @returns {(Command | undefined)} Returns the command or undefined if not found
	 */
	public static getCommand(context: CommandContext): Command | undefined {
		for (const command of CommandManager.commands) if (command.isExecutable(context)) return command;
	}
}
