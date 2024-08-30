import { TelegramChat, TelegramPollAnswer } from '../../../types';
import { Context, ContextD } from '../../core';
import { UserContext } from '../../migrated';

@ContextD('PollAnswer')
export class PollAnswerContext extends Context<TelegramPollAnswer> {
	/** User context for the user who changed the answer to the poll. */
	public user = this.getContext<UserContext | undefined>({ key: 'User', source: this.source.user });
	/** The chat that changed the answer to the poll, if the voter is anonymous. */
	public voterChat = this.getContext<TelegramChat | undefined>({ key: 'Chat', source: this.source.voter_chat });

	/** Gets the ID of the poll. */
	public id = this.source.poll_id;
	/** Gets the IDs of the options selected by the user. */
	public options = this.source.option_ids;
}
