import { TelegramChosenInlineResult } from '../../../types';
import { Context, ContextD } from '../../core';
import { LocationContext, UserContext } from '../../migrated';

@ContextD('ChosenInlineResult')
export class ChosenInlineResultContext extends Context<TelegramChosenInlineResult> {
	/** User who chose the inline result. */
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.from });
	/** Location associated with the inline result, if provided. */
	public location = this.getContext<LocationContext | undefined>({ key: 'Location', source: this.source.location });

	/** The query that was sent by the user when they selected the inline result. */
	public query = this.source.query;
	/** Unique identifier for the result that was chosen. */
	public resultId = this.source.result_id;
	/** Unique identifier for the inline message, if applicable. */
	public inlineMessageId = this.source.inline_message_id;
}
