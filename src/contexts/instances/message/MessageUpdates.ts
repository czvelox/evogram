import { Context } from '../../core';
import { TelegramMessage } from '../../../types';
import { MessageContext, UserContext } from '../../../migrated';

/**
 * MessageUpdate handles updates related to a specific Telegram message,
 * including new members, left members, title changes, and more.
 */
export class MessageUpdate extends Context<TelegramMessage> {
	/** The boost count for a chat, if available */
	public boostedChat = this.source.sender_boost_count;

	/** Retrieves the context for new members added to the chat. */
	public newChatMember = this.source.new_chat_members?.map((x) => this.getContext<UserContext>({ key: 'User', source: x }));

	/** Retrieves the context for a member who left the chat. */
	public leftChatMember = this.getContext<UserContext | undefined>({ key: 'User', source: this.source.left_chat_member });

	/** The new title of the chat, if it was updated */
	public newChatTitle = this.source.new_chat_title;

	/** The new photo of the chat, if it was updated */
	public newChatPhoto = this.source.new_chat_photo;

	/** The ID of the chat this group was migrated to, if applicable */
	public migrateToChatID = this.source.migrate_to_chat_id;

	/** The ID of the chat this group was migrated from, if applicable */
	public migrateFromChatID = this.source.migrate_from_chat_id;

	/** The connected website associated with the message, if available */
	public connectedWebsite = this.source.connected_website;

	/** The giveaway winners related to the message, if applicable */
	public giveawayWinners = this.source.giveaway_winners;

	/**
	 * The pinned message, if applicable.
	 * Contains the content or reference to a message that has been pinned in the chat.
	 */
	public pinnedMessage = this.getContext<MessageContext>({ key: 'Message', source: this.source.pinned_message });
}
