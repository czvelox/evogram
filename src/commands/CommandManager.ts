import type { TelegramSetMyCommandsParams } from '../types';
import { Evogram } from '../Client';
import { CommandContext, MessageContext } from '../contexts';
import { Command } from './Command';

export class CommandManager {
	public static commands: Command[] = [];

	/** Sets the bot commands for the client. */
	public static async setBotCommands(client: Evogram) {
		const commands: TelegramSetMyCommandsParams[] = [];
		// Iterate through all the commands in the CommandManager.
		// If a command has a description...
		for (const command of CommandManager.commands)
			if (command.params.description)
				// Iterate through each language and text pair in the command's description.
				// If there's already a command set for the current language...
				// prettier-ignore
				for (const [, { text, language }] of command.params.description.entries())
					commands.find((x) => x.language_code === language && JSON.stringify(x.scope) === JSON.stringify(command.params.scope))
						? commands.find((x) => x.language_code === language && JSON.stringify(x.scope) === JSON.stringify(command.params.scope))?.commands.push({ command: command.params.name.toLocaleLowerCase(), description: text })
						: commands.find(x => x.scope && JSON.stringify(x.scope) === JSON.stringify(command.params.scope)) 
							? commands.find(x => x.scope && JSON.stringify(x.scope) === JSON.stringify(command.params.scope))?.commands.push({ command: command.params.name.toLocaleLowerCase(), description: text })
							: commands.push({ language_code: language, commands: [{ command: command.params.name.toLowerCase(), description: text }], scope: command.params.scope });

		for (const item of commands) await client.api.setMyCommands(item);
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
