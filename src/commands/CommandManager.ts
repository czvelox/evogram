import type { TelegramBotCommandScope, TelegramCommandScopeList, TelegramSetMyCommandsParams } from '../types';
import { Evogram } from '../Client';
import { CommandContext } from '../contexts';
import { Command } from './Command';
import { CommandParams } from './command.types';

export type CommandInstance = new (client: Evogram) => Command;
export class CommandManager {
	constructor(private client: Evogram) {}

	/**
	 * Static array to store registered commands and their parameters.
	 * @static
	 */
	public static commands: CommandInstance[] = [];
	/**
	 * Instance array to hold loaded Command objects.
	 */
	public commands: Command[] = [];

	/**
	 * Loads commands into the `commands` array for the current instance.
	 *
	 * If a list of `CommandInstance` constructors is provided, the method creates instances
	 * of each command using the associated `Evogram` client.
	 * If no list is provided, it uses the commands from the static registry (`CommandManager.commands`).
	 *
	 * @param {CommandInstance[]} [commands] - An optional array of command constructors to load.
	 */
	public async loadCommands(commands?: CommandInstance[]) {
		if (commands) {
			this.commands = commands.map((x) => new x(this.client));
		} else {
			this.commands = CommandManager.commands.map((x) => new x(this.client));
		}

		this.commands = this.commands.sort((a, b) => (b.params.priority || 0) - (a.params.priority || 0));
	}

	/** Sets the bot commands for the client. */
	public async setBotCommands() {
		const commands: TelegramSetMyCommandsParams[] = [];
		// Iterate through all the commands in the CommandManager.
		// If a command has a description...
		for (const command of this.commands.filter((x) => x.params.description)) {
			if (command.params.description) {
				const descriptions = Array.isArray(command.params.description) ? command.params.description : [command.params.description];
				let defaultCommandName = command.params.name?.toLowerCase() || command.params.name?.toString().toLowerCase()!;
				// Iterate through each language and text pair in the command's description.
				// If there's already a command set for the current language...
				// prettier-ignore
				for (const { text, language, scope, command: commandName } of descriptions) {
					const scopes = scope ? (Array.isArray(scope) ? scope : [scope]) : ['default']
					for(const scope of scopes)
						commands.find((x) => x.language_code === language && x.scope?.type === scope)
							? commands.find((x) => x.language_code === language && x.scope?.type === scope)?.commands.push({ command: commandName || defaultCommandName, description: text })
							: commands.find((x) => x.scope && x.scope.type === scope)
								? commands.find((x) => x.scope && x.scope.type === scope)?.commands.push({ command: commandName?.toLowerCase() || defaultCommandName, description: text })
								//@ts-ignore
								: commands.push({ language_code: language, commands: [{ command: commandName?.toLowerCase() || defaultCommandName, description: text }], scope: { type: scope }});
				}
			}
		}

		for (const item of commands) await this.client.api.setMyCommands(item);
	}

	/**
	 * Gets a command from the list given a command context.
	 * @param {CommandContext} context The command context to search for
	 * @returns {(Command | undefined)} Returns the command or undefined if not found
	 */
	public getCommand(context: CommandContext): Command | undefined {
		for (const command of this.commands) if (command.isExecutable(context)) return command;
	}
}
