import type { IChatLocation, IChatPermissions, IChatPhoto } from "../../interfaces";
import { MessageContext } from "../";
import { ChatContext } from "./";

export class DetailedChatContext extends ChatContext {
	/* The chat's photo object. */
	public photo = this._source.photo && this._client.contexts.getContext<IChatPhoto>("ChatPhoto", this._source.photo);
	/** The chat's pinned message object. */
	public pinnedMessage = this._source.pinned_message && this._client.contexts.getContext<MessageContext>("Message", this._source.pinned_message);
	/** The chat's permissions object. */
	public permissions = this._source.permissions && this._client.contexts.getContext<IChatPermissions>("ChatPermissions", this._source.permissions);
	/** The chat's location object. */
	public location = this._source.location && this._client.contexts.getContext<IChatLocation>("ChatLocation", this._source.location);

	/** An array of usernames of the chat's currently active users. */
	public get activeUsers() { return this._source.active_usernames }
	/** The custom emoji status of the chat. */
	public get customEmojiStatus() { return this._source.emoji_status_custom_emoji_id }
	/** The description or bio of the chat. */
	public get description() { return this._source.bio || this._source.description }
	/** Whether the chat has private forwards enabled. */
	public get hasPrivateForwards() { return this._source.has_private_forwards }
	/** Whether the chat has restricted voice and video messages enabled. */
	public get hasRestrictedVoiceAndVideoMessages() { return this._source.has_restricted_voice_and_video_messages }
	/** Whether users need to be invited to the chat to send messages. */
	public get joinToSendMessages() { return this._source.join_to_send_messages }
	/** Whether users can join the chat by request. */
	public get joinByRequest() { return this._source.join_by_request }
	/** The invite link of the chat. */
	public get inviteLink() { return this._source.invite_link }
	/** The delay for slow mode in the chat. */
	public get slowModeDelay() { return this._source.slow_mode_delay }
	/** The time in seconds after which messages are automatically deleted. */
	public get messageAutoDeleteTime() { return this._source.message_auto_delete_time }
	/** Whether aggressive anti-spam measures are enabled in the chat. */
	public get hasAggressiveAntiSpamEnabled() { return this._source.has_aggressive_anti_spam_enabled }
	/** Whether the chat has hidden members. */
	public get hasHiddenMembers() { return this._source.has_hidden_members }
	/** Whether the chat has protected content. */
	public get hasProtectedContent() { return this._source.has_protected_content }
	/** The name of the sticker set used in the chat. */
	public get stickerSetName() { return this._source.sticker_set_name }
	/** Whether the user can set a sticker set for the chat. */
	public get canSetStickerSet() { return this._source.can_set_sticker_set }
	/** The ID of the linked chat (for channels only). */
	public get linkedChatID() { return this._source.linked_chat_id }
}