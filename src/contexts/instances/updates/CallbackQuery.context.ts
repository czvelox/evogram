import { IncomingMessage } from 'http';
import { TelegramAnswerCallbackQueryParams, TelegramCallbackQuery } from '../../../types';
import { Context, ContextD } from '../../core';
import { IncomingMessageContext, UserContext } from '../../migrated';

@ContextD('CallbackQuery')
export class CallbackQueryContext extends Context<TelegramCallbackQuery> {
	/** The user who triggered the callback query. */
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.from });
	/** The message context associated with the callback query, if available. */
	public message = this.getContext<IncomingMessageContext>({ key: 'IncomingMessage', source: this.source.message });

	/** The ID of the callback query. */
	public id = this.source.id;
	/** The data associated with the callback query. */
	public data = this.source.data as string | Record<string, any>;
	/** The ID of the inline message that was sent with the button that triggered the callback query, if available. */
	public inlineMessageID = this.source.inline_message_id;
	/** The chat instance that was used to generate the inline button, if available. */
	public chatInstance = this.source.chat_instance;
	/** The short name of the game to be returned, if this callback query is from a game message. */
	public gameShortName = this.source.game_short_name;

	/**
	 * Answers the callback query with the specified parameters.
	 * @param params - The parameters to use for answering the callback query.
	 * @returns A Promise that resolves with the result of the API call to answer the callback query.
	 */
	public answer(params?: Partial<TelegramAnswerCallbackQueryParams>) {
		return this.client.api.answerCallbackQuery(Object.assign({ callback_query_id: this.source.id }, params));
	}
}
