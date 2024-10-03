import type { CallbackQueryContext, CommandContext, MessageContext } from '../contexts/migrated';
import type { TelegramSendMessageParams } from '../types';

export type CommandArgumentsStdin = Record<string, MessageContext>;
export type CommandExecuteData = { args: Record<string, any> };

export type CommandArgumentType = 'parameterized' | 'space' | 'stdin' | 'fulltext';
export interface CommandArguments {
	/**
	 * Designates how the arguments for the command will be accepted
	 *
	 * @param parameterized - Command arguments are passed in as an object with key-value pairs
	 * @example
	 * 	User: /command --param1=value --param2=value
	 *
	 * @param space - Command arguments are passed in as space-separated values
	 * @example
	 * 	User: /command value1 value2
	 *
	 * @param stdin - Command arguments are received through standard input
	 * @example
	 * 	User: /command
	 * 	Bot: What value do you want to specify?
	 * 	User: value
	 *
	 * @param fulltext - Accepted for only one argument, returns all text from the message
	 * @example
	 * 	User: /command here is a lot of text that will carry over completely into one argument
	 */
	method: CommandArgumentType | CommandArgumentType[];
	// prettier-ignore
	value: (string | { name: string, default?: ((context: CommandContext) => any) | string | number | Record<string, any>, question?: string | Omit<TelegramSendMessageParams, 'chat_id'> })[];
}

export interface CommandDescription {
	/** Description of the command; 1-256 characters. */
	text: string;
	/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
	language?: string;
}

/** Defines the parameters of a command. */
export interface CommandParams {
	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	name: string;
	aliases?: string[];
	args?: CommandArguments;
	description?: CommandDescription[];
	onlyFromKeyboard?: boolean;
}
