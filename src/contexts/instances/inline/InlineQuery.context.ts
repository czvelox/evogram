import { TelegramInlineQuery, TelegramInlineQueryResult, TelegramLocation } from '../../../types';
import { Context, ContextD } from '../../core';
import { LocationContext, UserContext } from '../../../migrated';

@ContextD('InlineQuery')
export class InlineQueryContext extends Context<TelegramInlineQuery> {
	public id = this.source.id;
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.from });
	public query = this.source.query.replace(/&amp;/g, '&');
	public offset = this.source.offset;

	public location = this.getContext<LocationContext | undefined>({ key: 'Location', source: this.source.location });
	public chatType = this.source.chat_type;

	public arguments = Object.assign(
		{},
		...Object.entries(Object.fromEntries(new URLSearchParams(decodeURI(this.query.slice(this.query.indexOf('?') + 1))).entries())).map(
			(x, y) => ({
				[x[0].trim()]: x[1].trim().length ? x[1].trim() : undefined,
			})
		)
	);

	/**
	 * Use this method to send answers to an inline query. On success, True is returned.
	 *
	 * No more than 50 results per query are allowed.
	 *
	 * @param results - An array of inline query results.
	 * @param options - Optional parameters.
	 * @param options.cache_time - The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300.
	 * @param options.is_personal - Pass True, if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query.
	 * @param options.next_offset - Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don t support pagination. Offset length can t exceed 64 bytes.
	 * @param options.switch_pm_text - If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter.
	 * @param options.switch_pm_parameter - Parameter for the start message sent to the bot when user presses the switch button.
	 * @returns A promise that resolves with a boolean indicating whether the query was answered successfully.
	 */
	public async answer(
		results: TelegramInlineQueryResult[],
		options?: {
			cache_time?: number;
			is_personal?: boolean;
			next_offset?: string;
			switch_pm_text?: string;
			switch_pm_parameter?: string;
		}
	): Promise<boolean> {
		return this.client.api.answerInlineQuery({
			inline_query_id: this.id,
			results,
			...options,
		});
	}
}
