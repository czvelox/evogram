import path from 'path';
import { API } from './API';
import { DatabaseManager } from './database';
import { Middleware } from './middleware';
import { QuestionManager } from './question';
import { Updates } from './updates';
import { DataSourceOptions } from 'typeorm';
import { CommandManager } from './commands';
import { BotContext } from './contexts';
import { Logger, LogLevel } from './logger';

interface EvogramParams {
	token: string;
	database?: DataSourceOptions;
	/**
	 * Flood control settings to prevent message overload.
	 * Can be either:
	 * - `true` to enable sequential processing, where the next message is processed only after the previous one completes.
	 * - An object with a `delay` property to enforce a time-based delay between messages.
	 */
	floodControl?:
		| boolean // If true, the bot will wait for the previous message to complete before handling the next
		| {
				/**
				 * Time delay in milliseconds between processing each message. Used to prevent flooding
				 * based on timing if `floodControl` is an object.
				 */
				delay: number;
		  };
	logLevel?: LogLevel;

	dbConfig?: {
		messageLifetime?: number;
		maxMessages?: number;
		maxMessagesPayload?: number;
	};
}

/** Represents the main client for the Evogram framework. */
export class Evogram {
	private static readonly TOKEN_REGEX = /^[0-9]+:[a-zA-Z0-9_-]+$/;

	private logger = new Logger();
	public directory = path.join(process.cwd(), '.evogram', this.params.token.split(':')[0] || 'default');

	public api = new API(this);
	public middleware = new Middleware();
	public updates = new Updates(this);
	public database = new DatabaseManager(this);
	public question = new QuestionManager();
	public commands = new CommandManager(this);

	public bot!: BotContext;

	/**
	 * Creates an instance of the Evogram client.
	 * @param token - The bot token used for authentication with the Telegram Bot API.
	 * @throws {Error} Throws an error if the token is invalid.
	 */
	constructor(public readonly params: EvogramParams) {
		if (!Evogram.TOKEN_REGEX.test(this.params.token)) throw new Error('Invalid bot token format.');
	}

	async init() {
		await this.database.init();
		this.bot = await this.api.getMe();
		this.logger.log(`Initialized bot: ${this.bot.username} (${this.bot.id})`);
	}

	public clone(): Evogram {
		return { ...this, api: { ...this.api } };
	}
}
