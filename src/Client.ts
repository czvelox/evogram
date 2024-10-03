import { API } from './API';
import { DatabaseManager } from './database';
import { Middleware } from './middleware';
import { QuestionManager } from './question';
import { Updates } from './updates';

interface EvogramParams {
	token: string;
}

/** Represents the main client for the Evogram framework. */
export class Evogram {
	private static readonly TOKEN_REGEX = /^[0-9]+:[a-zA-Z0-9_-]+$/;

	public api = new API(this);
	public middleware = new Middleware();
	public updates = new Updates(this);
	public database = new DatabaseManager(this.params.token.split(':')[0] || 'default');
	public question = new QuestionManager();

	/**
	 * Creates an instance of the Evogram client.
	 * @param token - The bot token used for authentication with the Telegram Bot API.
	 * @throws {Error} Throws an error if the token is invalid.
	 */
	constructor(public readonly params: EvogramParams) {
		this.validateToken(this.params.token);
	}

	/**
	 * Validates the bot token.
	 * @param token - The bot token to validate.
	 * @throws {Error} Throws an error if the token is invalid.
	 */
	private validateToken(token: string) {
		if (!Evogram.TOKEN_REGEX.test(token)) throw new Error('Invalid bot token format.');
	}
}
