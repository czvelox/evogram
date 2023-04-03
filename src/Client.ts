import { API } from "./API";
import { BotContext } from "./contexts";
import { Modules } from "./modules/";
import { Updates } from "./updates";

/** Options for initializing the Evogram */
export interface IEvogramParams {
	token: string;
}

/** A class representing an instance of the Telegram bot. */
export class Evogram {
	/** An instance of the Telegram Bot API client. */
	public api = new API(this);
	/** An instance of the Telegram updates client. */
	public updates = new Updates(this);
	/** A collection of modules for this bot */
	public modules = new Modules(this);

	/** Context of a running bot */
	public bot?: BotContext;
 
	/**
	 * Create a new instance of the Evogram class.
	 * @param {IEvogramParams} options - The options for initializing the instance.
	 */
	constructor(public options: IEvogramParams) {
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