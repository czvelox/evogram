import type { IAnswerCallbackQueryParams, ICallbackQuery } from "../interfaces";
import { Context } from "../modules/context";
import { UserContext } from "./";

export class CallbackQueryContext extends Context<ICallbackQuery> {
	public client = this._client;

	/** The user who triggered the callback query. */
	public user = this.client.modules.contexts.getContext<UserContext>("User", this._source.from);
	/** The message context associated with the callback query, if available. */
	public message = this._source.message && this.client.modules.contexts.getContext("Message", this._source.from);

	/** The ID of the callback query. */
	public get id() { return this._source.id }
	/** The data associated with the callback query. */
	public get data() { return this._source.data }
	/** The ID of the inline message that was sent with the button that triggered the callback query, if available. */
	public get inlineMessageID() { return this._source.inline_message_id }
	/** The chat instance that was used to generate the inline button, if available. */
	public get chatInstance() { return this._source.chat_instance }
	/** The short name of the game to be returned, if this callback query is from a game message. */
	public get gameShortName() { return this._source.game_short_name }

	/**
	 * Answers the callback query with the specified parameters.
	 * @param params - The parameters to use for answering the callback query.
	 * @returns A Promise that resolves with the result of the API call to answer the callback query.
	 */
	public answer(params?: Partial<IAnswerCallbackQueryParams>) {
		return this._client.api.answerCallbackQuery(Object.assign({ callback_query_id: this._source.id}, params));
	}
}