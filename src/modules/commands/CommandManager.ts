import type { ISetMyCommandsParams } from "../../interfaces";
import { Evogram } from "../../Client";
import { MessageContext } from "../../contexts";
import { Command } from "./Command";

export class CommandManager {
	constructor(private client: Evogram) {}

	/** Map of commands stored by name */
	private commands: Command[] = [];
	private timeoutId: ReturnType<typeof setTimeout> | null = null;

	/**
	 * Adds a new command to the list.
	 * @param {Command} command The command to add
	 * @returns {this} Returns the command manager with the added command
	 */
	public addCommand(command: Command): this {
	 	this.commands.push(command);

		// Clear previous timeout if there is one
		if (this.timeoutId) clearTimeout(this.timeoutId);

		// Timeout to wait for the end of adding commands
		this.timeoutId = setTimeout(() => {
			// Array with commands in ISetMyCommandsParams format for registration
			const commands: ISetMyCommandsParams[] = [];
			for(const command of this.commands) 
				if(command.params?.сommandParams)
					for(const params of command.params?.сommandParams || []) 
						commands.find(x => x.language_code === params.language_code) ? 
							commands.find(x => x.language_code === params.language_code)?.commands.push({ command: command.params.name, description: params.description }) :
							commands.push({ language_code: params.language_code, commands: [{ command: command.params.name, description: params.description }] });

			for(const item of commands) this.client.api.setMyCommands(item);
			this.timeoutId = null;
		}, 1500);

	  	return this;
	}

	/**
	 * Gets a command from the list given a message context.
	 * @param {MessageContext} message The message context to search for
	 * @returns {(Command | undefined)} Returns the command or undefined if not found
	 */
	public getCommand(message: MessageContext): Command | undefined {
		return this.commands.find(command => {
			let status = false;
			command.isExecutable(message, () => status = true);
			if(status) return command;
		});
	}
}