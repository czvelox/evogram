import { TelegramBusinessConnection } from '../../../types';
import { Context, ContextD } from '../../core';
import { UserContext } from '../../../migrated';

@ContextD('BusinessConnection')
export class BusinessConnectionContext extends Context<TelegramBusinessConnection> {
	/** Business account user that created the business connection. */
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.user });

	/** Unique identifier of the business connection. */
	public id = this.source.id;
	/** Date the connection was established in Unix time. */
	public date = this.source.date;
	/** Identifier of a private chat with the user who created the business connection. */
	public userChatId = this.source.user_chat_id;
	/** Indicates whether the bot can act on behalf of the business account in chats active in the last 24 hours. */
	public canReply = this.source.can_reply;
	/** Indicates whether the connection is active. */
	public isEnabled = this.source.is_enabled;
}
