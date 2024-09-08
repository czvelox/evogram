import { TelegramChat, TelegramMessageOrigin, TelegramMessageOriginChannel, TelegramMessageOriginChat, TelegramMessageOriginHiddenUser, TelegramMessageOriginUser } from '../../../types';
import { Context, ContextD } from '../../core';
import * as Contexts from '../../migrated';

/**
 * MessageOriginContext handles the source information of a message's origin,
 * including user, hidden user, chat, or channel.
 */
@ContextD('MessageOrigin')
export class MessageOriginContext extends Context<TelegramMessageOrigin> {
	/** The type of the message origin (e.g., user, chat, channel, etc.) */
	public type = this.source.type;

	/** The date when the message was sent */
	public date = this.source.date;

	/** Retrieves the context for a user origin if the message is from a user. */
	public user = this.getContext<Contexts.MessageOriginUserContext>({ key: 'MessageOriginUser', source: this.source });

	/** Retrieves the context for a hidden user origin if the message is from a hidden user. */
	public hiddenUser = this.getContext<Contexts.MessageOriginHiddenUserContext>({ key: 'MessageOriginHiddenUser', source: this.source });

	/** Retrieves the context for a chat origin if the message is from a chat. */
	public chat = this.getContext<Contexts.MessageOriginChatContext>({ key: 'MessageOriginChat', source: this.source });

	/** Retrieves the context for a channel origin if the message is from a channel. */
	public channel = this.getContext<Contexts.MessageOriginChannelContext>({ key: 'MessageOriginChannel', source: this.source });
}

/**
 * MessageOriginUserContext handles the context of a message sent by a specific user.
 */
@ContextD('MessageOriginUser')
export class MessageOriginUserContext extends Context<TelegramMessageOriginUser> {
	/** Retrieves the context for the user who sent the message. */
	public user = this.getContext<Contexts.UserContext>({ key: 'User', source: this.source.sender_user });
}

/**
 * MessageOriginHiddenUserContext handles the context of a message sent by a hidden user.
 */
@ContextD('MessageOriginHiddenUser')
export class MessageOriginHiddenUserContext extends Context<TelegramMessageOriginHiddenUser> {
	/** The username of the hidden user who sent the message */
	public username = this.source.sender_user_name;
}

/**
 * MessageOriginChatContext handles the context of a message sent within a chat.
 */
@ContextD('MessageOriginChat')
export class MessageOriginChatContext extends Context<TelegramMessageOriginChat> {
	/** Retrieves the context for the chat from which the message was sent. */
	public chat = this.getContext<TelegramChat>({ key: 'Chat', source: this.source.sender_chat });

	/** The signature of the message's author, if available */
	public signature = this.source.author_signature;
}

/**
 * MessageOriginChannelContext handles the context of a message sent within a channel.
 */
@ContextD('MessageOriginChannel')
export class MessageOriginChannelContext extends Context<TelegramMessageOriginChannel> {
	/** The ID of the message in the channel */
	public messageID = this.source.message_id;

	/** Retrieves the context for the chat (channel) from which the message was sent. */
	public chat = this.getContext<TelegramChat>({ key: 'Chat', source: this.source.chat });

	/** The signature of the message's author, if available */
	public signature = this.source.author_signature;
}
