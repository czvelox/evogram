import type { CallbackQueryContext, CommandContext, MessageContext } from '../migrated';
import type { TelegramBotCommand, TelegramBotCommandScope, TelegramCommandScopeList, TelegramSendMessageParams } from '../types';

export type CommandArgumentsStdin = Record<string, MessageContext>;
export type CommandExecuteData = { args: Record<string, any> };

/**
 * Designates how the arguments for the command will be accepted
 *
 **/
export type CommandArgumentType =
	/**
	 * @param parameterized - Command arguments are passed in as an object with key-value pairs
	 * @example
	 * 	User: /command --param1=value --param2=value
	 *
	 */
	| 'parameterized'
	/**
	 * @param space - Command arguments are passed in as space-separated values
	 * @example
	 * 	User: /command value1 value2
	 */
	| 'space'
	/**
	 * @param stdin - Command arguments are received through standard input
	 * @example
	 * 	User: /command
	 * 	Bot: What value do you want to specify?
	 * 	User: value
	 */
	| 'stdin'
	/**
	 * @param fulltext - Accepted for only one argument, returns all text from the message
	 * @example
	 * 	User: /command here is a lot of text that will carry over completely into one argument
	 */
	| 'fulltext'
	/**
	 * @param newline - Command arguments are passed in new line
	 * @example
	 * 	User: /command
	 * 		  value1
	 * 		  value2
	 */
	| 'newline';

export interface CommandDescription {
	scope?: TelegramCommandScopeList | TelegramCommandScopeList[];
	language?: string;
	text: string;
	command?: string;
}

/** Defines the parameters of a command. */
export interface CommandParams {
	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	name?: string;
	/** Text of the back button; 1-32 characters */
	backButton?: string;
	/** Aliases of the command */
	aliases?: (string | RegExp)[];
	/** How the arguments for the command will be accepted */
	argsMethod?: CommandArgumentType | CommandArgumentType[];
	/** Description of the command */
	description?: CommandDescription | CommandDescription[];
	/** Access level of the command */
	accessLevel?: number;
	/** Whether the command can only be used from the keyboard */
	onlyFromKeyboard?: boolean;
	/** Priority of the command */
	priority?: number;
}
