import { TelegramChat, TelegramMessageEntity } from '../../../types';
import { ContextD } from '../../core';
import { MessageOriginContext, UserContext } from '../../../migrated';
import { MessageAttachments } from './MessageAttachments';
import { MessageMethods } from './MessageMethods';
import { ReplyContext } from './MessageReply.context';
import { MessageUpdate } from './MessageUpdates';

@ContextD('Message')
export class MessageContext extends MessageMethods {
	/** The ID of the message. */
	public id = this.source.message_id;

	/** The text of the message or its caption, if available. */
	public text = this.source.text || this.source.caption;

	/** The signature of the message author, if provided. */
	public signature = this.source.author_signature;

	/** The timestamp of when the message was sent (Unix time). */
	public date = this.source.date;

	/** The timestamp of when the message was last edited, if available (Unix time). */
	public editDate = this.source.edit_date;

	/** The ID of the message thread, if this message is part of a thread. */
	public messageThreadID = this.source.message_thread_id;

	/** The ID of the business connection, if present. */
	public businessConnectionID = this.source.business_connection_id;

	/** Indicates if this message is part of a topic. */
	public isTopicMessage = this.source.is_topic_message;

	/** Indicates if the message has protected content. */
	public hasProtectedContent = this.source.has_protected_content;

	/** The ID of the special effect applied to this message, if any. */
	public effectID = this.source.effect_id;

	/** Indicates if this message is an automatic forward. */
	public isAutomaticForward = this.source.is_automatic_forward;

	/** Indicates if the message was sent from offline mode. */
	public isFromOffline = this.source.is_from_offline;

	/** The user who sent the message. */
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.from });

	/** The bot that forwarded the message, if any. */
	public viaBot = this.getContext<UserContext | undefined>({ key: 'User', source: this.source.via_bot });

	/** The chat where the message was sent. */
	public chat = this.getContext<TelegramChat>({ key: 'Chat', source: this.source.chat });

	/** The chat that forwarded the message, if different from the sender. */
	public senderChat = this.getContext<TelegramChat | undefined>({ key: 'Chat', source: this.source.sender_chat });

	/** The message to which this message is a reply. */
	public replyMessage = new ReplyContext(this);

	/** The origin of the forwarded message, if applicable. */
	public forwardMessage = this.getContext<MessageOriginContext | undefined>({ key: 'MessageOrigin', source: this.source.forward_origin });

	/** The entities (like mentions, hashtags) present in the message. */
	public entities = (this.source.entities || this.source.caption_entities)?.map((x) => this.getContext<TelegramMessageEntity>({ key: 'MessageEntity', source: x }));

	/** The reply markup (e.g., inline keyboard) associated with the message. */
	public replyMarkup = this.source.reply_markup;

	/** The updates related to this message. */
	public updates = new MessageUpdate(this);

	/** The attachments (like photos, videos) present in the message. */
	public attachments = new MessageAttachments(this);
}
