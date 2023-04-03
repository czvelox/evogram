import type { ISetMyCommandsParams } from "../../interfaces";
import { Evogram } from "../../Client";
import { MessageContext } from "../../contexts";
import { Command } from "./Command";
import { commandsHandler } from "./commandHandler";

export class CommandManager {
	constructor(private client: Evogram) {
		client.updates.on("message", commandsHandler);
	}

	/** Map of commands stored by name */
	public commands: Command[] = [];
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
				if(command.params?.commandParams)
					for(const params of command.params?.commandParams || []) 
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

	public async getCommandArguments(chat_id: number, user_id: number, command: Command): Promise<{ [x: string]: MessageContext } | undefined> {
		const args = command.params?.args;
		if(!args) return;

		try {
			//@ts-ignore
			return Object(...await Promise.all(args.map((arg) => 
				new Promise(async (resolve, reject) => {
					const incomingMessage = await this.client.api.sendMessage({ chat_id, text: arg.text });
					this.client.modules.questions.addQuestion(user_id, (msg) => {
						if(arg.deleteQuestionMessage) incomingMessage.delete();
						if(arg.deleteAnswerMessage) msg.delete();

						resolve({ [arg.name]: msg });
					})
					setTimeout(reject, 120000);
				})
			)));
		} catch { return undefined }
	}
}