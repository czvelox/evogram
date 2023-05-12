import type { ISetMyCommandsParams } from "../../interfaces";
import { Evogram } from "../../Client";
import { UserMessageContext } from "../../contexts";
import { Command } from "./Command";
import { commandsHandler } from "./commandHandler";

export class CommandManager {
	constructor(private client: Evogram) {
		client.updates.on("message", commandsHandler);
		setTimeout(() => this.setBotCommands, 10000);
	}

	public static commands: Command[] = [];

	/** Sets the bot commands for the client. */
	public setBotCommands() {
		const commands: ISetMyCommandsParams[] = [];
		// Iterate through all the commands in the CommandManager.
		for(const command of CommandManager.commands) 
			// If a command has a description...
			if(command.params.description)
				// Iterate through each language and text pair in the command's description.
				for(const [, { text, language }] of command.params.description.entries()) 
					// If there's already a command set for the current language...
					commands.find(x => x.language_code === language) ? 
						// Push the current command to that language's command list.
						commands.find(x => x.language_code === language)?.commands.push({ command: command.params.name, description: text }) :
						// Otherwise, create a new object for that language with the current command.
						commands.push({ language_code: language, commands: [{ command: command.params.name, description: text }] });

		for(const item of commands) this.client.api.setMyCommands(item);
	}

	/**
	 * Gets a command from the list given a message context.
	 * @param {MessageContext} message The message context to search for
	 * @returns {(Command | undefined)} Returns the command or undefined if not found
	 */
	public static getCommand(message: UserMessageContext): Command | undefined {
		for(const command of CommandManager.commands)
			if(command.isExecutable(message)) return command;
	}
}