import { API } from "./API";
import { BotContext } from "./contexts";
import { CommandManager } from "./modules/commands/CommandManager";
import { ContextManager } from "./modules/context";
import { Updates } from "./updates";

/** Options for initializing the Evogram */
export interface IEvogramParams {
	token: string;
}

/** A class representing an instance of the Telegram bot. */
export class Evogram {
	/** An instance of the Telegram Bot API client. */
	public api: API;
	/** An instance of the Telegram updates client. */
	public updates: Updates;
	/** An instance of the ContextManager for managing and manipulating contexts. */
	public contexts: ContextManager;
	/** Context of a running bot */
	public bot?: BotContext;
	/** Command manager for adding and running bot commands  */
	public commandManager: CommandManager;
 
	/**
	 * Create a new instance of the Evogram class.
	 * @param {IEvogramParams} options - The options for initializing the instance.
	 */
	constructor(public options: IEvogramParams) {
		this.api = new API(this);
		this.updates = new Updates(this);
		this.contexts = new ContextManager(this);
		this.commandManager = new CommandManager(this);

		this.checkTokenValidity();
	}

	/**
	 * Check if a working access token is specified
	 * @return A Promise BotContext instance
	 * @throws Error if the specified token is invalid
	 */
	public async checkTokenValidity() {
		try {
			this.bot = await this.api.getMe();
			return this.bot;
		} catch {
			throw new Error("The specified token is invalid");
		}
	}
}