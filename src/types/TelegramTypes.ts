/**
 * Represents the possible types of updates in the Telegram.
 */
export type TelegramUpdateType = 'message' | 'edited_message' | 'channel_post' | 'edited_channel_post' | 'business_connection' | 'business_message' | 'edited_business_message' | 'deleted_business_messages' | 'message_reaction' | 'message_reaction_count' | 'inline_query' | 'chosen_inline_result' | 'callback_query' | 'shipping_query' | 'pre_checkout_query' | 'poll' | 'poll_answer' | 'my_chat_member' | 'chat_member' | 'chat_join_request' | 'chat_boost' | 'removed_chat_boost';

/**
 * Represents the possible parse modes in Telegram.
 */
export type TelegramParseMode = 'Markdown' | 'MarkdownV2' | 'HTML';

export type EmojiKey = 'dice' | 'dart' | 'basketball' | 'soccerBall' | 'bowling' | 'slotMachine';
export const emojiMap: Record<EmojiKey, string> = {
	dice: '🎲',
	dart: '🎯',
	basketball: '🏀',
	soccerBall: '⚽',
	bowling: '🎳',
	slotMachine: '🎰',
};

/**
 * Describes various updates related to a Telegram forum topic.
 */
export type TelegramForumTopicUpdate =
	| 'forum_topic_created' // Forum topic created
	| 'forum_topic_edited' // Forum topic edited
	| 'forum_topic_closed' // Forum topic closed
	| 'forum_topic_reopened' // Forum topic reopened
	| 'general_forum_topic_hidden' // General forum topic hidden
	| 'general_forum_topic_unhidden'; // General forum topic unhidden

/**
 * Describes the types of entities that can be present in a Telegram message.
 */
export type TelegramMessageEntityType =
	| 'mention' // "@username"
	| 'hashtag' // "#hashtag"
	| 'cashtag' // "$USD"
	| 'bot_command' // "/start@jobs_bot"
	| 'url' // "https://telegram.org"
	| 'email' // "do-not-reply@telegram.org"
	| 'phone_number' // "+1-212-555-0123"
	| 'bold' // bold text
	| 'italic' // italic text
	| 'underline' // underlined text
	| 'strikethrough' // strikethrough text
	| 'spoiler' // spoiler message
	| 'blockquote' // block quotation
	| 'code' // monowidth string
	| 'pre' // monowidth block
	| 'text_link' // for clickable text URLs
	| 'text_mention' // for users without usernames
	| 'custom_emoji'; // for inline custom emoji stickers

/**
 * Represents the type of a Telegram sticker.
 */
export type TelegramStickerType = 'regular' | 'mask' | 'custom_emoji';

/**
 * Represents a point on the face relative to which a mask should be placed.
 */
export type TelegramMaskPositionPoint = 'forehead' | 'eyes' | 'mouth' | 'chin';

/**
 * Type representing the format of a sticker.
 * It can be one of "static" for a .WEBP or .PNG image,
 * "animated" for a .TGS animation, or "video" for a .WEBM video.
 */
export type TelegramStickerFormat = 'static' | 'animated' | 'video';

/**
 * Represents the possible types of chat in the Telegram.
 */
export type TelegramChatType = 'private' | 'group' | 'supergroup' | 'channel';

/**
 * Represents the type of action to broadcast in a chat.
 */
export type TelegramChatActionType = 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_voice' | 'upload_voice' | 'upload_document' | 'choose_sticker' | 'find_location' | 'record_video_note' | 'upload_video_note';

/**
 * Represents a reply markup in Telegram, which can be an inline keyboard markup,
 * a reply keyboard markup, a reply keyboard remove markup, or a force reply markup.
 */
export type TelegramReplyMarkup = TelegramInlineKeyboardMarkup | TelegramReplyKeyboardMarkup | TelegramReplyKeyboardRemove | TelegramForceReply;

/**
 * Represents a media item in Telegram, which can be an audio, document, photo, or video.
 */
export type TelegramMedia = TelegramInputMediaAudio | TelegramInputMediaDocument | TelegramInputMediaPhoto | TelegramInputMediaVideo;

/**
 * Represents an incoming update in the Telegram.
 */
export interface TelegramUpdate {
	/**
	 * The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially.
	 * This identifier is useful for managing update sequences and avoiding duplicates, especially with webhooks.
	 * If there are no new updates for at least a week, the identifier of the next update will be chosen randomly instead of sequentially.
	 */
	update_id: number;

	/**
	 * Optional. New incoming message of any kind - text, photo, sticker, etc.
	 */
	message?: TelegramMessage;

	/**
	 * Optional. New version of a message that is known to the bot and was edited.
	 * This update may be triggered by changes to message fields that are either unavailable or not actively used by your bot.
	 */
	edited_message?: TelegramMessage;

	/**
	 * Optional. New incoming channel post of any kind - text, photo, sticker, etc.
	 */
	channel_post?: TelegramMessage;

	/**
	 * Optional. New version of a channel post that is known to the bot and was edited.
	 * This update may be triggered by changes to message fields that are either unavailable or not actively used by your bot.
	 */
	edited_channel_post?: TelegramMessage;

	/**
	 * Optional. The bot was connected to or disconnected from a business account,
	 * or a user edited an existing connection with the bot.
	 */
	business_connection?: TelegramBusinessConnection;

	/**
	 * Optional. New non-service message from a connected business account.
	 */
	business_message?: TelegramMessage;

	/**
	 * Optional. New version of a message from a connected business account.
	 */
	edited_business_message?: TelegramMessage;

	/**
	 * Optional. Messages were deleted from a connected business account.
	 */
	deleted_business_messages?: TelegramBusinessMessagesDeleted;

	/**
	 * Optional. A reaction to a message was changed by a user.
	 * The bot must be an administrator in the chat and must explicitly specify "message_reaction" in the list of allowed_updates to receive these updates.
	 */
	message_reaction?: TelegramMessageReactionUpdated;

	/**
	 * Optional. Reactions to a message with anonymous reactions were changed.
	 * The bot must be an administrator in the chat and must explicitly specify "message_reaction_count" in the list of allowed_updates to receive these updates.
	 * The updates are grouped and can be sent with delay up to a few minutes.
	 */
	message_reaction_count?: TelegramMessageReactionCountUpdated;

	/**
	 * Optional. New incoming inline query.
	 */
	inline_query?: TelegramInlineQuery;

	/**
	 * Optional. The result of an inline query that was chosen by a user and sent to their chat partner.
	 */
	chosen_inline_result?: TelegramChosenInlineResult;

	/**
	 * Optional. New incoming callback query.
	 */
	callback_query?: TelegramCallbackQuery;

	/**
	 * Optional. New incoming shipping query. Only for invoices with flexible price.
	 */
	shipping_query?: TelegramShippingQuery;

	/**
	 * Optional. New incoming pre-checkout query. Contains full information about checkout.
	 */
	pre_checkout_query?: TelegramPreCheckoutQuery;

	/**
	 * Optional. New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot.
	 */
	poll?: TelegramPoll;

	/**
	 * Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself.
	 */
	poll_answer?: TelegramPollAnswer;

	/**
	 * Optional. The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user.
	 */
	my_chat_member?: TelegramChatMemberUpdated;

	/**
	 * Optional. A chat member's status was updated in a chat.
	 * The bot must be an administrator in the chat and must explicitly specify "chat_member" in the list of allowed_updates to receive these updates.
	 */
	chat_member?: TelegramChatMemberUpdated;

	/**
	 * Optional. A request to join the chat has been sent.
	 * The bot must have the can_invite_users administrator right in the chat to receive these updates.
	 */
	chat_join_request?: TelegramChatJoinRequest;

	/**
	 * Optional. A chat boost was added or changed.
	 * The bot must be an administrator in the chat to receive these updates.
	 */
	chat_boost?: TelegramChatBoostUpdated;

	/**
	 * Optional. A boost was removed from a chat.
	 * The bot must be an administrator in the chat to receive these updates.
	 */
	removed_chat_boost?: TelegramChatBoostRemoved;
}

/**
 * Represents the parameters for the getUpdates method in the Telegram.
 */
export interface TelegramGetUpdatesParams {
	/**
	 * Identifier of the first update to be returned.
	 * Must be greater by one than the highest among the identifiers of previously received updates.
	 * An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id.
	 * The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue.
	 * All previous updates will be forgotten.
	 */
	offset?: number;

	/**
	 * Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
	 */
	limit?: number;

	/**
	 * Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling.
	 * Should be positive, short polling should be used for testing purposes only.
	 */
	timeout?: number;

	/**
	 * A JSON-serialized list of the update types you want your bot to receive.
	 * For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types.
	 * Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default).
	 * If not specified, the previous setting will be used.
	 */
	allowed_updates?: TelegramUpdateType[];
}

/**
 * Interface for setting up a webhook to receive updates from Telegram.
 */
export interface TelegramSetWebhookParams {
	/**
	 * HTTPS URL to send updates to. Use an empty string to remove webhook integration.
	 */
	url: string;

	/**
	 * Upload your public key certificate so that the root certificate in use can be checked.
	 * See our self-signed guide for details.
	 */
	certificate?: TelegramInputFile;

	/**
	 * The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS.
	 */
	ip_address?: string;

	/**
	 * The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100.
	 * Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput.
	 */
	max_connections?: number;

	/**
	 * A JSON-serialized list of the update types you want your bot to receive.
	 * For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types.
	 * See Update for a complete list of available update types.
	 * Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default).
	 * If not specified, the previous setting will be used.
	 */
	allowed_updates?: string[];

	/**
	 * Pass True to drop all pending updates.
	 */
	drop_pending_updates?: boolean;

	/**
	 * A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters.
	 * Only characters A-Z, a-z, 0-9, _ and - are allowed.
	 * The header is useful to ensure that the request comes from a webhook set by you.
	 */
	secret_token?: string;
}

/**
 * Interface for deleting the webhook integration.
 */
export interface TelegramDeleteWebhookParams {
	/**
	 * Pass True to drop all pending updates.
	 */
	drop_pending_updates?: boolean;
}

/**
 * Describes the current status of a webhook.
 */
export interface TelegramWebhookInfo {
	/**
	 * Webhook URL, may be empty if webhook is not set up.
	 */
	url: string;

	/**
	 * True, if a custom certificate was provided for webhook certificate checks.
	 */
	has_custom_certificate: boolean;

	/**
	 * Number of updates awaiting delivery.
	 */
	pending_update_count: number;

	/**
	 * Currently used webhook IP address (optional).
	 */
	ip_address?: string;

	/**
	 * Unix time for the most recent error that happened when trying to deliver an update via webhook (optional).
	 */
	last_error_date?: number;

	/**
	 * Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook (optional).
	 */
	last_error_message?: string;

	/**
	 * Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters (optional).
	 */
	last_synchronization_error_date?: number;

	/**
	 * The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery (optional).
	 */
	max_connections?: number;

	/**
	 * A list of update types the bot is subscribed to. Defaults to all update types except chat_member (optional).
	 */
	allowed_updates?: TelegramUpdateType[];
}

/**
 * Represents a Telegram user or bot.
 */
export interface TelegramUser {
	/**
	 * Optional. True, if the bot has a main Web App. Returned only in getMe.
	 */
	has_main_web_app?: true;

	/**
	 * Unique identifier for this user or bot.
	 * This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	id: number;

	/**
	 * True, if this user is a bot.
	 */
	is_bot: boolean;

	/**
	 * User's or bot's first name.
	 */
	first_name: string;

	/**
	 * User's or bot's last name (optional).
	 */
	last_name?: string;

	/**
	 * User's or bot's username (optional).
	 */
	username?: string;

	/**
	 * IETF language tag of the user's language (optional).
	 */
	language_code?: string;

	/**
	 * True, if this user is a Telegram Premium user (optional).
	 */
	is_premium?: boolean;

	/**
	 * True, if this user added the bot to the attachment menu (optional).
	 */
	added_to_attachment_menu?: boolean;

	/**
	 * True, if the bot can be invited to groups. Returned only in getMe (optional).
	 */
	can_join_groups?: boolean;

	/**
	 * True, if privacy mode is disabled for the bot. Returned only in getMe (optional).
	 */
	can_read_all_group_messages?: boolean;

	/**
	 * True, if the bot supports inline queries. Returned only in getMe (optional).
	 */
	supports_inline_queries?: boolean;

	/**
	 * True, if the bot can be connected to a Telegram Business account to receive its messages. Returned only in getMe (optional).
	 */
	can_connect_to_business?: boolean;
}

/**
 * Interface representing a Telegram chat.
 */
export interface TelegramChat {
	/**
	 * Unique identifier for this chat.
	 */
	id: number;

	/**
	 * Type of chat, can be either "private", "group", "supergroup" or "channel".
	 */
	type: TelegramChatType;

	/**
	 * Title, for supergroups, channels and group chats.
	 */
	title?: string;

	/**
	 * Username, for private chats, supergroups and channels if available.
	 */
	username?: string;

	/**
	 * First name of the other party in a private chat.
	 */
	first_name?: string;

	/**
	 * Last name of the other party in a private chat.
	 */
	last_name?: string;

	/**
	 * True, if the supergroup chat is a forum (has topics enabled).
	 */
	is_forum?: boolean;
}

export interface TelegramChatFullInfo extends TelegramChat {
	/**
	 * Optional. True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats.
	 */
	can_send_paid_media?: true;

	/**
	 * Chat photo. Returned only in getChat.
	 */
	photo?: TelegramChatPhoto;

	/**
	 * If non-empty, the list of all active chat usernames; for private chats, supergroups and channels.
	 */
	active_usernames?: string[];

	/**
	 * For private chats, the date of birth of the user.
	 */
	birthdate?: Date;

	/**
	 * For private chats with business accounts, the intro of the business.
	 */
	business_intro?: TelegramBusinessIntro;

	/**
	 * For private chats with business accounts, the location of the business.
	 */
	business_location?: TelegramBusinessLocation;

	/**
	 * For private chats with business accounts, the opening hours of the business.
	 */
	business_opening_hours?: TelegramBusinessOpeningHours;

	/**
	 * For private chats, the personal channel of the user.
	 */
	personal_chat?: TelegramChat;

	/**
	 * List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed.
	 */
	available_reactions?: TelegramReactionType[];

	/**
	 * Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview.
	 */
	accent_color_id?: number;

	/**
	 * Custom emoji identifier of emoji chosen by the chat for the reply header and link preview background.
	 */
	background_custom_emoji_id?: string;

	/**
	 * Identifier of the accent color for the chat's profile background.
	 */
	profile_accent_color_id?: number;

	/**
	 * Custom emoji identifier of the emoji chosen by the chat for its profile background.
	 */
	profile_background_custom_emoji_id?: string;

	/**
	 * Custom emoji identifier of the emoji status of the chat or the other party in a private chat.
	 */
	emoji_status_custom_emoji_id?: string;

	/**
	 * Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any.
	 */
	emoji_status_expiration_date?: number;

	/**
	 * Bio of the other party in a private chat.
	 */
	bio?: string;

	/**
	 * True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user.
	 */
	has_private_forwards?: boolean;

	/**
	 * True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat.
	 */
	has_restricted_voice_and_video_messages?: boolean;

	/**
	 * True, if users need to join the supergroup before they can send messages.
	 */
	join_to_send_messages?: boolean;

	/**
	 * True, if all users directly joining the supergroup need to be approved by supergroup administrators.
	 */
	join_by_request?: boolean;

	/**
	 * Description, for groups, supergroups and channel chats.
	 */
	description?: string;

	/**
	 * Primary invite link, for groups, supergroups and channel chats.
	 */
	invite_link?: string;

	/**
	 * The most recent pinned message (by sending date).
	 */
	pinned_message?: TelegramMessage;

	/**
	 * Default chat member permissions, for groups and supergroups.
	 */
	permissions?: TelegramChatPermissions;

	/**
	 * For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user; in seconds.
	 */
	slow_mode_delay?: number;

	/**
	 * For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions.
	 */
	unrestrict_boost_count?: number;

	/**
	 * The time after which all messages sent to the chat will be automatically deleted; in seconds.
	 */
	message_auto_delete_time?: number;

	/**
	 * True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators.
	 */
	has_aggressive_anti_spam_enabled?: boolean;

	/**
	 * True, if non-administrators can only get the list of bots and administrators in the chat.
	 */
	has_hidden_members?: boolean;

	/**
	 * True, if messages from the chat can't be forwarded to other chats.
	 */
	has_protected_content?: boolean;

	/**
	 * True, if new chat members will have access to old messages; available only to chat administrators.
	 */
	has_visible_history?: boolean;

	/**
	 * For supergroups, name of group sticker set.
	 */
	sticker_set_name?: string;

	/**
	 * True, if the bot can change the group sticker set.
	 */
	can_set_sticker_set?: boolean;

	/**
	 * For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group.
	 */
	custom_emoji_sticker_set_name?: string;

	/**
	 * Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats.
	 */
	linked_chat_id?: number;

	/**
	 * For supergroups, the location to which the supergroup is connected.
	 */
	location?: TelegramChatLocation;

	/**
	 * The maximum number of reactions that can be set on a message in the chat
	 */
	max_reaction_count: number;
}

/**
 * Interface representing a Telegram message.
 */
export interface TelegramMessage {
	/**
	 * Optional. Message is a service message about a refunded payment, information about the payment.
	 */
	refunded_payment?: TelegramRefundedPayment;

	/**
	 * Optional. Message contains paid media; information about the paid media
	 */
	paid_media?: TelegramPaidMediaInfo;

	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Unique message identifier inside this chat.
	 */
	message_id: number;

	/**
	 * Unique identifier of a message thread to which the message belongs; for supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Sender of the message; empty for messages sent to channels.
	 */
	from?: TelegramUser;

	/**
	 * Sender of the message, sent on behalf of a chat.
	 */
	sender_chat?: TelegramChat;

	/**
	 * If the sender of the message boosted the chat, the number of boosts added by the user.
	 */
	sender_boost_count?: number;

	/**
	 * The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account.
	 */
	sender_business_bot?: TelegramUser;

	/**
	 * Date the message was sent in Unix time.
	 */
	date: number;

	/**
	 * Unique identifier of the business connection from which the message was received.
	 */
	business_connection_id?: string;

	/**
	 * Chat the message belongs to.
	 */
	chat: TelegramChat;

	/**
	 * Information about the original message for forwarded messages.
	 */
	forward_origin?: TelegramMessageOrigin;

	/**
	 * True, if the message is sent to a forum topic.
	 */
	is_topic_message?: boolean;

	/**
	 * True, if the message is a channel post that was automatically forwarded to the connected discussion group.
	 */
	is_automatic_forward?: boolean;

	/**
	 * For replies in the same chat and message thread, the original message.
	 */
	reply_to_message?: TelegramMessage;

	/**
	 * Information about the message that is being replied to, which may come from another chat or forum topic.
	 */
	external_reply?: TelegramExternalReplyInfo;

	/**
	 * For replies that quote part of the original message, the quoted part of the message.
	 */
	quote?: TelegramTextQuote;

	/**
	 * For replies to a story, the original story.
	 */
	reply_to_story?: TelegramStory;

	/**
	 * Bot through which the message was sent.
	 */
	via_bot?: TelegramUser;

	/**
	 * Date the message was last edited in Unix time.
	 */
	edit_date?: number;

	/**
	 * True, if the message can't be forwarded.
	 */
	has_protected_content?: boolean;

	/**
	 * True, if the message was sent by an implicit action.
	 */
	is_from_offline?: boolean;

	/**
	 * The unique identifier of a media message group this message belongs to.
	 */
	media_group_id?: string;

	/**
	 * Signature of the post author for messages in channels, or the custom title of an anonymous group administrator.
	 */
	author_signature?: string;

	/**
	 * For text messages, the actual UTF-8 text of the message.
	 */
	text?: string;

	/**
	 * Special entities like usernames, URLs, bot commands, etc. that appear in the text.
	 */
	entities?: TelegramMessageEntity[];

	/**
	 * Options used for link preview generation for the message, if it is a text message and link preview options were changed.
	 */
	link_preview_options?: TelegramLinkPreviewOptions;

	/**
	 * Optional. Unique identifier of the message effect added to the message
	 */
	effect_id?: string;

	/**
	 * Message is an animation, information about the animation.
	 */
	animation?: TelegramAnimation;

	/**
	 * Message is an audio file, information about the file.
	 */
	audio?: TelegramAudio;

	/**
	 * Message is a general file, information about the file.
	 */
	document?: TelegramDocument;

	/**
	 * Message is a photo, available sizes of the photo.
	 */
	photo?: TelegramPhotoSize[];

	/**
	 * Message is a sticker, information about the sticker.
	 */
	sticker?: TelegramSticker;

	/**
	 * Message is a forwarded story.
	 */
	story?: TelegramStory;

	/**
	 * Message is a video, information about the video.
	 */
	video?: TelegramVideo;

	/**
	 * Message is a video note, information about the video message.
	 */
	video_note?: TelegramVideoNote;

	/**
	 * Message is a voice message, information about the file.
	 */
	voice?: TelegramVoice;

	/**
	 * Caption for the animation, audio, document, photo, video or voice.
	 */
	caption?: string;

	/**
	 * Special entities like usernames, URLs, bot commands, etc. that appear in the caption.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * True, if the message media is covered by a spoiler animation.
	 */
	has_media_spoiler?: boolean;

	/**
	 * Message is a shared contact, information about the contact.
	 */
	contact?: TelegramContact;

	/**
	 * Message is a dice with random value.
	 */
	dice?: TelegramDice;

	/**
	 * Message is a game, information about the game.
	 */
	game?: TelegramGame;

	/**
	 * Message is a native poll, information about the poll.
	 */
	poll?: TelegramPoll;

	/**
	 * Message is a venue, information about the venue.
	 */
	venue?: TelegramVenue;

	/**
	 * Message is a shared location, information about the location.
	 */
	location?: TelegramLocation;

	/**
	 * New members that were added to the group or supergroup and information about them.
	 */
	new_chat_members?: TelegramUser[];

	/**
	 * A member was removed from the group, information about them.
	 */
	left_chat_member?: TelegramUser;

	/**
	 * A chat title was changed to this value.
	 */
	new_chat_title?: string;

	/**
	 * A chat photo was change to this value.
	 */
	new_chat_photo?: TelegramPhotoSize[];

	/**
	 * Service message: the chat photo was deleted.
	 */
	delete_chat_photo?: boolean;

	/**
	 * Service message: the group has been created.
	 */
	group_chat_created?: boolean;

	/**
	 * Service message: the supergroup has been created.
	 */
	supergroup_chat_created?: boolean;

	/**
	 * Service message: the channel has been created.
	 */
	channel_chat_created?: boolean;

	/**
	 * Service message: auto-delete timer settings changed in the chat.
	 */
	message_auto_delete_timer_changed?: TelegramMessageAutoDeleteTimerChanged;

	/**
	 * The group has been migrated to a supergroup with the specified identifier.
	 */
	migrate_to_chat_id?: number;

	/**
	 * The supergroup has been migrated from a group with the specified identifier.
	 */
	migrate_from_chat_id?: number;

	/**
	 * Specified message was pinned.
	 */
	pinned_message?: TelegramMaybeInaccessibleMessage;

	/**
	 * Message is an invoice for a payment, information about the invoice.
	 */
	invoice?: TelegramInvoice;

	/**
	 * Message is a service message about a successful payment, information about the payment.
	 */
	successful_payment?: TelegramSuccessfulPayment;

	/**
	 * Service message: users were shared with the bot.
	 */
	users_shared?: TelegramUsersShared;

	/**
	 * Service message: a chat was shared with the bot.
	 */
	chat_shared?: TelegramChatShared;

	/**
     * The domain name of the website on

    which the user has logged in.
    */
	connected_website?: string;

	/**
	 * Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess.
	 */
	write_access_allowed?: TelegramWriteAccessAllowed;

	/**
	 * Telegram Passport data.
	 */
	passport_data?: TelegramPassportData;

	/**
	 * Service message. A user in the chat triggered another user's proximity alert while sharing Live Location.
	 */
	proximity_alert_triggered?: TelegramProximityAlertTriggered;

	/**
	 * Service message: user boosted the chat.
	 */
	boost_added?: TelegramChatBoostAdded;

	/**
	 * Service message: forum topic created.
	 */
	forum_topic_created?: TelegramForumTopicCreated;

	/**
	 * Service message: forum topic edited.
	 */
	forum_topic_edited?: TelegramForumTopicEdited;

	/**
	 * Service message: forum topic closed.
	 */
	forum_topic_closed?: any;

	/**
	 * Service message: forum topic reopened.
	 */
	forum_topic_reopened?: any;

	/**
	 * Service message: the 'General' forum topic hidden.
	 */
	general_forum_topic_hidden?: any;

	/**
	 * Service message: the 'General' forum topic unhidden.
	 */
	general_forum_topic_unhidden?: any;

	/**
	 * Service message: a scheduled giveaway was created.
	 */
	giveaway_created?: any;

	/**
	 * The message is a scheduled giveaway message.
	 */
	giveaway?: TelegramGiveaway;

	/**
	 * A giveaway with public winners was completed.
	 */
	giveaway_winners?: TelegramGiveawayWinners;

	/**
	 * Service message: a giveaway without public winners was completed.
	 */
	giveaway_completed?: TelegramGiveawayCompleted;

	/**
	 * Service message: video chat scheduled.
	 */
	video_chat_scheduled?: TelegramVideoChatScheduled;

	/**
	 * Service message: video chat started.
	 */
	video_chat_started?: any;

	/**
	 * Service message: video chat ended.
	 */
	video_chat_ended?: TelegramVideoChatEnded;

	/**
	 * Service message: new participants invited to a video chat.
	 */
	video_chat_participants_invited?: TelegramVideoChatParticipantsInvited;

	/**
	 * Service message: data sent by a Web App.
	 */
	web_app_data?: TelegramWebAppData;

	/**
	 * Inline keyboard attached to the message.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Optional. Service message: chat background set
	 */
	chat_background_set?: TelegramChatBackground;
}

/**
 * Interface representing a Telegram message identifier.
 */
export interface TelegramMessageId {
	/**
	 * Unique message identifier.
	 */
	message_id: number;
}

/**
 * Interface representing an inaccessible message in Telegram.
 */
export interface TelegramInaccessibleMessage {
	/**
	 * Chat the message belonged to.
	 */
	chat: TelegramChat;

	/**
	 * Unique message identifier inside the chat.
	 */
	message_id: number;

	/**
	 * Always 0. The field can be used to differentiate regular and inaccessible messages.
	 */
	date: 0;
}

/**
 * Interface representing a message that may be inaccessible to the bot in Telegram.
 * It can be either a regular message or an inaccessible message.
 */
export type TelegramMaybeInaccessibleMessage = TelegramMessage | TelegramInaccessibleMessage;

/**
 * Interface representing a special entity in a text message in Telegram.
 */
export interface TelegramMessageEntity {
	/**
	 * Type of the entity.
	 * Currently, can be:
	 * - "mention" (@username)
	 * - "hashtag" (#hashtag)
	 * - "cashtag" ($USD)
	 * - "bot_command" (/start@jobs_bot)
	 * - "url" (https://telegram.org)
	 * - "email" (do-not-reply@telegram.org)
	 * - "phone_number" (+1-212-555-0123)
	 * - "bold" (bold text)
	 * - "italic" (italic text)
	 * - "underline" (underlined text)
	 * - "strikethrough" (strikethrough text)
	 * - "spoiler" (spoiler message)
	 * - "blockquote" (block quotation)
	 * - "code" (monowidth string)
	 * - "pre" (monowidth block)
	 * - "text_link" (for clickable text URLs)
	 * - "text_mention" (for users without usernames)
	 * - "custom_emoji" (for inline custom emoji stickers)
	 */
	type: TelegramMessageEntityType;

	/**
	 * Offset in UTF-16 code units to the start of the entity.
	 */
	offset: number;

	/**
	 * Length of the entity in UTF-16 code units.
	 */
	length: number;

	/**
	 * For "text_link" only, URL that will be opened after user taps on the text.
	 */
	url?: string;

	/**
	 * For "text_mention" only, the mentioned user.
	 */
	user?: TelegramUser;

	/**
	 * For "pre" only, the programming language of the entity text.
	 */
	language?: string;

	/**
	 * For "custom_emoji" only, unique identifier of the custom emoji.
	 * Use getCustomEmojiStickers to get full information about the sticker.
	 */
	custom_emoji_id?: string;
}

/**
 * Interface representing information about the quoted part of a message that is replied to by the given message.
 */
export interface TelegramTextQuote {
	/**
	 * Text of the quoted part of a message that is replied to by the given message.
	 */
	text: string;

	/**
	 * Special entities that appear in the quote.
	 * Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are kept in quotes.
	 */
	entities?: TelegramMessageEntity[];

	/**
	 * Approximate quote position in the original message in UTF-16 code units as specified by the sender.
	 */
	position: number;

	/**
	 * True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server.
	 */
	is_manual?: boolean;
}

/**
 * Interface containing information about a message that is being replied to, which may come from another chat or forum topic.
 */
export interface TelegramExternalReplyInfo {
	/**
	 * Optional. Message contains paid media; information about the paid media
	 */
	paid_media?: TelegramPaidMediaInfo;

	/**
	 * Origin of the message replied to by the given message.
	 */
	origin: TelegramMessageOrigin;

	/**
	 * Chat the original message belongs to. Available only if the chat is a supergroup or a channel.
	 */
	chat?: TelegramChat;

	/**
	 * Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel.
	 */
	message_id?: number;

	/**
	 * Options used for link preview generation for the original message, if it is a text message.
	 */
	link_preview_options?: TelegramLinkPreviewOptions;

	/**
	 * Information about the animation if the original message is an animation.
	 */
	animation?: TelegramAnimation;

	/**
	 * Information about the audio file if the original message is an audio file.
	 */
	audio?: TelegramAudio;

	/**
	 * Information about the general file if the original message is a general file.
	 */
	document?: TelegramDocument;

	/**
	 * Available sizes of the photo if the original message is a photo.
	 */
	photo?: TelegramPhotoSize[];

	/**
	 * Information about the sticker if the original message is a sticker.
	 */
	sticker?: TelegramSticker;

	/**
	 * Information about the forwarded story if the original message is a forwarded story.
	 */
	story?: TelegramStory;

	/**
	 * Information about the video if the original message is a video.
	 */
	video?: TelegramVideo;

	/**
	 * Information about the video note if the original message is a video note.
	 */
	video_note?: TelegramVideoNote;

	/**
	 * Information about the voice message if the original message is a voice message.
	 */
	voice?: TelegramVoice;

	/**
	 * True, if the message media is covered by a spoiler animation.
	 */
	has_media_spoiler?: boolean;

	/**
	 * Information about the shared contact if the original message is a shared contact.
	 */
	contact?: TelegramContact;

	/**
	 * Information about the dice if the original message is a dice with random value.
	 */
	dice?: TelegramDice;

	/**
	 * Information about the game if the original message is a game.
	 */
	game?: TelegramGame;

	/**
	 * Information about the scheduled giveaway if the original message is a scheduled giveaway.
	 */
	giveaway?: TelegramGiveaway;

	/**
	 * Information about the giveaway winners if the original message is a giveaway with public winners.
	 */
	giveaway_winners?: TelegramGiveawayWinners;

	/**
	 * Information about the invoice for a payment if the original message is an invoice.
	 */
	invoice?: TelegramInvoice;

	/**
	 * Information about the shared location if the original message is a shared location.
	 */
	location?: TelegramLocation;

	/**
	 * Information about the native poll if the original message is a native poll.
	 */
	poll?: TelegramPoll;

	/**
	 * Information about the venue if the original message is a venue.
	 */
	venue?: TelegramVenue;
}

/**
 * Interface describing reply parameters for the message that is being sent.
 */
export interface TelegramReplyParameters {
	/**
	 * Identifier of the message that will be replied to in the current chat, or in the chat chat_id if it is specified.
	 */
	message_id: number;

	/**
	 * If the message to be replied to is from a different chat, unique identifier for the chat or username of the channel (in the format \@channelusername).
	 * Not supported for messages sent on behalf of a business account.
	 */
	chat_id?: number | string;

	/**
	 * Pass True if the message should be sent even if the specified message to be replied to is not found.
	 * Always False for replies in another chat or forum topic.
	 * Always True for messages sent on behalf of a business account.
	 */
	allow_sending_without_reply?: boolean;

	/**
	 * Quoted part of the message to be replied to; 0-1024 characters after entities parsing.
	 * The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, and custom_emoji entities.
	 * The message will fail to send if the quote isn't found in the original message.
	 */
	quote?: string;

	/**
	 * Mode for parsing entities in the quote. See formatting options for more details.
	 */
	quote_parse_mode?: TelegramParseMode;

	/**
	 * A JSON-serialized list of special entities that appear in the quote. It can be specified instead of quote_parse_mode.
	 */
	quote_entities?: TelegramMessageEntity[];

	/**
	 * Position of the quote in the original message in UTF-16 code units.
	 */
	quote_position?: number;
}

/**
 * Interface describing the origin of a message in Telegram.
 * It can be one of the following types:
 * - MessageOriginUser
 * - MessageOriginHiddenUser
 * - MessageOriginChat
 * - MessageOriginChannel
 */
export type TelegramMessageOrigin = TelegramMessageOriginUser | TelegramMessageOriginHiddenUser | TelegramMessageOriginChat | TelegramMessageOriginChannel;

/**
 * Interface describing the origin of a message when it was originally sent by a known user.
 */
export interface TelegramMessageOriginUser {
	/**
	 * Type of the message origin, always "user".
	 */
	type: 'user';

	/**
	 * Date the message was sent originally in Unix time.
	 */
	date: number;

	/**
	 * User that sent the message originally.
	 */
	sender_user: TelegramUser;
}

/**
 * Interface describing the origin of a message when it was originally sent by an unknown user.
 */
export interface TelegramMessageOriginHiddenUser {
	/**
	 * Type of the message origin, always "hidden_user".
	 */
	type: 'hidden_user';

	/**
	 * Date the message was sent originally in Unix time.
	 */
	date: number;

	/**
	 * Name of the user that sent the message originally.
	 */
	sender_user_name: string;
}

/**
 * Interface describing the origin of a message when it was originally sent on behalf of a chat to a group chat.
 */
export interface TelegramMessageOriginChat {
	/**
	 * Type of the message origin, always "chat".
	 */
	type: 'chat';

	/**
	 * Date the message was sent originally in Unix time.
	 */
	date: number;

	/**
	 * Chat that sent the message originally.
	 */
	sender_chat: TelegramChat;

	/**
	 * For messages originally sent by an anonymous chat administrator, original message author signature.
	 */
	author_signature?: string;
}

/**
 * Interface describing the origin of a message when it was originally sent to a channel chat.
 */
export interface TelegramMessageOriginChannel {
	/**
	 * Type of the message origin, always "channel".
	 */
	type: 'channel';

	/**
	 * Date the message was sent originally in Unix time.
	 */
	date: number;

	/**
	 * Channel chat to which the message was originally sent.
	 */
	chat: TelegramChat;

	/**
	 * Unique message identifier inside the chat.
	 */
	message_id: number;

	/**
	 * Signature of the original post author.
	 */
	author_signature?: string;
}

/**
 * Interface describing one size of a photo or a file/sticker thumbnail.
 */
export interface TelegramPhotoSize {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Photo width.
	 */
	width: number;

	/**
	 * Photo height.
	 */
	height: number;

	/**
	 * Optional. File size in bytes.
	 */
	file_size?: number;
}

/**
 * Interface describing an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 */
export interface TelegramAnimation {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Video width as defined by sender.
	 */
	width: number;

	/**
	 * Video height as defined by sender.
	 */
	height: number;

	/**
	 * Duration of the video in seconds as defined by sender.
	 */
	duration: number;

	/**
	 * Optional. Animation thumbnail as defined by sender.
	 */
	thumbnail?: TelegramPhotoSize;

	/**
	 * Optional. Original animation filename as defined by sender.
	 */
	file_name?: string;

	/**
	 * Optional. MIME type of the file as defined by sender.
	 */
	mime_type?: string;

	/**
	 * Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
	 */
	file_size?: number;
}

/**
 * Interface describing an audio file to be treated as music by the Telegram clients.
 */
export interface TelegramAudio {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Duration of the audio in seconds as defined by sender.
	 */
	duration: number;

	/**
	 * Optional. Performer of the audio as defined by sender or by audio tags.
	 */
	performer?: string;

	/**
	 * Optional. Title of the audio as defined by sender or by audio tags.
	 */
	title?: string;

	/**
	 * Optional. Original filename as defined by sender.
	 */
	file_name?: string;

	/**
	 * Optional. MIME type of the file as defined by sender.
	 */
	mime_type?: string;

	/**
	 * Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
	 */
	file_size?: number;

	/**
	 * Optional. Thumbnail of the album cover to which the music file belongs.
	 */
	thumbnail?: TelegramPhotoSize;
}

/**
 * Interface describing a general file (as opposed to photos, voice messages and audio files).
 */
export interface TelegramDocument {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Optional. Document thumbnail as defined by sender.
	 */
	thumbnail?: TelegramPhotoSize;

	/**
	 * Optional. Original filename as defined by sender.
	 */
	file_name?: string;

	/**
	 * Optional. MIME type of the file as defined by sender.
	 */
	mime_type?: string;

	/**
	 * Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
	 */
	file_size?: number;
}

/**
 * Interface describing a story.
 */
export interface TelegramStory {
	/**
	 * Chat that posted the story.
	 */
	chat: TelegramChat;

	/**
	 * Unique identifier for the story in the chat.
	 */
	id: number;
}

/**
 * Interface describing a video file.
 */
export interface TelegramVideo {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Video width as defined by sender.
	 */
	width: number;

	/**
	 * Video height as defined by sender.
	 */
	height: number;

	/**
	 * Duration of the video in seconds as defined by sender.
	 */
	duration: number;

	/**
	 * Optional. Video thumbnail.
	 */
	thumbnail?: TelegramPhotoSize;

	/**
	 * Optional. Original filename as defined by sender.
	 */
	file_name?: string;

	/**
	 * Optional. MIME type of the file as defined by sender.
	 */
	mime_type?: string;

	/**
	 * Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
	 */
	file_size?: number;
}

/**
 * Interface describing a video message (video note).
 */
export interface TelegramVideoNote {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Video width and height (diameter of the video message) as defined by sender.
	 */
	length: number;

	/**
	 * Duration of the video in seconds as defined by sender.
	 */
	duration: number;

	/**
	 * Optional. Video thumbnail.
	 */
	thumbnail?: TelegramPhotoSize;

	/**
	 * Optional. File size in bytes.
	 */
	file_size?: number;
}

/**
 * Interface describing a voice file.
 */
export interface TelegramVoice {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;

	/**
	 * Duration of the audio in seconds as defined by sender.
	 */
	duration: number;

	/**
	 * Optional. MIME type of the file as defined by sender.
	 */
	mime_type?: string;

	/**
	 * Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have
	 * difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed
	 * 64-bit integer or double-precision float type are safe for storing this value.
	 */
	file_size?: number;
}

/**
 * Interface describing a phone contact.
 */
export interface TelegramContact {
	/**
	 * Contact's phone number.
	 */
	phone_number: string;

	/**
	 * Contact's first name.
	 */
	first_name: string;

	/**
	 * Optional. Contact's last name.
	 */
	last_name?: string;

	/**
	 * Optional. Contact's user identifier in Telegram. This number may have more than 32 significant bits
	 * and some programming languages may have difficulty/silent defects in interpreting it. But it has at most
	 * 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	user_id?: number;

	/**
	 * Optional. Additional data about the contact in the form of a vCard.
	 */
	vcard?: string;
}

/**
 * Interface describing a dice emoji.
 */
export interface TelegramDice {
	/**
	 * Emoji on which the dice throw animation is based.
	 */
	emoji: string;

	/**
	 * Value of the dice.
	 * For 🎲, 🎯, and 🎳 base emojis, valid values are 1-6.
	 * For 🏀 and ⚽ base emojis, valid values are 1-5.
	 * For 🎰 base emoji, valid values are 1-64.
	 */
	value: number;
}

/**
 * Interface describing an option in a poll.
 */
export interface TelegramPollOption {
	/**
	 * Option text, 1-100 characters.
	 */
	text: string;

	/**
	 * Number of users that voted for this option.
	 */
	voter_count: number;

	/**
	 * Optional. Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
	 */
	text_entities?: TelegramMessageEntity;
}

/**
 * Interface representing a user's answer in a non-anonymous poll.
 */
export interface TelegramPollAnswer {
	/**
	 * Unique poll identifier.
	 */
	poll_id: string;

	/**
	 * The chat that changed the answer to the poll, if the voter is anonymous.
	 */
	voter_chat?: TelegramChat;

	/**
	 * The user that changed the answer to the poll, if the voter isn't anonymous.
	 */
	user?: TelegramUser;

	/**
	 * 0-based identifiers of chosen answer options. May be empty if the vote was retracted.
	 */
	option_ids: number[];
}

/**
 * Interface representing a poll.
 */
export interface TelegramPoll {
	/**
	 * Unique poll identifier.
	 */
	id: string;

	/**
	 * Poll question, 1-300 characters.
	 */
	question: string;

	/**
	 * List of poll options.
	 */
	options: TelegramPollOption[];

	/**
	 * Total number of users that voted in the poll.
	 */
	total_voter_count: number;

	/**
	 * True, if the poll is closed.
	 */
	is_closed: boolean;

	/**
	 * True, if the poll is anonymous.
	 */
	is_anonymous: boolean;

	/**
	 * Poll type, currently can be "regular" or "quiz".
	 */
	type: string;

	/**
	 * True, if the poll allows multiple answers.
	 */
	allows_multiple_answers: boolean;

	/**
	 * 0-based identifier of the correct answer option. Available only for polls in the quiz mode,
	 * which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot.
	 */
	correct_option_id?: number;

	/**
	 * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon
	 * in a quiz-style poll, 0-200 characters.
	 */
	explanation?: string;

	/**
	 * Special entities like usernames, URLs, bot commands, etc. that appear in the explanation.
	 */
	explanation_entities?: TelegramMessageEntity[];

	/**
	 * Amount of time in seconds the poll will be active after creation.
	 */
	open_period?: number;

	/**
	 * Point in time (Unix timestamp) when the poll will be automatically closed.
	 */
	close_date?: number;

	/**
	 * Optional. Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions
	 */
	question_entities?: TelegramMessageEntity[];
}

/**
 * Interface representing a point on the map.
 */
export interface TelegramLocation {
	/**
	 * Latitude as defined by sender.
	 */
	latitude: number;

	/**
	 * Longitude as defined by sender.
	 */
	longitude: number;

	/**
	 * Optional. The radius of uncertainty for the location, measured in meters; 0-1500.
	 */
	horizontal_accuracy?: number;

	/**
	 * Optional. Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only.
	 */
	live_period?: number;

	/**
	 * Optional. The direction in which the user is moving, in degrees; 1-360. For active live locations only.
	 */
	heading?: number;

	/**
	 * Optional. The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only.
	 */
	proximity_alert_radius?: number;
}

/**
 * Interface representing a venue.
 */
export interface TelegramVenue {
	/**
	 * Venue location. Can't be a live location.
	 */
	location: TelegramLocation;

	/**
	 * Name of the venue.
	 */
	title: string;

	/**
	 * Address of the venue.
	 */
	address: string;

	/**
	 * Optional. Foursquare identifier of the venue.
	 */
	foursquare_id?: string;

	/**
	 * Optional. Foursquare type of the venue.
	 * (For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".)
	 */
	foursquare_type?: string;

	/**
	 * Optional. Google Places identifier of the venue.
	 */
	google_place_id?: string;

	/**
	 * Optional. Google Places type of the venue. (See supported types.)
	 */
	google_place_type?: string;
}

/**
 * Interface representing data sent from a Web App to the bot.
 */
export interface TelegramWebAppData {
	/**
	 * The data sent from the Web App. Be aware that a bad client can send arbitrary data in this field.
	 */
	data: string;

	/**
	 * Text of the web_app keyboard button from which the Web App was opened.
	 * Be aware that a bad client can send arbitrary data in this field.
	 */
	button_text: string;
}

/**
 * Interface representing a proximity alert triggered in the chat.
 */
export interface TelegramProximityAlertTriggered {
	/**
	 * The user who triggered the proximity alert.
	 */
	traveler: TelegramUser;

	/**
	 * The user who set the proximity alert.
	 */
	watcher: TelegramUser;

	/**
	 * The distance between the users in meters.
	 */
	distance: number;
}

/**
 * Interface representing a service message about a change in auto-delete timer settings.
 */
export interface TelegramMessageAutoDeleteTimerChanged {
	/**
	 * New auto-delete time for messages in the chat; in seconds.
	 */
	message_auto_delete_time: number;
}

/**
 * Interface representing a service message about a user boosting a chat.
 */
export interface TelegramChatBoostAdded {
	/**
	 * Number of boosts added by the user.
	 */
	boost_count: number;
}

/**
 * Interface representing a service message about a new forum topic created in the chat.
 */
export interface TelegramForumTopicCreated {
	/**
	 * Name of the topic.
	 */
	name: string;
	/**
	 * Color of the topic icon in RGB format.
	 */
	icon_color: number;
	/**
	 * Optional. Unique identifier of the custom emoji shown as the topic icon.
	 */
	icon_custom_emoji_id?: string;
}

/**
 * Interface representing a service message about an edited forum topic.
 */
export interface TelegramForumTopicEdited {
	/**
	 * Optional. New name of the topic, if it was edited.
	 */
	name?: string;
	/**
	 * Optional. New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed.
	 */
	icon_custom_emoji_id?: string;
}

/**
 * Interface representing information about a user that was shared with the bot using a KeyboardButtonRequestUser button.
 */
export interface TelegramSharedUser {
	/**
	 * Identifier of the shared user.
	 */
	user_id: number;
	/**
	 * Optional. First name of the user, if the name was requested by the bot.
	 */
	first_name?: string;
	/**
	 * Optional. Last name of the user, if the name was requested by the bot.
	 */
	last_name?: string;
	/**
	 * Optional. Username of the user, if the username was requested by the bot.
	 */
	username?: string;
	/**
	 * Optional. Available sizes of the chat photo, if the photo was requested by the bot.
	 */
	photo?: TelegramPhotoSize[];
}

/**
 * Interface representing information about the users whose identifiers were shared with the bot using a KeyboardButtonRequestUsers button.
 */
export interface TelegramUsersShared {
	/**
	 * Identifier of the request.
	 */
	request_id: number;
	/**
	 * Information about users shared with the bot.
	 */
	users: TelegramSharedUser[];
}

/**
 * Interface representing information about a chat that was shared with the bot using a KeyboardButtonRequestChat button.
 */
export interface TelegramChatShared {
	/**
	 * Identifier of the request.
	 */
	request_id: number;
	/**
	 * Identifier of the shared chat.
	 */
	chat_id: number;
	/**
	 * Optional. Title of the chat, if the title was requested by the bot.
	 */
	title?: string;
	/**
	 * Optional. Username of the chat, if the username was requested by the bot and available.
	 */
	username?: string;
	/**
	 * Optional. Available sizes of the chat photo, if the photo was requested by the bot.
	 */
	photo?: TelegramPhotoSize[];
}

/**
 * Interface representing a service message about a user allowing a bot to write messages after adding it to the attachment menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess.
 */
export interface TelegramWriteAccessAllowed {
	/**
	 * Optional. True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess.
	 */
	from_request?: boolean;
	/**
	 * Optional. Name of the Web App, if the access was granted when the Web App was launched from a link.
	 */
	web_app_name?: string;
	/**
	 * Optional. True, if the access was granted when the bot was added to the attachment or side menu.
	 */
	from_attachment_menu?: boolean;
}

/**
 * Interface representing a service message about a video chat scheduled in the chat.
 */
export interface TelegramVideoChatScheduled {
	/**
	 * Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator.
	 */
	start_date: number;
}

/**
 * Interface representing a service message about a video chat ended in the chat.
 */
export interface TelegramVideoChatEnded {
	/**
	 * Video chat duration in seconds.
	 */
	duration: number;
}

/**
 * Interface representing a service message about new members invited to a video chat.
 */
export interface TelegramVideoChatParticipantsInvited {
	/**
	 * New members that were invited to the video chat.
	 */
	users: TelegramUser[];
}

/**
 * Interface representing a message about a scheduled giveaway.
 */
export interface TelegramGiveaway {
	/**
	 * The list of chats which the user must join to participate in the giveaway.
	 */
	chats: TelegramChat[];

	/**
	 * Point in time (Unix timestamp) when winners of the giveaway will be selected.
	 */
	winners_selection_date: number;

	/**
	 * The number of users which are supposed to be selected as winners of the giveaway.
	 */
	winner_count: number;

	/**
	 * True, if only users who join the chats after the giveaway started should be eligible to win.
	 */
	only_new_members?: true;

	/**
	 * True, if the list of giveaway winners will be visible to everyone.
	 */
	has_public_winners?: true;

	/**
	 * Description of additional giveaway prize.
	 */
	prize_description?: string;

	/**
	 * A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come.
	 * If empty, then all users can participate in the giveaway.
	 * Users with a phone number that was bought on Fragment can always participate in giveaways.
	 */
	country_codes?: string[];

	/**
	 * The number of months the Telegram Premium subscription won from the giveaway will be active for.
	 */
	premium_subscription_month_count?: number;
}

/**
 * Interface representing a message about the completion of a giveaway with public winners.
 */
export interface TelegramGiveawayWinners {
	/**
	 * The chat that created the giveaway.
	 */
	chat: TelegramChat;

	/**
	 * Identifier of the message with the giveaway in the chat.
	 */
	giveaway_message_id: number;

	/**
	 * Point in time (Unix timestamp) when winners of the giveaway were selected.
	 */
	winners_selection_date: number;

	/**
	 * Total number of winners in the giveaway.
	 */
	winner_count: number;

	/**
	 * List of up to 100 winners of the giveaway.
	 */
	winners: TelegramUser[];

	/**
	 * The number of other chats the user had to join in order to be eligible for the giveaway.
	 */
	additional_chat_count?: number;

	/**
	 * The number of months the Telegram Premium subscription won from the giveaway will be active for.
	 */
	premium_subscription_month_count?: number;

	/**
	 * Number of undistributed prizes.
	 */
	unclaimed_prize_count?: number;

	/**
	 * True, if only users who had joined the chats after the giveaway started were eligible to win.
	 */
	only_new_members?: true;

	/**
	 * True, if the giveaway was canceled because the payment for it was refunded.
	 */
	was_refunded?: true;

	/**
	 * Description of additional giveaway prize.
	 */
	prize_description?: string;
}

/**
 * Interface representing a service message about the completion of a giveaway without public winners.
 */
export interface TelegramGiveawayCompleted {
	/**
	 * Number of winners in the giveaway.
	 */
	winner_count: number;

	/**
	 * Number of undistributed prizes.
	 */
	unclaimed_prize_count?: number;

	/**
	 * Message with the giveaway that was completed, if it wasn't deleted.
	 */
	giveaway_message?: TelegramMessage;
}

/**
 * Describes the options used for link preview generation.
 */
export interface TelegramLinkPreviewOptions {
	/**
	 * True, if the link preview is disabled.
	 */
	is_disabled?: boolean;

	/**
	 * URL to use for the link preview. If empty, then the first URL found in the message text will be used.
	 */
	url?: string;

	/**
	 * True, if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview.
	 */
	prefer_small_media?: boolean;

	/**
	 * True, if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview.
	 */
	prefer_large_media?: boolean;

	/**
	 * True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text.
	 */
	show_above_text?: boolean;
}

/**
 * Represents a user's profile pictures.
 */
export interface TelegramUserProfilePhotos {
	/**
	 * Total number of profile pictures the target user has.
	 */
	total_count: number;

	/**
	 * Requested profile pictures (in up to 4 sizes each).
	 */
	photos: Array<Array<TelegramPhotoSize>>;
}

/**
 * Represents a file ready to be downloaded.
 * The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>
 */
export interface TelegramFile {
	/**
	 * Identifier for this file, which can be used to download or reuse the file
	 */
	file_id: string;
	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
	 */
	file_unique_id: string;
	/**
	 * Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
	 */
	file_size?: number;
	/**
	 * Optional. File path. Use https://api.telegram.org/file/bot<token>/<file_path>
	 */
	file_path?: string;
}

/**
 * Describes a Web App.
 */
export interface TelegramWebAppInfo {
	url: string; // An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps
}

/**
 * Represents a custom keyboard with reply options.
 */
export interface TelegramReplyKeyboardMarkup {
	/**
	 * Array of button rows, each represented by an Array of KeyboardButton objects.
	 */
	keyboard: TelegramKeyboardButton[][];

	/**
	 * Optional. Requests clients to always show the keyboard when the regular keyboard is hidden.
	 * Defaults to false, in which case the custom keyboard can be hidden and opened with a keyboard icon.
	 */
	is_persistent?: boolean;

	/**
	 * Optional. Requests clients to resize the keyboard vertically for optimal fit.
	 * Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard.
	 */
	resize_keyboard?: boolean;

	/**
	 * Optional. Requests clients to hide the keyboard as soon as it's been used.
	 * Defaults to false. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat.
	 */
	one_time_keyboard?: boolean;

	/**
	 * Optional. The placeholder to be shown in the input field when the keyboard is active; 1-64 characters.
	 */
	input_field_placeholder?: string;

	/**
	 * Optional. Use this parameter if you want to show the keyboard to specific users only.
	 * Targets: 1) users that are \@mentioned in the text of the Message object;
	 * 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 */
	selective?: boolean;
}

/**
 * Represents one button of the reply keyboard.
 */
export interface TelegramKeyboardButton {
	/**
	 * Text of the button.
	 */
	text: string;

	/**
	 * Optional. If specified, pressing the button will open a list of suitable users.
	 * Identifiers of selected users will be sent to the bot in a “users_shared” service message.
	 * Available in private chats only.
	 */
	request_users?: TelegramKeyboardButtonRequestUsers;

	/**
	 * Optional. If specified, pressing the button will open a list of suitable chats.
	 * Tapping on a chat will send its identifier to the bot in a “chat_shared” service message.
	 * Available in private chats only.
	 */
	request_chat?: TelegramKeyboardButtonRequestChat;

	/**
	 * Optional. If True, the user's phone number will be sent as a contact when the button is pressed.
	 * Available in private chats only.
	 */
	request_contact?: boolean;

	/**
	 * Optional. If True, the user's current location will be sent when the button is pressed.
	 * Available in private chats only.
	 */
	request_location?: boolean;

	/**
	 * Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed.
	 * Available in private chats only.
	 */
	request_poll?: TelegramKeyboardButtonPollType;

	/**
	 * Optional. If specified, the described Web App will be launched when the button is pressed.
	 * The Web App will be able to send a “web_app_data” service message.
	 * Available in private chats only.
	 */
	web_app?: TelegramWebAppInfo;
}

/**
 * Defines the criteria used to request suitable users.
 * Information about the selected users will be shared with the bot when the corresponding button is pressed.
 */
export interface TelegramKeyboardButtonRequestUsers {
	/**
	 * Signed 32-bit identifier of the request that will be received back in the UsersShared object.
	 * Must be unique within the message.
	 */
	request_id: number;

	/**
	 * Optional. Pass True to request bots, pass False to request regular users.
	 * If not specified, no additional restrictions are applied.
	 */
	user_is_bot?: boolean;

	/**
	 * Optional. Pass True to request premium users, pass False to request non-premium users.
	 * If not specified, no additional restrictions are applied.
	 */
	user_is_premium?: boolean;

	/**
	 * Optional. The maximum number of users to be selected; 1-10. Defaults to 1.
	 */
	max_quantity?: number;

	/**
	 * Optional. Pass True to request the users' first and last name.
	 */
	request_name?: boolean;

	/**
	 * Optional. Pass True to request the users' username.
	 */
	request_username?: boolean;

	/**
	 * Optional. Pass True to request the users' photo.
	 */
	request_photo?: boolean;
}

/**
 * Defines the criteria used to request a suitable chat.
 * Information about the selected chat will be shared with the bot when the corresponding button is pressed.
 * The bot will be granted requested rights in the chat if appropriate.
 */
export interface TelegramKeyboardButtonRequestChat {
	/**
	 * Signed 32-bit identifier of the request, which will be received back in the ChatShared object.
	 * Must be unique within the message.
	 */
	request_id: number;

	/**
	 * Pass True to request a channel chat, pass False to request a group or a supergroup chat.
	 */
	chat_is_channel: boolean;

	/**
	 * Optional. Pass True to request a forum supergroup, pass False to request a non-forum chat.
	 * If not specified, no additional restrictions are applied.
	 */
	chat_is_forum?: boolean;

	/**
	 * Optional. Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username.
	 * If not specified, no additional restrictions are applied.
	 */
	chat_has_username?: boolean;

	/**
	 * Optional. Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied.
	 */
	chat_is_created?: boolean;

	/**
	 * Optional. A JSON-serialized object listing the required administrator rights of the user in the chat.
	 * The rights must be a superset of bot_administrator_rights. If not specified, no additional restrictions are applied.
	 */
	user_administrator_rights?: TelegramChatAdministratorRights;

	/**
	 * Optional. A JSON-serialized object listing the required administrator rights of the bot in the chat.
	 * The rights must be a subset of user_administrator_rights. If not specified, no additional restrictions are applied.
	 */
	bot_administrator_rights?: TelegramChatAdministratorRights;

	/**
	 * Optional. Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied.
	 */
	bot_is_member?: boolean;

	/**
	 * Optional. Pass True to request the chat's title.
	 */
	request_title?: boolean;

	/**
	 * Optional. Pass True to request the chat's username.
	 */
	request_username?: boolean;

	/**
	 * Optional. Pass True to request the chat's photo.
	 */
	request_photo?: boolean;
}

/**
 * Represents the type of a poll, which is allowed to be created and sent when the corresponding button is pressed.
 */
export interface TelegramKeyboardButtonPollType {
	/**
	 * Optional. If "quiz" is passed, the user will be allowed to create only polls in the quiz mode.
	 * If "regular" is passed, only regular polls will be allowed.
	 * Otherwise, the user will be allowed to create a poll of any type.
	 */
	type?: 'quiz' | 'regular';
}

/**
 * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard.
 * By default, custom keyboards are displayed until a new keyboard is sent by a bot.
 * An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup).
 */
export interface TelegramReplyKeyboardRemove {
	/**
	 * Requests clients to remove the custom keyboard (user will not be able to summon this keyboard).
	 * If you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup.
	 */
	remove_keyboard: true;

	/**
	 * Optional. Use this parameter if you want to remove the keyboard for specific users only.
	 * Targets: 1) users that are \@mentioned in the text of the Message object;
	 * 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 */
	selective?: boolean;
}

/**
 * Represents an inline keyboard that appears right next to the message it belongs to.
 *
 * @remarks
 * This object is used to create an inline keyboard for a Telegram bot.
 */
export interface TelegramInlineKeyboardMarkup {
	/**
	 * Array of button rows, each represented by an Array of InlineKeyboardButton objects.
	 */
	inline_keyboard: TelegramInlineKeyboardButton[][];
}

/**
 * Interface defining the parameters required to answer a web app query.
 */
export interface TelegramAnswerWebAppQueryParams {
	/** Unique identifier for the query to be answered. */
	web_app_query_id: string;
	/** A JSON-serialized object describing the message to be sent. */
	result: TelegramInlineQueryResult;
}

/**
 * Represents one button of an inline keyboard.
 */
export interface TelegramInlineKeyboardButton {
	/**
	 * Label text on the button.
	 */
	text: string;

	/**
	 * Optional. HTTP or tg:// URL to be opened when the button is pressed.
	 * Links tg://user?id=<user_id> can be used to mention a user by their identifier without using a username,
	 * if this is allowed by their privacy settings.
	 */
	url?: string;

	/**
	 * Optional. Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes.
	 */
	callback_data?: string;

	/**
	 * Optional. Description of the Web App that will be launched when the user presses the button.
	 * The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery.
	 * Available only in private chats between a user and the bot.
	 */
	web_app?: TelegramWebAppInfo;

	/**
	 * Optional. An HTTPS URL used to automatically authorize the user.
	 * Can be used as a replacement for the Telegram Login Widget.
	 */
	login_url?: TelegramLoginUrl;

	/**
	 * Optional. If set, pressing the button will prompt the user to select one of their chats,
	 * open that chat and insert the bot's username and the specified inline query in the input field.
	 * May be empty, in which case just the bot's username will be inserted.
	 */
	switch_inline_query?: string;

	/**
	 * Optional. If set, pressing the button will insert the bot's username and the specified inline query
	 * in the current chat's input field.
	 * May be empty, in which case only the bot's username will be inserted.
	 */
	switch_inline_query_current_chat?: string;

	/**
	 * Optional. If set, pressing the button will prompt the user to select one of their chats of the specified type,
	 * open that chat and insert the bot's username and the specified inline query in the input field.
	 */
	switch_inline_query_chosen_chat?: TelegramSwitchInlineQueryChosenChat;

	/**
	 * Optional. Description of the game that will be launched when the user presses the button.
	 */
	callback_game?: any;

	/**
	 * Optional. Specify True, to send a Pay button.
	 * NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages.
	 */
	pay?: boolean;
}

/**
 * Represents a parameter of the inline keyboard button used to automatically authorize a user.
 * Serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram.
 * All the user needs to do is tap/click a button and confirm that they want to log in.
 *
 * TITLE: Telegram apps support these buttons as of version 5.7.
 *
 * Sample bot: \@discussbot
 */
export interface TelegramLoginUrl {
	/**
	 * An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed.
	 * If the user refuses to provide authorization data, the original URL without information about the user will be opened.
	 * The data added is the same as described in Receiving authorization data.
	 *
	 * NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization.
	 */
	url: string;

	/**
	 * Optional. New text of the button in forwarded messages.
	 */
	forward_text?: string;

	/**
	 * Optional. Username of a bot, which will be used for user authorization.
	 * See Setting up a bot for more details.
	 * If not specified, the current bot's username will be assumed.
	 * The url's domain must be the same as the domain linked with the bot.
	 * See Linking your domain to the bot for more details.
	 */
	bot_username?: string;

	/**
	 * Optional. Pass True to request the permission for your bot to send messages to the user.
	 */
	request_write_access?: boolean;
}

/**
 * Represents an inline button that switches the current user to inline mode in a chosen chat,
 * with an optional default inline query.
 */
export interface TelegramSwitchInlineQueryChosenChat {
	/**
	 * Optional. The default inline query to be inserted in the input field.
	 * If left empty, only the bot's username will be inserted.
	 */
	query?: string;

	/**
	 * Optional. True, if private chats with users can be chosen.
	 */
	allow_user_chats?: boolean;

	/**
	 * Optional. True, if private chats with bots can be chosen.
	 */
	allow_bot_chats?: boolean;

	/**
	 * Optional. True, if group and supergroup chats can be chosen.
	 */
	allow_group_chats?: boolean;

	/**
	 * Optional. True, if channel chats can be chosen.
	 */
	allow_channel_chats?: boolean;
}

/**
 * Represents an incoming callback query from a callback button in an inline keyboard.
 * If the button that originated the query was attached to a message sent by the bot, the field message will be present.
 * If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present.
 * Exactly one of the fields data or game_short_name will be present.
 *
 * NOTE: After the user presses a callback button, Telegram clients will display a progress bar until you call answerCallbackQuery.
 * It is, therefore, necessary to react by calling answerCallbackQuery even if no notification to the user is needed
 * (e.g., without specifying any of the optional parameters).
 */
export interface TelegramCallbackQuery {
	/**
	 * Unique identifier for this query.
	 */
	id: string;

	/**
	 * Sender.
	 */
	from: TelegramUser;

	/**
	 * Optional. Message sent by the bot with the callback button that originated the query.
	 */
	message?: TelegramMaybeInaccessibleMessage;

	/**
	 * Optional. Identifier of the message sent via the bot in inline mode, that originated the query.
	 */
	inline_message_id?: string;

	/**
	 * Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent.
	 * Useful for high scores in games.
	 */
	chat_instance: string;

	/**
	 * Optional. Data associated with the callback button.
	 * Be aware that the message originated the query can contain no callback buttons with this data.
	 */
	data?: string;

	/**
	 * Optional. Short name of a Game to be returned, serves as the unique identifier for the game.
	 */
	game_short_name?: string;
}

/**
 * Upon receiving a message with this object, Telegram clients will display a reply interface to the user
 * (act as if the user has selected the bot's message and tapped 'Reply').
 * This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.
 *
 *
 * Example:
 * A poll bot for groups runs in privacy mode (only receives commands, replies to its messages and mentions).
 * There could be two ways to create a new poll:
 *
 * 1. Explain the user how to send a command with parameters (e.g. /newpoll question answer1 answer2).
 *    May be appealing for hardcore users but lacks modern day polish.
 * 2. Guide the user through a step-by-step process.
 *    'Please send me your question', 'Cool, now let's add the first answer option',
 *    'Great. Keep adding answer options, then send /done when you're ready'.
 *    The last option is definitely more attractive. And if you use ForceReply in your bot's questions,
 *    it will receive the user's answers even if it only receives replies, commands and mentions - without any extra work for the user.
 */
export interface TelegramForceReply {
	/**
	 * Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply'.
	 */
	force_reply: true;

	/**
	 * Optional. The placeholder to be shown in the input field when the reply is active; 1-64 characters.
	 */
	input_field_placeholder?: string;

	/**
	 * Optional. Use this parameter if you want to force reply from specific users only.
	 * Targets:
	 * 1) users that are \@mentioned in the text of the Message object;
	 * 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 */
	selective?: boolean;
}

/**
 * Represents a chat photo.
 */
export interface TelegramChatPhoto {
	/**
	 * File identifier of small (160x160) chat photo.
	 * This file_id can be used only for photo download and only for as long as the photo is not changed.
	 */
	small_file_id: string;

	/**
	 * Unique file identifier of small (160x160) chat photo,
	 * which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	small_file_unique_id: string;

	/**
	 * File identifier of big (640x640) chat photo.
	 * This file_id can be used only for photo download and only for as long as the photo is not changed.
	 */
	big_file_id: string;

	/**
	 * Unique file identifier of big (640x640) chat photo,
	 * which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	big_file_unique_id: string;
}

/**
 * Represents an invite link for a chat.
 */
export interface TelegramChatInviteLink {
	/**
	 * The invite link. If the link was created by another chat administrator,
	 * then the second part of the link will be replaced with “…”.
	 */
	invite_link: string;

	/**
	 * Creator of the link.
	 */
	creator: TelegramUser;

	/**
	 * True, if users joining the chat via the link need to be approved by chat administrators.
	 */
	creates_join_request: boolean;

	/**
	 * True, if the link is primary.
	 */
	is_primary: boolean;

	/**
	 * True, if the link is revoked.
	 */
	is_revoked: boolean;

	/**
	 * Optional. Invite link name.
	 */
	name?: string;

	/**
	 * Optional. Point in time (Unix timestamp) when the link will expire or has been expired.
	 */
	expire_date?: number;

	/**
	 * Optional. The maximum number of users that can be members of the chat simultaneously after joining
	 * the chat via this invite link; 1-99999.
	 */
	member_limit?: number;

	/**
	 * Optional. Number of pending join requests created using this link.
	 */
	pending_join_request_count?: number;
}

/**
 * Represents the rights of an administrator in a chat.
 */
export interface TelegramChatAdministratorRights {
	/**
	 * True, if the user's presence in the chat is hidden.
	 */
	is_anonymous: boolean;

	/**
	 * True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members,
	 * report spam messages and ignore slow mode. Implied by any other administrator privilege.
	 */
	can_manage_chat: boolean;

	/**
	 * True, if the administrator can delete messages of other users.
	 */
	can_delete_messages: boolean;

	/**
	 * True, if the administrator can manage video chats.
	 */
	can_manage_video_chats: boolean;

	/**
	 * True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics.
	 */
	can_restrict_members: boolean;

	/**
	 * True, if the administrator can add new administrators with a subset of their own privileges or
	 * demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user).
	 */
	can_promote_members: boolean;

	/**
	 * True, if the user is allowed to change the chat title, photo and other settings.
	 */
	can_change_info: boolean;

	/**
	 * True, if the user is allowed to invite new users to the chat.
	 */
	can_invite_users: boolean;

	/**
	 * True, if the administrator can post stories to the chat.
	 */
	can_post_stories: boolean;

	/**
	 * True, if the administrator can edit stories posted by other users.
	 */
	can_edit_stories: boolean;

	/**
	 * True, if the administrator can delete stories posted by other users.
	 */
	can_delete_stories: boolean;

	/**
	 * Optional. True, if the administrator can post messages in the channel, or access channel statistics; for channels only.
	 */
	can_post_messages?: boolean;

	/**
	 * Optional. True, if the administrator can edit messages of other users and can pin messages; for channels only.
	 */
	can_edit_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to pin messages; for groups and supergroups only.
	 */
	can_pin_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only.
	 */
	can_manage_topics?: boolean;
}

/**
 * Represents changes in the status of a chat member.
 */
export interface TelegramChatMemberUpdated {
	/**
	 * Chat the user belongs to.
	 */
	chat: TelegramChat;

	/**
	 * Performer of the action, which resulted in the change.
	 */
	from: TelegramUser;

	/**
	 * Date the change was done in Unix time.
	 */
	date: number;

	/**
	 * Previous information about the chat member.
	 */
	old_chat_member: TelegramChatMember;

	/**
	 * New information about the chat member.
	 */
	new_chat_member: TelegramChatMember;

	/**
	 * Optional. Chat invite link, which was used by the user to join the chat; for joining by invite link events only.
	 */
	invite_link?: TelegramChatInviteLink;

	/**
	 * Optional. True, if the user joined the chat via a chat folder invite link.
	 */
	via_chat_folder_invite_link?: boolean;

	/**
	 * Optional. True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator
	 */
	via_join_request?: boolean;
}

/**
 * This object contains information about one member of a chat.
 * Currently, the following 6 types of chat members are supported:
 * - ChatMemberOwner
 * - ChatMemberAdministrator
 * - ChatMemberMember
 * - ChatMemberRestricted
 * - ChatMemberLeft
 * - ChatMemberBanned
 */
export type TelegramChatMember = TelegramChatMemberOwner | TelegramChatMemberAdministrator | TelegramChatMemberMember | TelegramChatMemberRestricted | TelegramChatMemberLeft | TelegramChatMemberBanned;

/**
 * Represents a chat member that owns the chat and has all administrator privileges.
 */
export interface TelegramChatMemberOwner {
	/**
	 * The member's status in the chat, always “creator”.
	 */
	status: string;

	/**
	 * Information about the user.
	 */
	user: TelegramUser;

	/**
	 * True, if the user's presence in the chat is hidden.
	 */
	is_anonymous: boolean;

	/**
	 * Optional. Custom title for this user.
	 */
	custom_title?: string;
}

/**
 * Represents a chat member that has some additional privileges.
 */
export interface TelegramChatMemberAdministrator {
	/**
	 * The member's status in the chat, always “administrator”.
	 */
	status: string;

	/**
	 * Information about the user.
	 */
	user: TelegramUser;

	/**
	 * True, if the bot is allowed to edit administrator privileges of that user.
	 */
	can_be_edited: boolean;

	/**
	 * True, if the user's presence in the chat is hidden.
	 */
	is_anonymous: boolean;

	/**
	 * True, if the administrator can access the chat event log, get boost list,
	 * see hidden supergroup and channel members, report spam messages and ignore slow mode.
	 * Implied by any other administrator privilege.
	 */
	can_manage_chat: boolean;

	/**
	 * True, if the administrator can delete messages of other users.
	 */
	can_delete_messages: boolean;

	/**
	 * True, if the administrator can manage video chats.
	 */
	can_manage_video_chats: boolean;

	/**
	 * True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics.
	 */
	can_restrict_members: boolean;

	/**
	 * True, if the administrator can add new administrators with a subset of their own privileges
	 * or demote administrators that they have promoted, directly or indirectly
	 * (promoted by administrators that were appointed by the user).
	 */
	can_promote_members: boolean;

	/**
	 * True, if the user is allowed to change the chat title, photo and other settings.
	 */
	can_change_info: boolean;

	/**
	 * True, if the user is allowed to invite new users to the chat.
	 */
	can_invite_users: boolean;

	/**
	 * True, if the administrator can post stories to the chat.
	 */
	can_post_stories: boolean;

	/**
	 * True, if the administrator can edit stories posted by other users.
	 */
	can_edit_stories: boolean;

	/**
	 * True, if the administrator can delete stories posted by other users.
	 */
	can_delete_stories: boolean;

	/**
	 * Optional. True, if the administrator can post messages in the channel, or access channel statistics; for channels only.
	 */
	can_post_messages?: boolean;

	/**
	 * Optional. True, if the administrator can edit messages of other users and can pin messages; for channels only.
	 */
	can_edit_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to pin messages; for groups and supergroups only.
	 */
	can_pin_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only.
	 */
	can_manage_topics?: boolean;

	/**
	 * Optional. Custom title for this user.
	 */
	custom_title?: string;
}

/**
 * Represents a chat member that has no additional privileges or restrictions.
 */
export interface TelegramChatMemberMember {
	/**
	 * The member's status in the chat, always “member”.
	 */
	status: string;

	/**
	 * Information about the user.
	 */
	user: TelegramUser;
}

/**
 * Represents a chat member that is under certain restrictions in the chat. Supergroups only.
 */
export interface TelegramChatMemberRestricted {
	/**
	 * The member's status in the chat, always “restricted”.
	 */
	status: string;

	/**
	 * Information about the user.
	 */
	user: TelegramUser;

	/**
	 * True, if the user is a member of the chat at the moment of the request.
	 */
	is_member: boolean;

	/**
	 * True, if the user is allowed to send text messages, contacts, giveaways, giveaway winners, invoices, locations and venues.
	 */
	can_send_messages: boolean;

	/**
	 * True, if the user is allowed to send audios.
	 */
	can_send_audios: boolean;

	/**
	 * True, if the user is allowed to send documents.
	 */
	can_send_documents: boolean;

	/**
	 * True, if the user is allowed to send photos.
	 */
	can_send_photos: boolean;

	/**
	 * True, if the user is allowed to send videos.
	 */
	can_send_videos: boolean;

	/**
	 * True, if the user is allowed to send video notes.
	 */
	can_send_video_notes: boolean;

	/**
	 * True, if the user is allowed to send voice notes.
	 */
	can_send_voice_notes: boolean;

	/**
	 * True, if the user is allowed to send polls.
	 */
	can_send_polls: boolean;

	/**
	 * True, if the user is allowed to send animations, games, stickers and use inline bots.
	 */
	can_send_other_messages: boolean;

	/**
	 * True, if the user is allowed to add web page previews to their messages.
	 */
	can_add_web_page_previews: boolean;

	/**
	 * True, if the user is allowed to change the chat title, photo and other settings.
	 */
	can_change_info: boolean;

	/**
	 * True, if the user is allowed to invite new users to the chat.
	 */
	can_invite_users: boolean;

	/**
	 * True, if the user is allowed to pin messages.
	 */
	can_pin_messages: boolean;

	/**
	 * True, if the user is allowed to create forum topics.
	 */
	can_manage_topics: boolean;

	/**
	 * Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever.
	 */
	until_date: number;
}

/**
 * Represents a chat member that isn't currently a member of the chat, but may join it themselves.
 */
export interface TelegramChatMemberLeft {
	/**
	 * The member's status in the chat, always “left”.
	 */
	status: string;

	/**
	 * Information about the user.
	 */
	user: TelegramUser;
}

/**
 * Represents a chat member that was banned in the chat and can't return to the chat or view chat messages.
 */
export interface TelegramChatMemberBanned {
	/**
	 * The member's status in the chat, always “kicked”.
	 */
	status: string;

	/**
	 * Information about the user.
	 */
	user: TelegramUser;

	/**
	 * Date when restrictions will be lifted for this user; Unix time. If 0, then the user is banned forever.
	 */
	until_date: number;
}

/**
 * Represents a join request sent to a chat.
 */
export interface TelegramChatJoinRequest {
	/**
	 * Chat to which the request was sent.
	 */
	chat: TelegramChat;

	/**
	 * User that sent the join request.
	 */
	from: TelegramUser;

	/**
	 * Identifier of a private chat with the user who sent the join request.
	 * This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
	 * The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user.
	 */
	user_chat_id: number;

	/**
	 * Date the request was sent in Unix time.
	 */
	date: number;

	/**
	 * Optional. Bio of the user.
	 */
	bio?: string;

	/**
	 * Optional. Chat invite link that was used by the user to send the join request.
	 */
	invite_link?: TelegramChatInviteLink;
}

/**
 * Describes actions that a non-administrator user is allowed to take in a chat.
 */
export interface TelegramChatPermissions {
	/**
	 * Optional. True, if the user is allowed to send text messages, contacts, giveaways, giveaway winners, invoices, locations and venues.
	 */
	can_send_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to send audios.
	 */
	can_send_audios?: boolean;

	/**
	 * Optional. True, if the user is allowed to send documents.
	 */
	can_send_documents?: boolean;

	/**
	 * Optional. True, if the user is allowed to send photos.
	 */
	can_send_photos?: boolean;

	/**
	 * Optional. True, if the user is allowed to send videos.
	 */
	can_send_videos?: boolean;

	/**
	 * Optional. True, if the user is allowed to send video notes.
	 */
	can_send_video_notes?: boolean;

	/**
	 * Optional. True, if the user is allowed to send voice notes.
	 */
	can_send_voice_notes?: boolean;

	/**
	 * Optional. True, if the user is allowed to send polls.
	 */
	can_send_polls?: boolean;

	/**
	 * Optional. True, if the user is allowed to send animations, games, stickers and use inline bots.
	 */
	can_send_other_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to add web page previews to their messages.
	 */
	can_add_web_page_previews?: boolean;

	/**
	 * Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups.
	 */
	can_change_info?: boolean;

	/**
	 * Optional. True, if the user is allowed to invite new users to the chat.
	 */
	can_invite_users?: boolean;

	/**
	 * Optional. True, if the user is allowed to pin messages. Ignored in public supergroups.
	 */
	can_pin_messages?: boolean;

	/**
	 * Optional. True, if the user is allowed to create forum topics. If omitted defaults to the value of can_pin_messages.
	 */
	can_manage_topics?: boolean;
}

/**
 * Represents a user's birthdate.
 */
export interface TelegramBirthdate {
	/**
	 * Day of the user's birth; 1-31.
	 */
	day: number;

	/**
	 * Month of the user's birth; 1-12.
	 */
	month: number;

	/**
	 * Optional. Year of the user's birth.
	 */
	year?: number;
}

/**
 * Represents a business introduction.
 */
export interface TelegramBusinessIntro {
	/**
	 * Optional. Title text of the business intro.
	 */
	title?: string;

	/**
	 * Optional. Message text of the business intro.
	 */
	message?: string;

	/**
	 * Optional. Sticker of the business intro.
	 */
	sticker?: TelegramSticker;
}

/**
 * Represents the location of a business.
 */
export interface TelegramBusinessLocation {
	/**
	 * Address of the business.
	 */
	address: string;

	/**
	 * Optional. Location of the business.
	 */
	location?: TelegramLocation;
}

/**
 * Represents an interval during which a business is open.
 */
export interface TelegramBusinessOpeningHoursInterval {
	/**
	 * The minute's sequence number in a week, starting on Monday, marking the start of the time interval during which the business is open; 0 - 7 * 24 * 60.
	 */
	opening_minute: number;

	/**
	 * The minute's sequence number in a week, starting on Monday, marking the end of the time interval during which the business is open; 0 - 8 * 24 * 60.
	 */
	closing_minute: number;
}

/**
 * Represents the opening hours of a business.
 */
export interface TelegramBusinessOpeningHours {
	/**
	 * Unique name of the time zone for which the opening hours are defined.
	 */
	time_zone_name: string;

	/**
	 * List of time intervals describing business opening hours.
	 */
	opening_hours: TelegramBusinessOpeningHoursInterval[];
}

/**
 * Represents a location to which a chat is connected.
 */
export interface TelegramChatLocation {
	/**
	 * The location to which the supergroup is connected. Can't be a live location.
	 */
	location: TelegramLocation;

	/**
	 * Location address; 1-64 characters, as defined by the chat owner.
	 */
	address: string;
}

/**
 * Describes the type of a reaction.
 */
export type TelegramReactionType = TelegramReactionTypeEmoji | TelegramReactionTypeCustomEmoji;

/**
 * The reaction is based on an emoji.
 */
export interface TelegramReactionTypeEmoji {
	/**
	 * Type of the reaction, always “emoji”.
	 */
	type: 'emoji';

	/**
	 * Reaction emoji. Currently, it can be one of:
	 * "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡".
	 */
	emoji: string;
}

/**
 * The reaction is based on a custom emoji.
 */
export interface TelegramReactionTypeCustomEmoji {
	/**
	 * Type of the reaction, always “custom_emoji”.
	 */
	type: 'custom_emoji';

	/**
	 * Custom emoji identifier.
	 */
	custom_emoji_id: string;
}

/**
 * Represents a reaction added to a message along with the number of times it was added.
 */
export interface TelegramReactionCount {
	/**
	 * Type of the reaction.
	 */
	type: TelegramReactionType;

	/**
	 * Number of times the reaction was added.
	 */
	total_count: number;
}

/**
 * Represents a change of a reaction on a message performed by a user.
 */
export interface TelegramMessageReactionUpdated {
	/**
	 * The chat containing the message the user reacted to.
	 */
	chat: TelegramChat;

	/**
	 * Unique identifier of the message inside the chat.
	 */
	message_id: number;

	/**
	 * Optional. The user that changed the reaction, if the user isn't anonymous.
	 */
	user?: TelegramUser;

	/**
	 * Optional. The chat on behalf of which the reaction was changed, if the user is anonymous.
	 */
	actor_chat?: TelegramChat;

	/**
	 * Date of the change in Unix time.
	 */
	date: number;

	/**
	 * Previous list of reaction types that were set by the user.
	 */
	old_reaction: TelegramReactionType[];

	/**
	 * New list of reaction types that have been set by the user.
	 */
	new_reaction: TelegramReactionType[];
}

/**
 * Represents reaction changes on a message with anonymous reactions.
 */
export interface TelegramMessageReactionCountUpdated {
	/**
	 * The chat containing the message.
	 */
	chat: TelegramChat;

	/**
	 * Unique message identifier inside the chat.
	 */
	message_id: number;

	/**
	 * Date of the change in Unix time.
	 */
	date: number;

	/**
	 * List of reactions that are present on the message.
	 */
	reactions: TelegramReactionCount[];
}

/**
 * Represents a forum topic.
 */
export interface TelegramForumTopic {
	/**
	 * Unique identifier of the forum topic.
	 */
	message_thread_id: number;

	/**
	 * Name of the topic.
	 */
	name: string;

	/**
	 * Color of the topic icon in RGB format.
	 */
	icon_color: number;

	/**
	 * Optional. Unique identifier of the custom emoji shown as the topic icon.
	 */
	icon_custom_emoji_id?: string;
}

/**
 * Represents a bot command.
 */
export interface TelegramBotCommand {
	/**
	 * Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores.
	 */
	command: string;

	/**
	 * Description of the command; 1-256 characters.
	 */
	description: string;
}

/**
 * Represents the scope to which bot commands are applied.
 * Currently, the following 7 scopes are supported:
 * - BotCommandScopeDefault
 * - BotCommandScopeAllPrivateChats
 * - BotCommandScopeAllGroupChats
 * - BotCommandScopeAllChatAdministrators
 * - BotCommandScopeChat
 * - BotCommandScopeChatAdministrators
 * - BotCommandScopeChatMember
 */
export type TelegramBotCommandScope = TelegramBotCommandScopeDefault | TelegramBotCommandScopeAllPrivateChats | TelegramBotCommandScopeAllGroupChats | TelegramBotCommandScopeAllChatAdministrators | TelegramBotCommandScopeChat | TelegramBotCommandScopeChatAdministrators | TelegramBotCommandScopeChatMember;

/**
 * Determines the list of commands for a particular user viewing the bot menu.
 * The first list of commands which is set is returned.
 */
export type TelegramCommandScopeList = 'botCommandScopeChatLanguage' | 'botCommandScopeChat' | 'botCommandScopeAllPrivateChatsLanguage' | 'botCommandScopeAllPrivateChats' | 'botCommandScopeDefaultLanguage' | 'botCommandScopeDefault' | 'botCommandScopeChatMemberLanguage' | 'botCommandScopeChatMember' | 'botCommandScopeChatAdministratorsLanguage' | 'botCommandScopeChatAdministrators' | 'botCommandScopeChatLanguage' | 'botCommandScopeChat' | 'botCommandScopeAllChatAdministratorsLanguage' | 'botCommandScopeAllChatAdministrators' | 'botCommandScopeAllGroupChatsLanguage' | 'botCommandScopeAllGroupChats' | 'botCommandScopeDefaultLanguage' | 'botCommandScopeDefault';

/**
 * Represents the default scope of bot commands.
 * Default commands are used if no commands with a narrower scope are specified for the user.
 */
export interface TelegramBotCommandScopeDefault {
	/**
	 * Scope type, must be default.
	 */
	type: 'default';
}

/**
 * Represents the scope of bot commands, covering all private chats.
 */
export interface TelegramBotCommandScopeAllPrivateChats {
	/**
	 * Scope type, must be all_private_chats.
	 */
	type: 'all_private_chats';
}

/**
 * Represents the scope of bot commands, covering all group and supergroup chats.
 */
export interface TelegramBotCommandScopeAllGroupChats {
	/**
	 * Scope type, must be all_group_chats.
	 */
	type: 'all_group_chats';
}

/**
 * Represents the scope of bot commands, covering all group and supergroup chat administrators.
 */
export interface TelegramBotCommandScopeAllChatAdministrators {
	/**
	 * Scope type, must be all_chat_administrators.
	 */
	type: 'all_chat_administrators';
}

/**
 * Represents the scope of bot commands, covering a specific chat.
 */
export interface TelegramBotCommandScopeChat {
	/**
	 * Scope type, must be chat.
	 */
	type: 'chat';
	/**
	 * Unique identifier for the target chat or username of the target supergroup
	 * (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat.
 */
export interface TelegramBotCommandScopeChatAdministrators {
	/**
	 * Scope type, must be chat_administrators.
	 */
	type: 'chat_administrators';
	/**
	 * Unique identifier for the target chat or username of the target supergroup
	 * (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents the scope of bot commands, covering a specific member of a group or supergroup chat.
 */
export interface TelegramBotCommandScopeChatMember {
	/**
	 * Scope type, must be chat_member.
	 */
	type: 'chat_member';
	/**
	 * Unique identifier for the target chat or username of the target supergroup
	 * (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;
}

/**
 * Represents the bot's name.
 */
export interface TelegramBotName {
	/**
	 * The bot's name.
	 */
	name: string;
}

/**
 * Represents the bot's description.
 */
export interface TelegramBotDescription {
	/**
	 * The bot's description.
	 */
	description: string;
}

/**
 * Represents the bot's short description.
 */
export interface TelegramBotShortDescription {
	/**
	 * The bot's short description.
	 */
	short_description: string;
}

/**
 * Union type representing all possible types of menu buttons.
 */
export type TelegramMenuButton = TelegramMenuButtonCommands | TelegramMenuButtonWebApp | TelegramMenuButtonDefault;

/**
 * Represents a menu button, which opens the bot's list of commands.
 */
export interface TelegramMenuButtonCommands {
	/**
	 * Type of the button, must be commands.
	 */
	type: 'commands';
}

/**
 * Represents a menu button, which launches a Web App.
 */
export interface TelegramMenuButtonWebApp {
	/**
	 * Type of the button, must be web_app.
	 */
	type: 'web_app';
	/**
	 * Text on the button.
	 */
	text: string;
	/**
	 * Description of the Web App that will be launched when the user presses the button.
	 * The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery.
	 */
	web_app: TelegramWebAppInfo;
}

/**
 * Describes that no specific value for the menu button was set.
 */
export interface TelegramMenuButtonDefault {
	/**
	 * Type of the button, must be default.
	 */
	type: 'default';
}

/**
 * The source of a chat boost
 */
export type TelegramChatBoostSource = TelegramChatBoostSourcePremium | TelegramChatBoostSourceGiftCode | TelegramChatBoostSourceGiveaway;

/**
 * Interface representing a Telegram boost obtained through Telegram Premium subscription.
 */
export interface TelegramChatBoostSourcePremium {
	/**
	 * Source of the boost, always "premium".
	 */
	source: 'premium';
	/**
	 * User that boosted the chat.
	 */
	user: TelegramUser;
}

/**
 * Interface representing a Telegram boost obtained through a Telegram Premium gift code.
 */
export interface TelegramChatBoostSourceGiftCode {
	/**
	 * Source of the boost, always "gift_code".
	 */
	source: 'gift_code';
	/**
	 * User for which the gift code was created.
	 */
	user: TelegramUser;
}

/**
 * Interface representing a Telegram boost obtained through a Telegram Premium giveaway.
 */
export interface TelegramChatBoostSourceGiveaway {
	/**
	 * Source of the boost, always "giveaway".
	 */
	source: 'giveaway';
	/**
	 * Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet.
	 */
	giveaway_message_id: number;
	/**
	 * Optional. User that won the prize in the giveaway if any.
	 */
	user?: TelegramUser;
	/**
	 * Optional. True, if the giveaway was completed, but there was no user to win the prize.
	 */
	is_unclaimed?: boolean;
}

/**
 * Interface representing information about a chat boost.
 */
export interface TelegramChatBoost {
	/**
	 * Unique identifier of the boost.
	 */
	boost_id: string;
	/**
	 * Point in time (Unix timestamp) when the chat was boosted.
	 */
	add_date: number;
	/**
	 * Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged.
	 */
	expiration_date: number;
	/**
	 * Source of the added boost.
	 */
	source: TelegramChatBoostSource;
}

/**
 * Interface representing a boost added to a chat or changed.
 */
export interface TelegramChatBoostUpdated {
	/**
	 * Chat which was boosted.
	 */
	chat: TelegramChat;
	/**
	 * Information about the chat boost.
	 */
	boost: TelegramChatBoost;
}

/**
 * Interface representing a boost removed from a chat.
 */
export interface TelegramChatBoostRemoved {
	/**
	 * Chat which was boosted.
	 */
	chat: TelegramChat;
	/**
	 * Unique identifier of the boost.
	 */
	boost_id: string;
	/**
	 * Point in time (Unix timestamp) when the boost was removed.
	 */
	remove_date: number;
	/**
	 * Source of the removed boost.
	 */
	source: TelegramChatBoostSource;
}

/**
 * Represents a list of boosts added to a chat by a user.
 */
export interface TelegramUserChatBoosts {
	/**
	 * The list of boosts added to the chat by the user.
	 */
	boosts: TelegramChatBoost[];
}

/**
 * Describes the connection of the bot with a business account.
 */
export interface TelegramBusinessConnection {
	/**
	 * Unique identifier of the business connection.
	 */
	id: string;

	/**
	 * Business account user that created the business connection.
	 */
	user: TelegramUser;

	/**
	 * Identifier of a private chat with the user who created the business connection.
	 * This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	user_chat_id: number;

	/**
	 * Date the connection was established in Unix time.
	 */
	date: number;

	/**
	 * Indicates whether the bot can act on behalf of the business account in chats that were active in the last 24 hours.
	 */
	can_reply: boolean;

	/**
	 * Indicates whether the connection is active.
	 */
	is_enabled: boolean;
}

/**
 * This object is received when messages are deleted from a connected business account.
 */
export interface TelegramBusinessMessagesDeleted {
	/**
	 * Unique identifier of the business connection.
	 */
	business_connection_id: string;

	/**
	 * Information about a chat in the business account.
	 * The bot may not have access to the chat or the corresponding user.
	 */
	chat: TelegramChat;

	/**
	 * A JSON-serialized list of identifiers of deleted messages in the chat of the business account.
	 */
	message_ids: number[];
}

/**
 * Describes why a request was unsuccessful.
 */
export interface TelegramResponseParameters {
	/**
	 * Optional. The group has been migrated to a supergroup with the specified identifier.
	 * This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it.
	 * But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	migrate_to_chat_id?: number;

	/**
	 * Optional. In case of exceeding flood control, the number of seconds left to wait before the request can be repeated.
	 */
	retry_after?: number;
}

/**
 * Represents the content of a media message to be sent.
 * It should be one of InputMediaAnimation, InputMediaDocument, InputMediaAudio, InputMediaPhoto, InputMediaVideo.
 */
export type TelegramInputMedia = TelegramInputMediaAnimation | TelegramInputMediaDocument | TelegramInputMediaAudio | TelegramInputMediaPhoto | TelegramInputMediaVideo;

/**
 * Represents a photo to be sent.
 */
export interface TelegramInputMediaPhoto {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be photo.
	 */
	type: 'photo';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet,
	 * or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name.
	 * More information on Sending Files »
	 */
	media: string;

	/**
	 * Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the photo caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Pass True if the photo needs to be covered with a spoiler animation.
	 */
	has_spoiler?: boolean;
}

/**
 * Represents a video to be sent.
 */
export interface TelegramInputMediaVideo {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be video.
	 */
	type: 'video';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet,
	 * or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name.
	 * More information on Sending Files »
	 */
	media: string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * More information on Sending Files »
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Optional. Caption of the video to be sent, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the video caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Video width.
	 */
	width?: number;

	/**
	 * Optional. Video height.
	 */
	height?: number;

	/**
	 * Optional. Video duration in seconds.
	 */
	duration?: number;

	/**
	 * Optional. Pass True if the uploaded video is suitable for streaming.
	 */
	supports_streaming?: boolean;

	/**
	 * Optional. Pass True if the video needs to be covered with a spoiler animation.
	 */
	has_spoiler?: boolean;
}

/**
 * Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent.
 */
export interface TelegramInputMediaAnimation {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be animation.
	 */
	type: 'animation';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet,
	 * or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name.
	 * More information on Sending Files »
	 */
	media: string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * More information on Sending Files »
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Optional. Caption of the animation to be sent, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the animation caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Animation width.
	 */
	width?: number;

	/**
	 * Optional. Animation height.
	 */
	height?: number;

	/**
	 * Optional. Animation duration in seconds.
	 */
	duration?: number;

	/**
	 * Optional. Pass True if the animation needs to be covered with a spoiler animation.
	 */
	has_spoiler?: boolean;
}

/**
 * Represents an audio file to be treated as music to be sent.
 */
export interface TelegramInputMediaAudio {
	/**
	 * Type of the result, must be audio.
	 */
	type: 'audio';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet,
	 * or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name.
	 * More information on Sending Files »
	 */
	media: string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * More information on Sending Files »
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Optional. Caption of the audio to be sent, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the audio caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Duration of the audio in seconds.
	 */
	duration?: number;

	/**
	 * Optional. Performer of the audio.
	 */
	performer?: string;

	/**
	 * Optional. Title of the audio.
	 */
	title?: string;
}

/**
 * Represents a general file to be sent.
 */
export interface TelegramInputMediaDocument {
	/**
	 * Type of the result, must be document.
	 */
	type: 'document';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet,
	 * or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name.
	 * More information on Sending Files »
	 */
	media: string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * More information on Sending Files »
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Optional. Caption of the document to be sent, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the document caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data.
	 * Always True, if the document is sent as part of an album.
	 */
	disable_content_type_detection?: boolean;
}

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser.
 *
 * @type {string} - URL or file_id
 * @type {Buffer} - Binary data of the file */
export type TelegramInputFile = string | Buffer;

/**
 * Use this method to send text messages. On success, the sent Message is returned.
 */
export interface TelegramSendMessageParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Optional. Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Text of the message to be sent, 1-4096 characters after entities parsing.
	 */
	text: string;

	/**
	 * Optional. Mode for parsing entities in the message text. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
	 */
	entities?: TelegramMessageEntity[];

	/**
	 * Optional. Link preview generation options for the message.
	 */
	link_preview_options?: TelegramLinkPreviewOptions;

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned.
 */
export interface TelegramForwardMessageParams {
	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Unique identifier for the chat where the original message was sent (or channel username in the format \@channelusername).
	 */
	from_chat_id: number | string;

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the forwarded message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Yes. Message identifier in the chat specified in from_chat_id.
	 */
	message_id: number;
}

/**
 * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned.
 */
export interface TelegramForwardMessagesParams {
	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Unique identifier for the chat where the original messages were sent (or channel username in the format \@channelusername).
	 */
	from_chat_id: number | string;

	/**
	 * Yes. A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to forward. The identifiers must be specified in a strictly increasing order.
	 */
	message_ids: number[];

	/**
	 * Optional. Sends the messages silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the forwarded messages from forwarding and saving.
	 */
	protect_content?: boolean;
}

/**
 * Use this method to copy messages of any kind. Service messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
 */
export interface TelegramCopyMessageParams {
	/**
	 * Pass True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Unique identifier for the chat where the original message was sent (or channel username in the format \@channelusername).
	 */
	from_chat_id: number | string;

	/**
	 * Yes. Message identifier in the chat specified in from_chat_id.
	 */
	message_id: number;

	/**
	 * Optional. New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the new caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove reply keyboard or to force a reply from the user.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned.
 */
export interface TelegramCopyMessagesParams {
	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Unique identifier for the chat where the original messages were sent (or channel username in the format \@channelusername).
	 */
	from_chat_id: number | string;

	/**
	 * Yes. A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order.
	 */
	message_ids: number[];

	/**
	 * Optional. Sends the messages silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent messages from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Pass True to copy the messages without their captions.
	 */
	remove_caption?: boolean;
}

/**
 * Use this method to send photos. On success, the sent Message is returned.
 */
export interface TelegramSendPhotoParams {
	/**
	 * Pass True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Optional. Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More information on Sending Files.
	 */
	photo: TelegramInputFile | string;

	/**
	 * Optional. Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the photo caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Pass True if the photo needs to be covered with a spoiler animation.
	 */
	has_spoiler?: boolean;

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user. Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
 */
export interface TelegramSendAudioParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Optional. Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files.
	 */
	audio: TelegramInputFile | string;

	/**
	 * Optional. Audio caption, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the audio caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Duration of the audio in seconds.
	 */
	duration?: number;

	/**
	 * Optional. Performer.
	 */
	performer?: string;

	/**
	 * Optional. Track name.
	 */
	title?: string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://
	 */
	thumbnail?: TelegramInputFile | string;

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
 */
export interface TelegramSendDocumentParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Optional. Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Yes. Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;

	/**
	 * Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Yes. File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files.
	 */
	document: TelegramInputFile | string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://
	 * <file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files.
	 */
	thumbnail?: TelegramInputFile | string;

	/**
	 * Optional. Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the document caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data.
	 */
	disable_content_type_detection?: boolean;

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a video in Telegram.
 */
export interface TelegramSendVideoParams {
	/**
	 * Pass True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Video to send. Pass a file_id as String to send a video that exists on the Telegram servers,
	 * pass an HTTP URL as a String for Telegram to get a video from the Internet,
	 * or upload a new video using multipart/form-data.
	 */
	video: TelegramInputFile;

	/**
	 * Duration of sent video in seconds.
	 */
	duration?: number;

	/**
	 * Video width.
	 */
	width?: number;

	/**
	 * Video height.
	 */
	height?: number;

	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the video caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Pass True if the video needs to be covered with a spoiler animation.
	 */
	has_spoiler?: boolean;

	/**
	 * Pass True if the uploaded video is suitable for streaming.
	 */
	supports_streaming?: boolean;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending an animation in Telegram.
 */
export interface TelegramSendAnimationParams {
	/**
	 * Pass True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers,
	 * pass an HTTP URL as a String for Telegram to get an animation from the Internet,
	 * or upload a new animation using multipart/form-data.
	 */
	animation: TelegramInputFile;

	/**
	 * Duration of sent animation in seconds.
	 */
	duration?: number;

	/**
	 * Animation width.
	 */
	width?: number;

	/**
	 * Animation height.
	 */
	height?: number;

	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the animation caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Pass True if the animation needs to be covered with a spoiler animation.
	 */
	has_spoiler?: boolean;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a voice message in Telegram.
 */
export interface TelegramSendVoiceParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers,
	 * pass an HTTP URL as a String for Telegram to get a file from the Internet,
	 * or upload a new one using multipart/form-data.
	 */
	voice: TelegramInputFile;

	/**
	 * Voice message caption, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the voice message caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Duration of the voice message in seconds.
	 */
	duration?: number;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a video note in Telegram.
 */
export interface TelegramSendVideoNoteParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers,
	 * or upload a new video using multipart/form-data.
	 */
	video_note: TelegramInputFile;

	/**
	 * Duration of sent video in seconds.
	 */
	duration?: number;

	/**
	 * Video width and height, i.e. diameter of the video message.
	 */
	length?: number;

	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a media group in Telegram.
 */
export interface TelegramSendMediaGroupParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * A JSON-serialized array describing messages to be sent, must include 2-10 items.
	 */
	media: TelegramMedia[];

	/**
	 * Sends messages silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent messages from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;
}

/**
 * Represents parameters for sending a location in Telegram.
 */
export interface TelegramSendLocationParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Latitude of the location.
	 */
	latitude: number;

	/**
	 * Longitude of the location.
	 */
	longitude: number;

	/**
	 * The radius of uncertainty for the location, measured in meters; 0-1500.
	 */
	horizontal_accuracy?: number;

	/**
	 * Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400).
	 */
	live_period?: number;

	/**
	 * For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
	 */
	heading?: number;

	/**
	 * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters.
	 * Must be between 1 and 100000 if specified.
	 */
	proximity_alert_radius?: number;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending information about a venue in Telegram.
 */
export interface TelegramSendVenueParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Latitude of the venue.
	 */
	latitude: number;

	/**
	 * Longitude of the venue.
	 */
	longitude: number;

	/**
	 * Name of the venue.
	 */
	title: string;

	/**
	 * Address of the venue.
	 */
	address: string;

	/**
	 * Foursquare identifier of the venue.
	 */
	foursquare_id?: string;

	/**
	 * Foursquare type of the venue, if known.
	 */
	foursquare_type?: string;

	/**
	 * Google Places identifier of the venue.
	 */
	google_place_id?: string;

	/**
	 * Google Places type of the venue.
	 */
	google_place_type?: string;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a phone contact in Telegram.
 */
export interface TelegramSendContactParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Contact's phone number.
	 */
	phone_number: string;

	/**
	 * Contact's first name.
	 */
	first_name: string;

	/**
	 * Contact's last name.
	 */
	last_name?: string;

	/**
	 * Additional data about the contact in the form of a vCard, 0-2048 bytes.
	 */
	vcard?: string;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a native poll in Telegram.
 */
export interface TelegramSendPollParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Poll question, 1-300 characters.
	 */
	question: string;

	/**
	 * A JSON-serialized list of answer options, 2-10 strings 1-100 characters each.
	 */
	options: TelegramInputPollOption[];

	/**
	 * True, if the poll needs to be anonymous, defaults to True.
	 */
	is_anonymous?: boolean;

	/**
	 * Poll type, “quiz” or “regular”, defaults to “regular”.
	 */
	type?: string;

	/**
	 * True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False.
	 */
	allows_multiple_answers?: boolean;

	/**
	 * 0-based identifier of the correct answer option, required for polls in quiz mode.
	 */
	correct_option_id?: number;

	/**
	 * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing.
	 */
	explanation?: string;

	/**
	 * Mode for parsing entities in the explanation.
	 */
	explanation_parse_mode?: TelegramParseMode;

	/**
	 * A JSON-serialized list of special entities that appear in the poll explanation, which can be specified instead of parse_mode.
	 */
	explanation_entities?: TelegramMessageEntity[];

	/**
	 * Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date.
	 */
	open_period?: number;

	/**
	 * Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period.
	 */
	close_date?: number;

	/**
	 * Pass True if the poll needs to be immediately closed. This can be useful for poll preview.
	 */
	is_closed?: boolean;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;

	/**
	 * A JSON-serialized list of special entities that appear in the poll question. It can be specified instead of question_parse_mode
	 */
	question_entities?: TelegramMessageEntity[];
}

/**
 * Represents parameters for sending a dice animation in Telegram.
 */
export interface TelegramSendDiceParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Emoji on which the dice throw animation is based.
	 * Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, “🎳”, or “🎰”.
	 * Defaults to “🎲”.
	 */
	emoji?: '🎲' | '🎯' | '🏀' | '⚽' | '🎳' | '🎰';

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding.
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Represents parameters for sending a chat action in Telegram.
 */
export interface TelegramSendChatActionParams {
	/**
	 * Unique identifier of the business connection on behalf of which the action will be sent.
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread; for supergroups only.
	 */
	message_thread_id?: number;

	/**
	 * Type of action to broadcast.
	 * Choose one, depending on what the user is about to receive:
	 * typing for text messages,
	 * upload_photo for photos,
	 * record_video or upload_video for videos,
	 * record_voice or upload_voice for voice notes,
	 * upload_document for general files,
	 * choose_sticker for stickers,
	 * find_location for location data,
	 * record_video_note or upload_video_note for video notes.
	 */
	action: TelegramChatActionType;
}

/**
 * Represents parameters for setting reactions on a message in Telegram.
 */
export interface TelegramSetMessageReactionParams {
	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Identifier of the target message. If the message belongs to a media group,
	 * the reaction is set to the first non-deleted message in the group instead.
	 */
	message_id: number;

	/**
	 * A JSON-serialized list of reaction types to set on the message.
	 * Currently, as non-premium users, bots can set up to one reaction per message.
	 * A custom emoji reaction can be used if it is either already present on the message
	 * or explicitly allowed by chat administrators.
	 */
	reaction?: TelegramReactionType[];

	/**
	 * Pass True to set the reaction with a big animation.
	 */
	is_big?: boolean;
}

/**
 * Represents parameters for retrieving a user's profile photos in Telegram.
 */
export interface TelegramGetUserProfilePhotosParams {
	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;

	/**
	 * Sequential number of the first photo to be returned.
	 * By default, all photos are returned.
	 */
	offset?: number;

	/**
	 * Limits the number of photos to be retrieved.
	 * Values between 1-100 are accepted. Defaults to 100.
	 */
	limit?: number;
}

/**
 * Represents parameters for getting information about a file in Telegram.
 *
 * Note: This function may not preserve the original file name and MIME type.
 * You should save the file's MIME type and name (if available) when the File object is received.
 */
export interface TelegramGetFileParams {
	/**
	 * File identifier to get information about.
	 */
	file_id: string;
}

/**
 * Represents parameters for banning a chat member in Telegram.
 */
export interface TelegramBanChatMemberParams {
	/**
	 * Unique identifier for the target group or username of the target supergroup or channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;

	/**
	 * Date when the user will be unbanned; Unix time.
	 * If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever.
	 * Applied for supergroups and channels only.
	 */
	until_date?: number;

	/**
	 * Pass True to delete all messages from the chat for the user that is being removed.
	 * If False, the user will be able to see messages in the group that were sent before the user was removed.
	 * Always True for supergroups and channels.
	 */
	revoke_messages?: boolean;
}

/**
 * Represents parameters for unbanning a chat member in Telegram.
 */
export interface TelegramUnbanChatMemberParams {
	/**
	 * Unique identifier for the target group or username of the target supergroup or channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;

	/**
	 * Do nothing if the user is not banned.
	 */
	only_if_banned?: boolean;
}

export interface TelegramRestrictChatMemberParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;

	/**
	 * New user permissions.
	 */
	permissions: TelegramChatPermissions;

	/**
	 * Pass True if chat permissions are set independently.
	 * Otherwise, certain permissions will imply others.
	 */
	use_independent_chat_permissions?: boolean;

	/**
	 * Date when restrictions will be lifted for the user; Unix time.
	 * If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever.
	 */
	until_date?: number;
}

/**
 * Represents parameters for promoting or demoting a chat member in a supergroup or a channel in Telegram.
 */
export interface TelegramPromoteChatMemberParams {
	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;

	/**
	 * Pass True if the administrator's presence in the chat is hidden.
	 */
	is_anonymous?: boolean;

	/**
	 * Pass True if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, and ignore slow mode.
	 * Implied by any other administrator privilege.
	 */
	can_manage_chat?: boolean;

	/**
	 * Pass True if the administrator can delete messages of other users.
	 */
	can_delete_messages?: boolean;

	/**
	 * Pass True if the administrator can manage video chats.
	 */
	can_manage_video_chats?: boolean;

	/**
	 * Pass True if the administrator can restrict, ban, or unban chat members, or access supergroup statistics.
	 */
	can_restrict_members?: boolean;

	/**
	 * Pass True if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly.
	 */
	can_promote_members?: boolean;

	/**
	 * Pass True if the administrator can change chat title, photo, and other settings.
	 */
	can_change_info?: boolean;

	/**
	 * Pass True if the administrator can invite new users to the chat.
	 */
	can_invite_users?: boolean;

	/**
	 * Pass True if the administrator can post stories to the chat.
	 */
	can_post_stories?: boolean;

	/**
	 * Pass True if the administrator can edit stories posted by other users.
	 */
	can_edit_stories?: boolean;

	/**
	 * Pass True if the administrator can delete stories posted by other users.
	 */
	can_delete_stories?: boolean;

	/**
	 * Pass True if the administrator can post messages in the channel, or access channel statistics.
	 */
	can_post_messages?: boolean;

	/**
	 * Pass True if the administrator can edit messages of other users and can pin messages.
	 */
	can_edit_messages?: boolean;

	/**
	 * Pass True if the administrator can pin messages.
	 */
	can_pin_messages?: boolean;

	/**
	 * Pass True if the user is allowed to create, rename, close, and reopen forum topics.
	 */
	can_manage_topics?: boolean;
}

/**
 * Represents parameters for setting a custom title for an administrator in a supergroup in Telegram.
 */
export interface TelegramSetChatAdministratorCustomTitleParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;

	/**
	 * New custom title for the administrator. Should be 0-16 characters, emoji are not allowed.
	 */
	custom_title: string;
}

/**
 * Represents parameters for banning a channel chat in a supergroup or channel in Telegram.
 */
export interface TelegramBanChatSenderChatParams {
	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target sender chat.
	 */
	sender_chat_id: number;
}

/**
 * Represents parameters for unbanning a previously banned channel chat in a supergroup or channel in Telegram.
 */
export interface TelegramUnbanChatSenderChatParams {
	/**
	 * Unique identifier for the target chat or username of the target channel.
	 */
	chat_id: number | string;

	/**
	 * Unique identifier of the target sender chat.
	 */
	sender_chat_id: number;
}

/**
 * Represents parameters for setting default chat permissions for all members in a Telegram supergroup.
 */
export interface TelegramSetChatPermissionsParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup.
	 */
	chat_id: number | string;

	/**
	 * New default chat permissions.
	 */
	permissions: TelegramChatPermissions;

	/**
	 * Pass True if chat permissions are set independently.
	 */
	use_independent_chat_permissions?: boolean;
}

/**
 * Represents parameters for exporting a new primary invite link for a Telegram chat.
 */
export interface TelegramExportChatInviteLinkParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for creating an additional invite link for a Telegram chat.
 */
export interface TelegramCreateChatInviteLinkParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Invite link name; 0-32 characters.
	 */
	name?: string;
	/**
	 * Point in time (Unix timestamp) when the link will expire.
	 */
	expire_date?: number;
	/**
	 * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
	 */
	member_limit?: number;
	/**
	 * True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified.
	 */
	creates_join_request?: boolean;
}

/**
 * Represents parameters for editing a non-primary invite link created by a bot in a Telegram chat.
 */
export interface TelegramEditChatInviteLinkParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * The invite link to edit.
	 */
	invite_link: string;
	/**
	 * Invite link name; 0-32 characters.
	 */
	name?: string;
	/**
	 * Point in time (Unix timestamp) when the link will expire.
	 */
	expire_date?: number;
	/**
	 * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
	 */
	member_limit?: number;
	/**
	 * True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified.
	 */
	creates_join_request?: boolean;
}

/**
 * Represents parameters for revoking an invite link created by a bot in a Telegram chat.
 */
export interface TelegramRevokeChatInviteLinkParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * The invite link to revoke.
	 */
	invite_link: string;
}

/**
 * Represents parameters for approving a chat join request in a Telegram chat.
 */
export interface TelegramApproveChatJoinRequestParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;
}

/**
 * Represents parameters for declining a chat join request in a Telegram chat.
 */
export interface TelegramDeclineChatJoinRequestParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;
}

/**
 * Represents parameters for setting a new profile photo for a Telegram chat.
 */
export interface TelegramSetChatPhotoParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * New chat photo, uploaded using multipart/form-data.
	 */
	photo: TelegramInputFile;
}

/**
 * Represents parameters for deleting a chat photo in a Telegram chat.
 */
export interface TelegramDeleteChatPhotoParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for changing the title of a chat in Telegram.
 */
export interface TelegramSetChatTitleParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * New chat title, 1-128 characters.
	 */
	title: string;
}

/**
 * Represents parameters for changing the description of a chat in Telegram.
 */
export interface TelegramSetChatDescriptionParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * New chat description, 0-255 characters.
	 */
	description?: string;
}

/**
 * Represents parameters for pinning a message in a chat in Telegram.
 */
export interface TelegramPinChatMessageParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message will be pinned
	 */
	business_connection_id?: string;
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Identifier of a message to pin.
	 */
	message_id: number;
	/**
	 * Pass True if it is not necessary to send a notification to all chat members about the new pinned message.
	 * Notifications are always disabled in channels and private chats.
	 */
	disable_notification?: boolean;
}

/**
 * Represents parameters for unpinning a message in a chat in Telegram.
 */
export interface TelegramUnpinChatMessageParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message will be unpinned
	 */
	business_connection_id?: string;
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned.
	 */
	message_id?: number;
}

/**
 * Represents parameters for unpinning all messages in a chat in Telegram.
 */
export interface TelegramUnpinAllChatMessagesParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for a bot leaving a chat in Telegram.
 */
export interface TelegramLeaveChatParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup or channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for getting up-to-date information about a chat in Telegram.
 */
export interface TelegramGetChatParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup or channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for getting a list of administrators in a chat in Telegram.
 */
export interface TelegramGetChatAdministratorsParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup or channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for getting the number of members in a chat in Telegram.
 */
export interface TelegramGetChatMemberCountParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup or channel (in the format \@channelusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for getting information about a member of a chat in Telegram.
 */
export interface TelegramGetChatMemberParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup or channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;
}

/**
 * Represents parameters for setting a new group sticker set for a supergroup in Telegram.
 */
export interface TelegramSetChatStickerSetParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Name of the sticker set to be set as the group sticker set.
	 */
	sticker_set_name: string;
}

/**
 * Represents parameters for deleting a group sticker set from a supergroup in Telegram.
 */
export interface TelegramDeleteChatStickerSetParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for creating a topic in a forum supergroup chat in Telegram.
 */
export interface TelegramCreateForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Topic name, 1-128 characters.
	 */
	name: string;
	/**
	 * Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F).
	 */
	icon_color?: number;
	/**
	 * Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers.
	 */
	icon_custom_emoji_id?: string;
}

/**
 * Represents parameters for editing a topic in a forum supergroup chat in Telegram.
 */
export interface TelegramEditForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier for the target message thread of the forum topic.
	 */
	message_thread_id: number;
	/**
	 * New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept.
	 */
	name?: string;
	/**
	 * New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept.
	 */
	icon_custom_emoji_id?: string;
}

/**
 * Represents parameters for closing a topic in a forum supergroup chat in Telegram.
 */
export interface TelegramCloseForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier for the target message thread of the forum topic.
	 */
	message_thread_id: number;
}

/**
 * Represents parameters for reopening a closed topic in a forum supergroup chat in Telegram.
 */
export interface TelegramReopenForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier for the target message thread of the forum topic.
	 */
	message_thread_id: number;
}

/**
 * Represents parameters for deleting a forum topic in a forum supergroup chat in Telegram.
 */
export interface TelegramDeleteForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier for the target message thread of the forum topic.
	 */
	message_thread_id: number;
}

/**
 * Represents parameters for clearing the list of pinned messages in a forum topic in a supergroup chat in Telegram.
 */
export interface TelegramUnpinAllForumTopicMessagesParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier for the target message thread of the forum topic.
	 */
	message_thread_id: number;
}

/**
 * Represents parameters for editing the 'General' topic in a forum supergroup chat in Telegram.
 */
export interface TelegramEditGeneralForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
	/**
	 * New topic name, 1-128 characters.
	 */
	name: string;
}

/**
 * Represents parameters for closing the 'General' topic in a forum supergroup chat in Telegram.
 */
export interface TelegramCloseGeneralForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for reopening the 'General' topic in a forum supergroup chat in Telegram.
 */
export interface TelegramReopenGeneralForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for hiding the 'General' topic in a forum supergroup chat in Telegram.
 */
export interface TelegramHideGeneralForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for unhiding the 'General' topic in a forum supergroup chat in Telegram.
 */
export interface TelegramUnhideGeneralForumTopicParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Represents parameters for clearing the list of pinned messages in a General forum topic in Telegram.
 */
export interface TelegramUnpinAllGeneralForumTopicMessagesParams {
	/**
	 * Unique identifier for the target chat or username of the target supergroup (in the format \@supergroupusername).
	 */
	chat_id: number | string;
}

/**
 * Interface for answering callback queries sent from inline keyboards.
 * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.
 * On success, True is returned.
 */
export interface TelegramAnswerCallbackQueryParams {
	/**
	 * Unique identifier for the query to be answered.
	 */
	callback_query_id: string;
	/**
	 * Text of the notification. If not specified, nothing will be shown to the user.
	 * It should be between 0-200 characters.
	 */
	text?: string;
	/**
	 * If True, an alert will be shown by the client instead of a notification at the top of the chat screen.
	 * Defaults to false.
	 */
	show_alert?: boolean;
	/**
	 * URL that will be opened by the user's client.
	 * If you have created a Game and accepted the conditions via \@BotFather,
	 * specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.
	 * Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
	 */
	url?: string;
	/**
	 * The maximum amount of time in seconds that the result of the callback query may be cached client-side.
	 * Telegram apps will support caching starting in version 3.14. Defaults to 0.
	 */
	cache_time?: number;
}

/**
 * Interface for getting the list of boosts added to a chat by a user.
 * Requires administrator rights in the chat.
 * Returns a UserChatBoosts object.
 */
export interface TelegramGetUserChatBoostsParams {
	/**
	 * Unique identifier for the chat or username of the channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier of the target user.
	 */
	user_id: number;
}

/**
 * Interface for getting information about the connection of the bot with a business account.
 * Returns a BusinessConnection object on success.
 */
export interface TelegramGetBusinessConnectionParams {
	/**
	 * Unique identifier of the business connection.
	 */
	business_connection_id: string;
}

/**
 * Interface for changing the list of the bot's commands.
 * Returns True on success.
 */
export interface TelegramSetMyCommandsParams {
	/**
	 * A JSON-serialized list of bot commands to be set as the list of the bot's commands.
	 * At most 100 commands can be specified.
	 */
	commands: TelegramBotCommand[];
	/**
	 * A JSON-serialized object, describing scope of users for which the commands are relevant.
	 * Defaults to BotCommandScopeDefault.
	 */
	scope?: TelegramBotCommandScope;
	/**
	 * A two-letter ISO 639-1 language code.
	 * If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands.
	 */
	language_code?: string;
}

/**
 * Interface for deleting the list of the bot's commands for the given scope and user language.
 * After deletion, higher level commands will be shown to affected users.
 * Returns True on success.
 */
export interface TelegramDeleteMyCommandsParams {
	/**
	 * A JSON-serialized object, describing scope of users for which the commands are relevant.
	 * Defaults to BotCommandScopeDefault.
	 */
	scope?: TelegramBotCommandScope;
	/**
	 * A two-letter ISO 639-1 language code.
	 * If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands.
	 */
	language_code?: string;
}

/**
 * Interface for getting the current list of the bot's commands for the given scope and user language.
 * Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned.
 */
export interface TelegramGetMyCommandsParams {
	/**
	 * A JSON-serialized object, describing scope of users.
	 * Defaults to BotCommandScopeDefault.
	 */
	scope?: TelegramBotCommandScope;
	/**
	 * A two-letter ISO 639-1 language code or an empty string.
	 */
	language_code?: string;
}

/**
 * Interface for changing the bot's name.
 * Returns True on success.
 */
export interface TelegramSetMyNameParams {
	/**
	 * New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language.
	 */
	name: string;
	/**
	 * A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name.
	 */
	language_code?: string;
}

/**
 * Interface for getting the current bot name for the given user language.
 * Returns BotName on success.
 */
export interface TelegramGetMyNameParams {
	/**
	 * A two-letter ISO 639-1 language code or an empty string.
	 */
	language_code?: string;
}

/**
 * Interface for changing the bot's description, which is shown in the chat with the bot if the chat is empty.
 * Returns True on success.
 */
export interface TelegramSetMyDescriptionParams {
	/**
	 * New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language.
	 */
	description: string;
	/**
	 * A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description.
	 */
	language_code?: string;
}

/**
 * Interface for getting the current bot description for the given user language.
 * Returns BotDescription on success.
 */
export interface TelegramGetMyDescriptionParams {
	/**
	 * A two-letter ISO 639-1 language code or an empty string.
	 */
	language_code?: string;
}

/**
 * Interface for changing the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
 * Returns True on success.
 */
export interface TelegramSetMyShortDescriptionParams {
	/**
	 * New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language.
	 */
	short_description: string;
	/**
	 * A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description.
	 */
	language_code?: string;
}

/**
 * Interface for getting the current bot short description for the given user language.
 * Returns BotShortDescription on success.
 */
export interface TelegramGetMyShortDescriptionParams {
	/**
	 * A two-letter ISO 639-1 language code or an empty string.
	 */
	language_code?: string;
}

/**
 * Interface for changing the bot's menu button in a private chat, or the default menu button.
 * Returns True on success.
 */
export interface TelegramSetChatMenuButtonParams {
	/**
	 * Unique identifier for the target private chat.
	 * If not specified, default bot's menu button will be changed.
	 */
	chat_id?: number;
	/**
	 * A JSON-serialized object for the bot's new menu button.
	 * Defaults to MenuButtonDefault.
	 */
	menu_button?: TelegramMenuButton;
}

/**
 * Interface for getting the current value of the bot's menu button in a private chat, or the default menu button.
 * Returns MenuButton on success.
 */
export interface TelegramGetChatMenuButtonParams {
	/**
	 * Unique identifier for the target private chat.
	 * If not specified, default bot's menu button will be returned.
	 */
	chat_id?: number;
}

/**
 * Interface for changing the default administrator rights requested by the bot when it's added as an administrator to groups or channels.
 * Returns True on success.
 */
export interface TelegramSetMyDefaultAdministratorRightsParams {
	/**
	 * A JSON-serialized object describing new default administrator rights.
	 * If not specified, the default administrator rights will be cleared.
	 */
	rights?: TelegramChatAdministratorRights;
	/**
	 * Pass True to change the default administrator rights of the bot in channels.
	 * Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
	 */
	for_channels?: boolean;
}

/**
 * Interface for getting the current default administrator rights of the bot.
 * Returns ChatAdministratorRights on success.
 */
export interface TelegramGetMyDefaultAdministratorRightsParams {
	/**
	 * Pass True to get default administrator rights of the bot in channels.
	 * Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
	 */
	for_channels?: boolean;
}

/**
 * Interface for editing text and game messages.
 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 */
export interface TelegramEditMessageTextParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;

	/**
	 * Required if inline_message_id is not specified.
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id?: number | string;
	/**
	 * Required if inline_message_id is not specified.
	 * Identifier of the message to edit.
	 */
	message_id?: number;
	/**
	 * Required if chat_id and message_id are not specified.
	 * Identifier of the inline message.
	 */
	inline_message_id?: string;
	/**
	 * New text of the message, 1-4096 characters after entities parsing.
	 */
	text: string;
	/**
	 * Mode for parsing entities in the message text. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;
	/**
	 * A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
	 */
	entities?: TelegramMessageEntity[];
	/**
	 * Link preview generation options for the message.
	 */
	link_preview_options?: TelegramLinkPreviewOptions;
	/**
	 * A JSON-serialized object for an inline keyboard.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Interface for editing captions of messages.
 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 */
export interface TelegramEditMessageCaptionParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;

	/**
	 * Pass True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Required if inline_message_id is not specified.
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id?: number | string;
	/**
	 * Required if inline_message_id is not specified.
	 * Identifier of the message to edit.
	 */
	message_id?: number;
	/**
	 * Required if chat_id and message_id are not specified.
	 * Identifier of the inline message.
	 */
	inline_message_id?: string;
	/**
	 * New caption of the message, 0-1024 characters after entities parsing.
	 */
	caption?: string;
	/**
	 * Mode for parsing entities in the message caption. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;
	/**
	 * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];
	/**
	 * A JSON-serialized object for an inline keyboard.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Interface for editing animation, audio, document, photo, or video messages.
 * If a message is part of a message album, then it can be edited only to an audio for audio albums,
 * only to a document for document albums and to a photo or a video otherwise.
 * When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 */
export interface TelegramEditMessageMediaParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;
	/**
	 * Required if inline_message_id is not specified.
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id?: number | string;
	/**
	 * Required if inline_message_id is not specified.
	 * Identifier of the message to edit.
	 */
	message_id?: number;
	/**
	 * Required if chat_id and message_id are not specified.
	 * Identifier of the inline message.
	 */
	inline_message_id?: string;
	/**
	 * A JSON-serialized object for a new media content of the message.
	 */
	media: TelegramInputMedia;
	/**
	 * A JSON-serialized object for a new inline keyboard.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Interface for editing live location messages.
 * A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 */
export interface TelegramEditMessageLiveLocationParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;

	/**
	 * Required if inline_message_id is not specified.
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id?: number | string;
	/**
	 * Required if inline_message_id is not specified.
	 * Identifier of the message to edit.
	 */
	message_id?: number;
	/**
	 * Required if chat_id and message_id are not specified.
	 * Identifier of the inline message.
	 */
	inline_message_id?: string;
	/**
	 * Latitude of new location.
	 */
	latitude: number;
	/**
	 * Longitude of new location.
	 */
	longitude: number;
	/**
	 * The radius of uncertainty for the location, measured in meters; 0-1500.
	 */
	horizontal_accuracy?: number;
	/**
	 * Direction in which the user is moving, in degrees.
	 * Must be between 1 and 360 if specified.
	 */
	heading?: number;
	/**
	 * The maximum distance for proximity alerts about approaching another chat member, in meters.
	 * Must be between 1 and 100000 if specified.
	 */
	proximity_alert_radius?: number;
	/**
	 * A JSON-serialized object for a new inline keyboard.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * New period in seconds during which the location can be updated, starting from the message send date. If 0x7FFFFFFF is specified, then the location can be updated forever. Otherwise, the new value must not exceed the current live_period by more than a day, and the live location expiration date must remain within the next 90 days. If not specified, then live_period remains unchanged
	 */
	live_period: number;
}

/**
 * Interface for stopping updating a live location message before live_period expires.
 * On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
 */
export interface TelegramStopMessageLiveLocationParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;

	/**
	 * Required if inline_message_id is not specified.
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id?: number | string;
	/**
	 * Required if inline_message_id is not specified.
	 * Identifier of the message with live location to stop.
	 */
	message_id?: number;
	/**
	 * Required if chat_id and message_id are not specified.
	 * Identifier of the inline message.
	 */
	inline_message_id?: string;
	/**
	 * A JSON-serialized object for a new inline keyboard.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Interface for editing only the reply markup of messages.
 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 */
export interface TelegramEditMessageReplyMarkupParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;
	/**
	 * Required if inline_message_id is not specified.
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id?: number | string;
	/**
	 * Required if inline_message_id is not specified.
	 * Identifier of the message to edit.
	 */
	message_id?: number;
	/**
	 * Required if chat_id and message_id are not specified.
	 * Identifier of the inline message.
	 */
	inline_message_id?: string;
	/**
	 * A JSON-serialized object for an inline keyboard.
	 */
	reply_markup: TelegramInlineKeyboardMarkup;
}

/**
 * Interface for stopping a poll which was sent by the bot.
 * On success, the stopped Poll is returned.
 */
export interface TelegramStopPollParams {
	/**
	 * Unique identifier of the business connection on behalf of which the message to be edited was sent
	 */
	business_connection_id?: string;
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Identifier of the original message with the poll.
	 */
	message_id: number;
	/**
	 * A JSON-serialized object for a new message inline keyboard.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Interface for deleting a message.
 * Use this method to delete a message, including service messages, with the following limitations:
 * - A message can only be deleted if it was sent less than 48 hours ago.
 * - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
 * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
 * - Bots can delete outgoing messages in private chats, groups, and supergroups.
 * - Bots can delete incoming messages in private chats.
 * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
 * - If the bot is an administrator of a group, it can delete any message there.
 * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
 * Returns True on success.
 */
export interface TelegramDeleteMessageParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Identifier of the message to delete.
	 */
	message_id: number;
}

/**
 * Interface for deleting multiple messages simultaneously.
 * Use this method to delete multiple messages simultaneously.
 * If some of the specified messages can't be found, they are skipped.
 * Returns True on success.
 */
export interface TelegramDeleteMessagesParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * A JSON-serialized list of 1-100 identifiers of messages to delete.
	 * See deleteMessage for limitations on which messages can be deleted.
	 */
	message_ids: number[];
}

/**
 * Interface for a sticker object.
 * Represents a sticker.
 */
export interface TelegramSticker {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;
	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	file_unique_id: string;
	/**
	 * Type of the sticker, currently one of "regular", "mask", "custom_emoji".
	 * The type of the sticker is independent from its format, which is determined by the fields isAnimated and isVideo.
	 */
	type: TelegramStickerType;
	/**
	 * Sticker width.
	 */
	width: number;
	/**
	 * Sticker height.
	 */
	height: number;
	/**
	 * True, if the sticker is animated.
	 */
	is_animated: boolean;
	/**
	 * True, if the sticker is a video sticker.
	 */
	is_video: boolean;
	/**
	 * Sticker thumbnail in the .WEBP or .JPG format.
	 */
	thumbnail?: TelegramPhotoSize;
	/**
	 * Emoji associated with the sticker.
	 */
	emoji?: string;
	/**
	 * Name of the sticker set to which the sticker belongs.
	 */
	set_name?: string;
	/**
	 * For premium regular stickers, premium animation for the sticker.
	 */
	premium_animation?: TelegramFile;
	/**
	 * For mask stickers, the position where the mask should be placed.
	 */
	mask_position?: TelegramMaskPosition;
	/**
	 * For custom emoji stickers, unique identifier of the custom emoji.
	 */
	custom_emoji_id?: string;
	/**
	 * True, if the sticker must be repainted to a text color in messages,
	 * the color of the Telegram Premium badge in emoji status, white color on chat photos,
	 * or another appropriate color in other places.
	 */
	needs_repainting?: boolean;
	/**
	 * File size in bytes.
	 */
	file_size?: number;
}

/**
 * Interface for a sticker set object.
 * Represents a sticker set.
 */
export interface TelegramStickerSet {
	/**
	 * Sticker set name.
	 */
	name: string;
	/**
	 * Sticker set title.
	 */
	title: string;
	/**
	 * Type of stickers in the set, currently one of "regular", "mask", "custom_emoji".
	 */
	sticker_type: TelegramStickerType;
	/**
	 * List of all set stickers.
	 */
	stickers: TelegramSticker[];
	/**
	 * Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format.
	 */
	thumbnail?: TelegramPhotoSize;
}

/**
 * Interface for a mask position object.
 * This object describes the position on faces where a mask should be placed by default.
 */
export interface TelegramMaskPosition {
	/**
	 * The part of the face relative to which the mask should be placed.
	 * One of "forehead", "eyes", "mouth", or "chin".
	 */
	point: TelegramMaskPositionPoint;
	/**
	 * Shift by X-axis measured in widths of the mask scaled to the face size, from left to right.
	 * For example, choosing -1.0 will place mask just to the left of the default mask position.
	 */
	x_shift: number;
	/**
	 * Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom.
	 * For example, 1.0 will place the mask just below the default mask position.
	 */
	y_shift: number;
	/**
	 * Mask scaling coefficient. For example, 2.0 means double size.
	 */
	scale: number;
}

/**
 * Interface for describing a sticker to be added to a sticker set.
 */
export interface TelegramInputSticker {
	/**
	 * The added sticker. Pass a file_id as a String to send a file that already exists on the Telegram servers,
	 * pass an HTTP URL as a String for Telegram to get a file from the Internet, upload a new one using multipart/form-data,
	 * or pass to upload a new one using multipart/form-data under <file_attach_name> name. Animated and video stickers
	 * can't be uploaded via HTTP URL. More information on Sending Files
	 */
	sticker: TelegramInputFile;

	/**
	 * Format of the added sticker, must be one of “static” for a .WEBP or .PNG image,
	 * “animated” for a .TGS animation, “video” for a WEBM video
	 */
	format: string;

	/**
	 * List of 1-20 emoji associated with the sticker
	 */
	emoji_list: string[];

	/**
	 * Position where the mask should be placed on faces. For “mask” stickers only.
	 */
	mask_position?: TelegramMaskPosition;

	/**
	 * List of 0-20 search keywords for the sticker with total length of up to 64 characters.
	 * For “regular” and “custom_emoji” stickers only.
	 */
	keywords?: string[];
}

/**
 * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
 * On success, the sent Message is returned.
 */
export interface TelegramSendStickerParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier of the business connection on behalf of which the message will be sent
	 */
	business_connection_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel
	 * (in the format \@channelusername)
	 */
	chat_id: number | string;

	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
	 */
	message_thread_id?: number;

	/**
	 * Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet,
	 * or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data.
	 * Video and animated stickers can't be sent via an HTTP URL.
	 */
	sticker: TelegramInputFile;

	/**
	 * Emoji associated with the sticker; only for just uploaded stickers
	 */
	emoji?: string;

	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Protects the contents of the sent message from forwarding and saving
	 */
	protect_content?: boolean;

	/**
	 * Description of the message to reply to
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove reply keyboard or to force a reply from the user.
	 * Not supported for messages sent on behalf of a business account.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Use this method to get a sticker set.
 * On success, a StickerSet object is returned.
 */
export interface TelegramGetStickerSetParams {
	/**
	 * Name of the sticker set
	 */
	name: string;
}

/**
 * Use this method to get a sticker set.
 * On success, a StickerSet object is returned.
 */
export interface TelegramGetStickerSetParams {
	/**
	 * Name of the sticker set
	 */
	name: string;
}

/**
 * Use this method to get information about custom emoji stickers by their identifiers.
 * Returns an Array of Sticker objects.
 */
export interface TelegramGetCustomEmojiStickersParams {
	/**
	 * A JSON-serialized list of custom emoji identifiers.
	 * At most 200 custom emoji identifiers can be specified.
	 */
	custom_emoji_ids: string[];
}

/**
 * Use this method to upload a file with a sticker for later use in the createNewStickerSet,
 * addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times).
 * Returns the uploaded File on success.
 */
export interface TelegramUploadStickerFileParams {
	/**
	 * User identifier of sticker file owner
	 */
	user_id: number;

	/**
	 * A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format.
	 * See https://core.telegram.org/stickers for technical requirements.
	 * More information on Sending Files
	 */
	sticker: TelegramInputFile;

	/**
	 * Format of the sticker, must be one of “static”, “animated”, “video”
	 */
	sticker_format: TelegramStickerFormat;
}

/**
 * Use this method to create a new sticker set owned by a user.
 * The bot will be able to edit the sticker set thus created.
 * Returns True on success.
 */
export interface TelegramCreateNewStickerSetParams {
	/**
	 * User identifier of created sticker set owner
	 */
	user_id: number;

	/**
	 * Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals).
	 * Can contain only English letters, digits and underscores.
	 * Must begin with a letter, can't contain consecutive underscores and must end in "_by_<bot_username>".
	 * <bot_username> is case insensitive. 1-64 characters.
	 */
	name: string;

	/**
	 * Sticker set title, 1-64 characters
	 */
	title: string;

	/**
	 * A JSON-serialized list of 1-50 initial stickers to be added to the sticker set
	 */
	stickers: TelegramInputSticker[];

	/**
	 * Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”.
	 * By default, a regular sticker set is created.
	 */
	sticker_type?: string;

	/**
	 * Pass True if stickers in the sticker set must be repainted to the color of text when used in messages,
	 * the accent color if used as emoji status, white on chat photos, or another appropriate color based on context;
	 * for custom emoji sticker sets only
	 */
	needs_repainting?: boolean;
}

/**
 * Use this method to add a new sticker to a set created by the bot.
 * Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers.
 * Returns True on success.
 */
export interface TelegramAddStickerToSetParams {
	/**
	 * User identifier of sticker set owner
	 */
	user_id: number;

	/**
	 * Sticker set name
	 */
	name: string;

	/**
	 * A JSON-serialized object with information about the added sticker.
	 * If exactly the same sticker had already been added to the set, then the set isn't changed.
	 */
	sticker: TelegramInputSticker;
}

/**
 * Use this method to move a sticker in a set created by the bot to a specific position.
 * Returns True on success.
 */
export interface TelegramSetStickerPositionInSetParams {
	/**
	 * File identifier of the sticker
	 */
	sticker: string;

	/**
	 * New sticker position in the set, zero-based
	 */
	position: number;
}

/**
 * Use this method to delete a sticker from a set created by the bot.
 * Returns True on success.
 */
export interface TelegramDeleteStickerFromSetParams {
	/**
	 * File identifier of the sticker
	 */
	sticker: string;
}

/**
 * Use this method to replace an existing sticker in a sticker set with a new one.
 * Returns True on success.
 */
export interface TelegramReplaceStickerInSetParams {
	/**
	 * User identifier of the sticker set owner
	 */
	user_id: number;

	/**
	 * Sticker set name
	 */
	name: string;

	/**
	 * File identifier of the replaced sticker
	 */
	old_sticker: string;

	/**
	 * A JSON-serialized object with information about the added sticker.
	 * If exactly the same sticker had already been added to the set, then the set remains unchanged.
	 */
	sticker: TelegramInputSticker;
}

/**
 * Use this method to change the list of emoji assigned to a regular or custom emoji sticker.
 * The sticker must belong to a sticker set created by the bot.
 * Returns True on success.
 */
export interface TelegramSetStickerEmojiListParams {
	/**
	 * File identifier of the sticker
	 */
	sticker: string;

	/**
	 * A JSON-serialized list of 1-20 emoji associated with the sticker
	 */
	emoji_list: string[];
}

/**
 * Use this method to change search keywords assigned to a regular or custom emoji sticker.
 * The sticker must belong to a sticker set created by the bot.
 * Returns True on success.
 */
export interface TelegramSetStickerKeywordsParams {
	/**
	 * File identifier of the sticker
	 */
	sticker: string;

	/**
	 * A JSON-serialized list of 0-20 search keywords for the sticker
	 * with total length of up to 64 characters
	 */
	keywords?: string[];
}

/**
 * Use this method to change the mask position of a mask sticker.
 * The sticker must belong to a sticker set that was created by the bot.
 * Returns True on success.
 */
export interface TelegramSetStickerMaskPositionParams {
	/**
	 * File identifier of the sticker
	 */
	sticker: string;

	/**
	 * A JSON-serialized object with the position where the mask should be placed on faces.
	 * Omit the parameter to remove the mask position.
	 */
	mask_position?: TelegramMaskPosition;
}

/**
 * Use this method to set the title of a created sticker set.
 * Returns True on success.
 */
export interface TelegramSetStickerSetTitleParams {
	/**
	 * Sticker set name
	 */
	name: string;

	/**
	 * Sticker set title, 1-64 characters
	 */
	title: string;
}

/**
 * Use this method to set the thumbnail of a regular or mask sticker set.
 * Returns True on success.
 */
export interface TelegramSetStickerSetThumbnailParams {
	/**
	 * Sticker set name
	 */
	name: string;

	/**
	 * User identifier of the sticker set owner
	 */
	user_id: number;

	/**
	 * A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size
	 * and have a width and height of exactly 100px, or a .TGS animation with a thumbnail
	 * up to 32 kilobytes in size, or a WEBM video with the thumbnail up to 32 kilobytes in size;
	 * see https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical requirements.
	 * Pass a file_id as a String to send a file that already exists on the Telegram servers,
	 * pass an HTTP URL as a String for Telegram to get a file from the Internet,
	 * or upload a new one using multipart/form-data. Animated and video sticker set thumbnails can't be uploaded via HTTP URL.
	 * If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail.
	 */
	thumbnail?: TelegramInputFile;

	/**
	 * Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image,
	 * “animated” for a .TGS animation, or “video” for a WEBM video
	 */
	format: string;
}

/**
 * Use this method to set the thumbnail of a custom emoji sticker set.
 * Returns True on success.
 */
export interface TelegramSetCustomEmojiStickerSetThumbnailParams {
	/**
	 * Sticker set name
	 */
	name: string;

	/**
	 * Custom emoji identifier of a sticker from the sticker set;
	 * pass an empty string to drop the thumbnail and use the first sticker as the thumbnail.
	 */
	custom_emoji_id?: string;
}

/**
 * Use this method to delete a sticker set that was created by the bot.
 * Returns True on success.
 */
export interface TelegramDeleteStickerSetParams {
	/**
	 * Sticker set name
	 */
	name: string;
}

/**
 * This object represents an incoming inline query.
 * When the user sends an empty query, your bot could return some default or trending results.
 */
export interface TelegramInlineQuery {
	/**
	 * Unique identifier for this query
	 */
	id: string;

	/**
	 * Sender
	 */
	from: TelegramUser;

	/**
	 * Text of the query (up to 256 characters)
	 */
	query: string;

	/**
	 * Offset of the results to be returned, can be controlled by the bot
	 */
	offset: string;

	/**
	 * Type of the chat from which the inline query was sent.
	 * Can be either “sender” for a private chat with the inline query sender,
	 * “private”, “group”, “supergroup”, or “channel”.
	 * The chat type should be always known for requests sent from official clients
	 * and most third-party clients, unless the request was sent from a secret chat
	 */
	chat_type?: string;

	/**
	 * Sender location, only for bots that request user location
	 */
	location?: Location;
}

/**
 * Use this method to send answers to an inline query. On success, True is returned.
 * No more than 50 results per query are allowed.
 */
export interface TelegramAnswerInlineQueryParams {
	/**
	 * Unique identifier for the answered query
	 */
	inline_query_id: string;

	/**
	 * A JSON-serialized array of results for the inline query
	 */
	results: TelegramInlineQueryResult[];

	/**
	 * The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300.
	 */
	cache_time?: number;

	/**
	 * Pass True if results may be cached on the server side only for the user that sent the query.
	 * By default, results may be returned to any user who sends the same query.
	 */
	is_personal?: boolean;

	/**
	 * Pass the offset that a client should send in the next query with the same text to receive more results.
	 * Pass an empty string if there are no more results or if you don't support pagination.
	 * Offset length can't exceed 64 bytes.
	 */
	next_offset?: string;

	/**
	 * A JSON-serialized object describing a button to be shown above inline query results
	 */
	button?: InlineQueryResultsButton;
}

/**
 * This object represents a button to be shown above inline query results.
 * You must use exactly one of the optional fields.
 */
export interface InlineQueryResultsButton {
	/**
	 * Label text on the button
	 */
	text: string;

	/**
	 * Description of the Web App that will be launched when the user presses the button.
	 * The Web App will be able to switch back to the inline mode using the method switchInlineQuery inside the Web App.
	 */
	web_app?: TelegramWebAppInfo;

	/**
	 * Deep-linking parameter for the /start message sent to the bot when a user presses the button.
	 * 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed.
	 */
	start_parameter?: string;
}

/**
 * This object represents one result of an inline query.
 * Telegram clients currently support results of the following 20 types:
 * - InlineQueryResultCachedAudio
 * - InlineQueryResultCachedDocument
 * - InlineQueryResultCachedGif
 * - InlineQueryResultCachedMpeg4Gif
 * - InlineQueryResultCachedPhoto
 * - InlineQueryResultCachedSticker
 * - InlineQueryResultCachedVideo
 * - InlineQueryResultCachedVoice
 * - InlineQueryResultArticle
 * - InlineQueryResultAudio
 * - InlineQueryResultContact
 * - InlineQueryResultGame
 * - InlineQueryResultDocument
 * - InlineQueryResultGif
 * - InlineQueryResultLocation
 * - InlineQueryResultMpeg4Gif
 * - InlineQueryResultPhoto
 * - InlineQueryResultVenue
 * - InlineQueryResultVideo
 * - InlineQueryResultVoice
 *
 * Note: All URLs passed in inline query results will be available to end users
 * and therefore must be assumed to be public.
 */
export type TelegramInlineQueryResult = TelegramInlineQueryResultCachedAudio | TelegramInlineQueryResultCachedDocument | TelegramInlineQueryResultCachedGif | TelegramInlineQueryResultCachedMpeg4Gif | TelegramInlineQueryResultCachedPhoto | TelegramInlineQueryResultCachedSticker | TelegramInlineQueryResultCachedVideo | TelegramInlineQueryResultCachedVoice | TelegramInlineQueryResultArticle | TelegramInlineQueryResultAudio | TelegramInlineQueryResultContact | TelegramInlineQueryResultGame | TelegramInlineQueryResultDocument | TelegramInlineQueryResultGif | TelegramInlineQueryResultLocation | TelegramInlineQueryResultMpeg4Gif | TelegramInlineQueryResultPhoto | TelegramInlineQueryResultVenue | TelegramInlineQueryResultVideo | TelegramInlineQueryResultVoice;

/**
 * Represents a link to an article or web page.
 */
export interface TelegramInlineQueryResultArticle {
	/**
	 * Type of the result, must be article
	 */
	type: 'article';

	/**
	 * Unique identifier for this result, 1-64 Bytes
	 */
	id: string;

	/**
	 * Title of the result
	 */
	title: string;

	/**
	 * Content of the message to be sent
	 */
	input_message_content: TelegramInputMessageContent;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * URL of the result
	 */
	url?: string;

	/**
	 * Pass True if you don't want the URL to be shown in the message
	 */
	hide_url?: boolean;

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Url of the thumbnail for the result
	 */
	thumbnail_url?: string;

	/**
	 * Thumbnail width
	 */
	thumbnail_width?: number;

	/**
	 * Thumbnail height
	 */
	thumbnail_height?: number;
}

/**
 * Represents a link to a photo.
 */
export interface TelegramInlineQueryResultPhoto {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be photo
	 */
	type: 'photo';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid URL of the photo. Photo must be in JPEG format. Photo size must not exceed 5MB
	 */
	photo_url: string;

	/**
	 * URL of the thumbnail for the photo
	 */
	thumbnail_url: string;

	/**
	 * Width of the photo
	 */
	photo_width?: number;

	/**
	 * Height of the photo
	 */
	photo_height?: number;

	/**
	 * Title for the result
	 */
	title?: string;

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Caption of the photo to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the photo caption.
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the photo
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to an animated GIF file.
 */
export interface TelegramInlineQueryResultGif {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be gif
	 */
	type: 'gif';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid URL for the GIF file. File size must not exceed 1MB
	 */
	gif_url: string;

	/**
	 * Width of the GIF
	 */
	gif_width?: number;

	/**
	 * Height of the GIF
	 */
	gif_height?: number;

	/**
	 * Duration of the GIF in seconds
	 */
	gif_duration?: number;

	/**
	 * URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
	 */
	thumbnail_url: string;

	/**
	 * MIME type of the thumbnail
	 */
	thumbnail_mime_type?: string;

	/**
	 * Title for the result
	 */
	title?: string;

	/**
	 * Caption of the GIF file to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the GIF animation
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound).
 */
export interface TelegramInlineQueryResultMpeg4Gif {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be mpeg4_gif
	 */
	type: 'mpeg4_gif';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid URL for the MPEG4 file. File size must not exceed 1MB
	 */
	mpeg4_url: string;

	/**
	 * Video width
	 */
	mpeg4_width?: number;

	/**
	 * Video height
	 */
	mpeg4_height?: number;

	/**
	 * Video duration in seconds
	 */
	mpeg4_duration?: number;

	/**
	 * URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
	 */
	thumbnail_url: string;

	/**
	 * MIME type of the thumbnail
	 */
	thumbnail_mime_type?: string;

	/**
	 * Title for the result
	 */
	title?: string;

	/**
	 * Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the video animation
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a video file or an embedded video player.
 */
export interface TelegramInlineQueryResultVideo {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be video
	 */
	type: 'video';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid URL for the embedded video player or video file
	 */
	video_url: string;

	/**
	 * MIME type of the content of the video URL
	 */
	mime_type: string;

	/**
	 * URL of the thumbnail (JPEG only) for the video
	 */
	thumbnail_url: string;

	/**
	 * Title for the result
	 */
	title: string;

	/**
	 * Caption of the video to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the video caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Video width
	 */
	video_width?: number;

	/**
	 * Video height
	 */
	video_height?: number;

	/**
	 * Video duration in seconds
	 */
	video_duration?: number;

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the video
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to an MP3 audio file.
 */
export interface TelegramInlineQueryResultAudio {
	/**
	 * Type of the result, must be audio
	 */
	type: 'audio';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid URL for the audio file
	 */
	audio_url: string;

	/**
	 * Title
	 */
	title: string;

	/**
	 * Caption, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the audio caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Performer
	 */
	performer?: string;

	/**
	 * Audio duration in seconds
	 */
	audio_duration?: number;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the audio
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a voice recording in an .OGG container encoded with OPUS.
 */
export interface TelegramInlineQueryResultVoice {
	/**
	 * Type of the result, must be voice
	 */
	type: 'voice';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid URL for the voice recording
	 */
	voice_url: string;

	/**
	 * Recording title
	 */
	title: string;

	/**
	 * Caption, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the voice message caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Recording duration in seconds
	 */
	voice_duration?: number;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the voice recording
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a file.
 */
export interface TelegramInlineQueryResultDocument {
	/**
	 * Type of the result, must be document
	 */
	type: 'document';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * Title for the result
	 */
	title: string;

	/**
	 * Caption of the document to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the document caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * A valid URL for the file
	 */
	document_url: string;

	/**
	 * MIME type of the content of the file
	 */
	mime_type: 'application/pdf' | 'application/zip';

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the file
	 */
	input_message_content?: TelegramInputMessageContent;

	/**
	 * URL of the thumbnail (JPEG only) for the file
	 */
	thumbnail_url?: string;

	/**
	 * Thumbnail width
	 */
	thumbnail_width?: number;

	/**
	 * Thumbnail height
	 */
	thumbnail_height?: number;
}

/**
 * Represents a location on a map.
 */
export interface TelegramInlineQueryResultLocation {
	/**
	 * Type of the result, must be location
	 */
	type: 'location';

	/**
	 * Unique identifier for this result, 1-64 Bytes
	 */
	id: string;

	/**
	 * Location latitude in degrees
	 */
	latitude: number;

	/**
	 * Location longitude in degrees
	 */
	longitude: number;

	/**
	 * Location title
	 */
	title: string;

	/**
	 * The radius of uncertainty for the location, measured in meters; 0-1500
	 */
	horizontal_accuracy?: number;

	/**
	 * Period in seconds for which the location can be updated
	 */
	live_period?: number;

	/**
	 * For live locations, a direction in which the user is moving, in degrees
	 */
	heading?: number;

	/**
	 * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters
	 */
	proximity_alert_radius?: number;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the location
	 */
	input_message_content?: TelegramInputMessageContent;

	/**
	 * Url of the thumbnail for the result
	 */
	thumbnail_url?: string;

	/**
	 * Thumbnail width
	 */
	thumbnail_width?: number;

	/**
	 * Thumbnail height
	 */
	thumbnail_height?: number;
}

/**
 * Represents a venue.
 */
export interface TelegramInlineQueryResultVenue {
	/**
	 * Type of the result, must be venue
	 */
	type: 'venue';

	/**
	 * Unique identifier for this result, 1-64 Bytes
	 */
	id: string;

	/**
	 * Latitude of the venue location in degrees
	 */
	latitude: number;

	/**
	 * Longitude of the venue location in degrees
	 */
	longitude: number;

	/**
	 * Title of the venue
	 */
	title: string;

	/**
	 * Address of the venue
	 */
	address: string;

	/**
	 * Foursquare identifier of the venue if known
	 */
	foursquare_id?: string;

	/**
	 * Foursquare type of the venue, if known
	 */
	foursquare_type?: string;

	/**
	 * Google Places identifier of the venue
	 */
	google_place_id?: string;

	/**
	 * Google Places type of the venue
	 */
	google_place_type?: string;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the venue
	 */
	input_message_content?: TelegramInputMessageContent;

	/**
	 * Url of the thumbnail for the result
	 */
	thumbnail_url?: string;

	/**
	 * Thumbnail width
	 */
	thumbnail_width?: number;

	/**
	 * Thumbnail height
	 */
	thumbnail_height?: number;
}

/**
 * Represents a contact with a phone number.
 */
export interface TelegramInlineQueryResultContact {
	/**
	 * Type of the result, must be contact
	 */
	type: 'contact';

	/**
	 * Unique identifier for this result, 1-64 Bytes
	 */
	id: string;

	/**
	 * Contact's phone number
	 */
	phone_number: string;

	/**
	 * Contact's first name
	 */
	first_name: string;

	/**
	 * Contact's last name
	 */
	last_name?: string;

	/**
	 * Additional data about the contact in the form of a vCard
	 */
	vcard?: string;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the contact
	 */
	input_message_content?: TelegramInputMessageContent;

	/**
	 * Url of the thumbnail for the result
	 */
	thumbnail_url?: string;

	/**
	 * Thumbnail width
	 */
	thumbnail_width?: number;

	/**
	 * Thumbnail height
	 */
	thumbnail_height?: number;
}

/**
 * Represents a Game.
 */
export interface TelegramInlineQueryResultGame {
	/**
	 * Type of the result, must be game
	 */
	type: 'game';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * Short name of the game
	 */
	game_short_name: string;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Represents a link to a photo stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedPhoto {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be photo
	 */
	type: 'photo';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier of the photo
	 */
	photo_file_id: string;

	/**
	 * Title for the result
	 */
	title?: string;

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Caption of the photo to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the photo caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the photo
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to an animated GIF file stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedGif {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be gif
	 */
	type: 'gif';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier for the GIF file
	 */
	gif_file_id: string;

	/**
	 * Title for the result
	 */
	title?: string;

	/**
	 * Caption of the GIF file to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the GIF animation
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedMpeg4Gif {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be mpeg4_gif
	 */
	type: 'mpeg4_gif';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier for the MPEG4 file
	 */
	mpeg4_file_id: string;

	/**
	 * Title for the result
	 */
	title?: string;

	/**
	 * Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the video animation
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a sticker stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedSticker {
	/**
	 * Type of the result, must be sticker
	 */
	type: 'sticker';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier of the sticker
	 */
	sticker_file_id: string;

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the sticker
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a file stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedDocument {
	/**
	 * Type of the result, must be document
	 */
	type: 'document';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * Title for the result
	 */
	title: string;

	/**
	 * A valid file identifier for the file
	 */
	document_file_id: string;

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Caption of the document to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the document caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the file
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a video file stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedVideo {
	/**
	 * Optional. True, if the caption must be shown above the message media
	 */
	show_caption_above_media?: true;

	/**
	 * Type of the result, must be video
	 */
	type: 'video';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier for the video file
	 */
	video_file_id: string;

	/**
	 * Title for the result
	 */
	title: string;

	/**
	 * Short description of the result
	 */
	description?: string;

	/**
	 * Caption of the video to be sent, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the video caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the video
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to a voice message stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedVoice {
	/**
	 * Type of the result, must be voice
	 */
	type: 'voice';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier for the voice message
	 */
	voice_file_id: string;

	/**
	 * Voice message title
	 */
	title: string;

	/**
	 * Caption, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the voice message caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the voice message
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * Represents a link to an MP3 audio file stored on the Telegram servers.
 */
export interface TelegramInlineQueryResultCachedAudio {
	/**
	 * Type of the result, must be audio
	 */
	type: 'audio';

	/**
	 * Unique identifier for this result, 1-64 bytes
	 */
	id: string;

	/**
	 * A valid file identifier for the audio file
	 */
	audio_file_id: string;

	/**
	 * Caption, 0-1024 characters after entities parsing
	 */
	caption?: string;

	/**
	 * Mode for parsing entities in the audio caption
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * List of special entities that appear in the caption
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Inline keyboard attached to the message
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;

	/**
	 * Content of the message to be sent instead of the audio
	 */
	input_message_content?: TelegramInputMessageContent;
}

/**
 * This object represents the content of a message to be sent as a result of an inline query.
 */
export type TelegramInputMessageContent = TelegramInputTextMessageContent | TelegramInputLocationMessageContent | TelegramInputVenueMessageContent | TelegramInputContactMessageContent | TelegramInputInvoiceMessageContent;

/**
 * Represents the content of a text message to be sent as the result of an inline query.
 */
export interface TelegramInputTextMessageContent {
	/**
	 * Text of the message to be sent, 1-4096 characters.
	 */
	message_text: string;
	/**
	 * Optional. Mode for parsing entities in the message text. See formatting options for more details.
	 */
	parse_mode?: TelegramParseMode;
	/**
	 * Optional. List of special entities that appear in message text, which can be specified instead of parse_mode.
	 */
	entities?: TelegramMessageEntity[];
	/**
	 * Optional. Link preview generation options for the message.
	 */
	link_preview_options?: TelegramLinkPreviewOptions;
}

/**
 * Represents the content of a location message to be sent as the result of an inline query.
 */
export interface TelegramInputLocationMessageContent {
	/**
	 * Latitude of the location in degrees.
	 */
	latitude: number;
	/**
	 * Longitude of the location in degrees.
	 */
	longitude: number;
	/**
	 * Optional. The radius of uncertainty for the location, measured in meters; 0-1500.
	 */
	horizontal_accuracy?: number;
	/**
	 * Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
	 */
	live_period?: number;
	/**
	 * Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
	 */
	heading?: number;
	/**
	 * Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
	 */
	proximity_alert_radius?: number;
}

/**
 * Represents the content of a venue message to be sent as the result of an inline query.
 */
export interface TelegramInputVenueMessageContent {
	/**
	 * Latitude of the venue in degrees.
	 */
	latitude: number;
	/**
	 * Longitude of the venue in degrees.
	 */
	longitude: number;
	/**
	 * Name of the venue.
	 */
	title: string;
	/**
	 * Address of the venue.
	 */
	address: string;
	/**
	 * Optional. Foursquare identifier of the venue, if known.
	 */
	foursquare_id?: string;
	/**
	 * Optional. Foursquare type of the venue, if known.
	 */
	foursquare_type?: string;
	/**
	 * Optional. Google Places identifier of the venue.
	 */
	google_place_id?: string;
	/**
	 * Optional. Google Places type of the venue. (See supported types.)
	 */
	google_place_type?: string;
}

/**
 * Represents the content of a contact message to be sent as the result of an inline query.
 */
export interface TelegramInputContactMessageContent {
	/**
	 * Contact's phone number.
	 */
	phone_number: string;
	/**
	 * Contact's first name.
	 */
	first_name: string;
	/**
	 * Optional. Contact's last name.
	 */
	last_name?: string;
	/**
	 * Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes.
	 */
	vcard?: string;
}

/**
 * Represents the content of an invoice message to be sent as the result of an inline query.
 */
export interface TelegramInputInvoiceMessageContent {
	/**
	 * Product name, 1-32 characters.
	 */
	title: string;
	/**
	 * Product description, 1-255 characters.
	 */
	description: string;
	/**
	 * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
	 */
	payload: string;
	/**
	 * Payment provider token, obtained via \@BotFather.
	 */
	provider_token?: string;
	/**
	 * Three-letter ISO 4217 currency code.
	 */
	currency: string;
	/**
	 * Price breakdown, a JSON-serialized list of components.
	 */
	prices: TelegramLabeledPrice[];
	/**
	 * Optional. The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). Defaults to 0.
	 */
	max_tip_amount?: number;
	/**
	 * Optional. A JSON-serialized array of suggested amounts of tip in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified.
	 */
	suggested_tip_amounts?: number[];
	/**
	 * Optional. A JSON-serialized object for data about the invoice, which will be shared with the payment provider.
	 */
	provider_data?: string;
	/**
	 * Optional. URL of the product photo for the invoice.
	 */
	photo_url?: string;
	/**
	 * Optional. Photo size in bytes.
	 */
	photo_size?: number;
	/**
	 * Optional. Photo width.
	 */
	photo_width?: number;
	/**
	 * Optional. Photo height.
	 */
	photo_height?: number;
	/**
	 * Optional. Pass True if you require the user's full name to complete the order.
	 */
	need_name?: boolean;
	/**
	 * Optional. Pass True if you require the user's phone number to complete the order.
	 */
	need_phone_number?: boolean;
	/**
	 * Optional. Pass True if you require the user's email address to complete the order.
	 */
	need_email?: boolean;
	/**
	 * Optional. Pass True if you require the user's shipping address to complete the order.
	 */
	need_shipping_address?: boolean;
	/**
	 * Optional. Pass True if the user's phone number should be sent to provider.
	 */
	send_phone_number_to_provider?: boolean;
	/**
	 * Optional. Pass True if the user's email address should be sent to provider.
	 */
	send_email_to_provider?: boolean;
	/**
	 * Optional. Pass True if the final price depends on the shipping method.
	 */
	is_flexible?: boolean;
}

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 */
export interface TelegramChosenInlineResult {
	/**
	 * The unique identifier for the result that was chosen.
	 */
	result_id: string;
	/**
	 * The user that chose the result.
	 */
	from: TelegramUser;
	/**
	 * Sender location, only for bots that require user location.
	 */
	location?: TelegramLocation;
	/**
	 * Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message.
	 * Will be also received in callback queries and can be used to edit the message.
	 */
	inline_message_id?: string;
	/**
	 * The query that was used to obtain the result.
	 */
	query: string;
}

/**
 * Describes an inline message sent by a Web App on behalf of a user.
 */
export interface TelegramSentWebAppMessage {
	/**
	 * Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message.
	 */
	inline_message_id?: string;
}

/**
 * Use this method to send invoices. On success, the sent Message is returned.
 */
export interface TelegramSendInvoiceParams {
	/**
	 * Unique identifier of the message effect to be added to the message; for private chats only
	 */
	message_effect_id?: string;

	/**
	 * Unique identifier for the target chat or username of the target channel (in the format \@channelusername).
	 */
	chat_id: number | string;
	/**
	 * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 */
	message_thread_id?: number;
	/**
	 * Product name, 1-32 characters.
	 */
	title: string;
	/**
	 * Product description, 1-255 characters.
	 */
	description: string;
	/**
	 * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
	 */
	payload: string;
	/**
	 * Payment provider token, obtained via \@BotFather.
	 */
	provider_token?: string;
	/**
	 * Three-letter ISO 4217 currency code, see more on currencies.
	 */
	currency: string;
	/**
	 * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.).
	 */
	prices: TelegramLabeledPrice[];
	/**
	 * The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). Defaults to 0.
	 */
	max_tip_amount?: number;
	/**
	 * A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified.
	 */
	suggested_tip_amounts?: number[];
	/**
	 * Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter.
	 */
	start_parameter?: string;
	/**
	 * JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
	 */
	provider_data?: string;
	/**
	 * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for.
	 */
	photo_url?: string;
	/**
	 * Photo size in bytes.
	 */
	photo_size?: number;
	/**
	 * Photo width.
	 */
	photo_width?: number;
	/**
	 * Photo height.
	 */
	photo_height?: number;
	/**
	 * Pass True if you require the user's full name to complete the order.
	 */
	need_name?: boolean;
	/**
	 * Pass True if you require the user's phone number to complete the order.
	 */
	need_phone_number?: boolean;
	/**
	 * Pass True if you require the user's email address to complete the order.
	 */
	need_email?: boolean;
	/**
	 * Pass True if you require the user's shipping address to complete the order.
	 */
	need_shipping_address?: boolean;
	/**
	 * Pass True if the user's phone number should be sent to provider.
	 */
	send_phone_number_to_provider?: boolean;
	/**
	 * Pass True if the user's email address should be sent to provider.
	 */
	send_email_to_provider?: boolean;
	/**
	 * Pass True if the final price depends on the shipping method.
	 */
	is_flexible?: boolean;
	/**
	 * Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;
	/**
	 * Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;
	/**
	 * Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;
	/**
	 * A JSON-serialized object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button.
	 */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * Use this method to create a link for an invoice. Returns the created invoice link as String on success.
 */
export interface TelegramCreateInvoiceLinkParams {
	/**
	 * Product name, 1-32 characters.
	 */
	title: string;
	/**
	 * Product description, 1-255 characters.
	 */
	description: string;
	/**
	 * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
	 */
	payload: string;
	/**
	 * Payment provider token, obtained via BotFather.
	 */
	provider_token?: string;
	/**
	 * Three-letter ISO 4217 currency code, see more on currencies.
	 */
	currency: string;
	/**
	 * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.).
	 */
	prices: TelegramLabeledPrice[];
	/**
	 * The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). Defaults to 0.
	 */
	max_tip_amount?: number;
	/**
	 * A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount.
	 */
	suggested_tip_amounts?: number[];
	/**
	 * JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
	 */
	provider_data?: string;
	/**
	 * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
	 */
	photo_url?: string;
	/**
	 * Photo size in bytes.
	 */
	photo_size?: number;
	/**
	 * Photo width.
	 */
	photo_width?: number;
	/**
	 * Photo height.
	 */
	photo_height?: number;
	/**
	 * Pass True if you require the user's full name to complete the order.
	 */
	need_name?: boolean;
	/**
	 * Pass True if you require the user's phone number to complete the order.
	 */
	need_phone_number?: boolean;
	/**
	 * Pass True if you require the user's email address to complete the order.
	 */
	need_email?: boolean;
	/**
	 * Pass True if you require the user's shipping address to complete the order.
	 */
	need_shipping_address?: boolean;
	/**
	 * Pass True if the user's phone number should be sent to the provider.
	 */
	send_phone_number_to_provider?: boolean;
	/**
	 * Pass True if the user's email address should be sent to the provider.
	 */
	send_email_to_provider?: boolean;
	/**
	 * Pass True if the final price depends on the shipping method.
	 */
	is_flexible?: boolean;
}

/**
 * Use this method to reply to shipping queries. On success, True is returned.
 */
export interface TelegramAnswerShippingQueryParams {
	/**
	 * Unique identifier for the query to be answered.
	 */
	shipping_query_id: string;
	/**
	 * Pass True if delivery to the specified address is possible and False if there are any problems.
	 */
	ok: boolean;
	/**
	 * Required if ok is True. A JSON-serialized array of available shipping options.
	 */
	shipping_options?: TelegramShippingOption[];
	/**
	 * Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order.
	 */
	error_message?: string;
}

/**
 * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned.
 */
export interface TelegramAnswerPreCheckoutQueryParams {
	/**
	 * Unique identifier for the query to be answered.
	 */
	pre_checkout_query_id: string;
	/**
	 * Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
	 */
	ok: boolean;
	/**
	 * Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout.
	 */
	error_message?: string;
}

/**
 * This object represents a portion of the price for goods or services.
 */
export interface TelegramLabeledPrice {
	/**
	 * Portion label.
	 */
	label: string;
	/**
	 * Price of the product in the smallest units of the currency (integer, not float/double).
	 */
	amount: number;
}

/**
 * This object contains basic information about an invoice.
 */
export interface TelegramInvoice {
	/**
	 * Product name.
	 */
	title: string;
	/**
	 * Product description.
	 */
	description: string;
	/**
	 * Unique bot deep-linking parameter that can be used to generate this invoice.
	 */
	start_parameter: string;
	/**
	 * Three-letter ISO 4217 currency code.
	 */
	currency: string;
	/**
	 * Total price in the smallest units of the currency (integer, not float/double).
	 */
	total_amount: number;
}

/**
 * This object represents a shipping address.
 */
export interface TelegramShippingAddress {
	/**
	 * Two-letter ISO 3166-1 alpha-2 country code.
	 */
	country_code: string;
	/**
	 * State, if applicable.
	 */
	state: string;
	/**
	 * City.
	 */
	city: string;
	/**
	 * First line for the address.
	 */
	street_line1: string;
	/**
	 * Second line for the address.
	 */
	street_line2: string;
	/**
	 * Address post code.
	 */
	post_code: string;
}

/**
 * This object represents information about an order.
 */
export interface TelegramOrderInfo {
	/**
	 * Optional. User name.
	 */
	name?: string;
	/**
	 * Optional. User's phone number.
	 */
	phone_number?: string;
	/**
	 * Optional. User email.
	 */
	email?: string;
	/**
	 * Optional. User shipping address.
	 */
	shipping_address?: TelegramShippingAddress;
}

/**
 * This object represents one shipping option.
 */
export interface TelegramShippingOption {
	/**
	 * Shipping option identifier.
	 */
	id: string;
	/**
	 * Option title.
	 */
	title: string;
	/**
	 * List of price portions.
	 */
	prices: TelegramLabeledPrice[];
}

/**
 * This object contains basic information about a successful payment.
 */
export interface TelegramSuccessfulPayment {
	/**
	 * Three-letter ISO 4217 currency code.
	 */
	currency: string;
	/**
	 * Total price in the smallest units of the currency (integer, not float/double).
	 */
	total_amount: number;
	/**
	 * Bot specified invoice payload.
	 */
	invoice_payload: string;
	/**
	 * Optional. Identifier of the shipping option chosen by the user.
	 */
	shipping_option_id?: string;
	/**
	 * Optional. Order information provided by the user.
	 */
	order_info?: TelegramOrderInfo;
	/**
	 * Telegram payment identifier.
	 */
	telegram_payment_charge_id: string;
	/**
	 * Provider payment identifier.
	 */
	provider_payment_charge_id: string;
}

/**
 * This object contains information about an incoming shipping query.
 */
export interface TelegramShippingQuery {
	/**
	 * Unique query identifier.
	 */
	id: string;
	/**
	 * User who sent the query.
	 */
	from: TelegramUser;
	/**
	 * Bot specified invoice payload.
	 */
	invoice_payload: string;
	/**
	 * User specified shipping address.
	 */
	shipping_address: TelegramShippingAddress;
}

/**
 * This object contains information about an incoming pre-checkout query.
 */
export interface TelegramPreCheckoutQuery {
	/**
	 * Unique query identifier.
	 */
	id: string;
	/**
	 * User who sent the query.
	 */
	from: TelegramUser;
	/**
	 * Three-letter ISO 4217 currency code.
	 */
	currency: string;
	/**
	 * Total price in the smallest units of the currency (integer, not float/double).
	 */
	total_amount: number;
	/**
	 * Bot specified invoice payload.
	 */
	invoice_payload: string;
	/**
	 * Optional. Identifier of the shipping option chosen by the user.
	 */
	shipping_option_id?: string;
	/**
	 * Optional. Order information provided by the user.
	 */
	order_info?: TelegramOrderInfo;
}

/**
 * Describes Telegram Passport data shared with the bot by the user.
 */
export interface TelegramPassportData {
	/**
	 * Array with information about documents and other Telegram Passport elements that was shared with the bot.
	 */
	data: TelegramEncryptedPassportElement[];
	/**
	 * Encrypted credentials required to decrypt the data.
	 */
	credentials: TelegramEncryptedCredentials;
}

/**
 * This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB.
 */
export interface TelegramPassportFile {
	/**
	 * Identifier for this file, which can be used to download or reuse the file.
	 */
	file_id: string;
	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
	 */
	file_unique_id: string;
	/**
	 * File size in bytes.
	 */
	file_size: number;
	/**
	 * Unix time when the file was uploaded.
	 */
	file_date: number;
}

/**
 * Describes documents or other Telegram Passport elements shared with the bot by the user.
 */
export interface TelegramEncryptedPassportElement {
	/**
	 * Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”.
	 */
	type: string;
	/**
	 * Optional. Base64-encoded encrypted Telegram Passport element data provided by the user; available only for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials.
	 */
	data?: string;
	/**
	 * Optional. User's verified phone number; available only for “phone_number” type.
	 */
	phone_number?: string;
	/**
	 * Optional. User's verified email address; available only for “email” type.
	 */
	email?: string;
	/**
	 * Optional. Array of encrypted files with documents provided by the user; available only for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
	 */
	files?: TelegramPassportFile[];
	/**
	 * Optional. Encrypted file with the front side of the document, provided by the user; available only for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
	 */
	front_side?: TelegramPassportFile;
	/**
	 * Optional. Encrypted file with the reverse side of the document, provided by the user; available only for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
	 */
	reverse_side?: TelegramPassportFile;
	/**
	 * Optional. Encrypted file with the selfie of the user holding a document, provided by the user; available if requested for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
	 */
	selfie?: TelegramPassportFile;
	/**
	 * Optional. Array of encrypted files with translated versions of documents provided by the user; available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
	 */
	translation?: TelegramPassportFile[];
	/**
	 * Base64-encoded element hash for using in PassportElementErrorUnspecified.
	 */
	hash: string;
}

/**
 * Describes data required for decrypting and authenticating EncryptedPassportElement.
 */
export interface TelegramEncryptedCredentials {
	/**
	 * Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication.
	 */
	data: string;
	/**
	 * Base64-encoded data hash for data authentication.
	 */
	hash: string;
	/**
	 * Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption.
	 */
	secret: string;
}

/**
 * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
 *
 * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
 */
export interface TelegramSetPassportDataErrors {
	/**
	 * User identifier.
	 */
	user_id: number;
	/**
	 * A JSON-serialized array describing the errors.
	 */
	errors: TelegramPassportElementError[];
}

/**
 * This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of:
 * - PassportElementErrorDataField
 * - PassportElementErrorFrontSide
 * - PassportElementErrorReverseSide
 * - PassportElementErrorSelfie
 * - PassportElementErrorFile
 * - PassportElementErrorFiles
 * - PassportElementErrorTranslationFile
 * - PassportElementErrorTranslationFiles
 * - PassportElementErrorUnspecified
 */
export type TelegramPassportElementError = TelegramPassportElementErrorDataField | TelegramPassportElementErrorFrontSide | TelegramPassportElementErrorReverseSide | TelegramPassportElementErrorSelfie | TelegramPassportElementErrorFile | TelegramPassportElementErrorFiles | TelegramPassportElementErrorTranslationFile | TelegramPassportElementErrorTranslationFiles | TelegramPassportElementErrorUnspecified;

/**
 * Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes.
 */
export interface TelegramPassportElementErrorDataField {
	/**
	 * Error source, must be data.
	 */
	source: 'data';
	/**
	 * The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”.
	 */
	type: 'personal_details' | 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'address';
	/**
	 * Name of the data field which has the error.
	 */
	field_name: string;
	/**
	 * Base64-encoded data hash.
	 */
	data_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes.
 */
export interface TelegramPassportElementErrorFrontSide {
	/**
	 * Error source, must be front_side.
	 */
	source: 'front_side';
	/**
	 * The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”.
	 */
	type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport';
	/**
	 * Base64-encoded hash of the file with the front side of the document.
	 */
	file_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with the reverse side of a document. The error is considered resolved when the file with the reverse side of the document changes.
 */
export interface TelegramPassportElementErrorReverseSide {
	/**
	 * Error source, must be reverse_side.
	 */
	source: 'reverse_side';
	/**
	 * The section of the user's Telegram Passport which has the issue, one of “driver_license”, “identity_card”.
	 */
	type: 'driver_license' | 'identity_card';
	/**
	 * Base64-encoded hash of the file with the reverse side of the document.
	 */
	file_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with a selfie with a document. The error is considered resolved when the file with the selfie changes.
 */
export interface TelegramPassportElementErrorSelfie {
	/**
	 * Error source, must be selfie.
	 */
	source: 'selfie';
	/**
	 * The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”.
	 */
	type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport';
	/**
	 * Base64-encoded hash of the file with the selfie.
	 */
	file_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes.
 */
export interface TelegramPassportElementErrorFile {
	/**
	 * Error source, must be file.
	 */
	source: 'file';
	/**
	 * The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”.
	 */
	type: 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
	/**
	 * Base64-encoded file hash.
	 */
	file_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes.
 */
export interface TelegramPassportElementErrorFiles {
	/**
	 * Error source, must be files.
	 */
	source: 'files';
	/**
	 * The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”.
	 */
	type: 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
	/**
	 * List of base64-encoded file hashes.
	 */
	file_hashes: string[];
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes.
 */
export interface TelegramPassportElementErrorTranslationFile {
	/**
	 * Error source, must be translation_file.
	 */
	source: 'translation_file';
	/**
	 * Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”.
	 */
	type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
	/**
	 * Base64-encoded file hash.
	 */
	file_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change.
 */
export interface TelegramPassportElementErrorTranslationFiles {
	/**
	 * Error source, must be translation_files.
	 */
	source: 'translation_files';
	/**
	 * Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”.
	 */
	type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
	/**
	 * List of base64-encoded file hashes.
	 */
	file_hashes: string[];
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents an issue in an unspecified place. The error is considered resolved when new data is added.
 */
export interface TelegramPassportElementErrorUnspecified {
	/**
	 * Error source, must be unspecified.
	 */
	source: 'unspecified';
	/**
	 * Type of element of the user's Telegram Passport which has the issue.
	 */
	type: string;
	/**
	 * Base64-encoded element hash.
	 */
	element_hash: string;
	/**
	 * Error message.
	 */
	message: string;
}

/**
 * Represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.
 */
export interface TelegramGame {
	/**
	 * Title of the game.
	 */
	title: string;
	/**
	 * Description of the game.
	 */
	description: string;
	/**
	 * Photo that will be displayed in the game message in chats.
	 */
	photo: TelegramPhotoSize[];
	/**
	 * Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters.
	 */
	text?: string;
	/**
	 * Special entities that appear in text, such as usernames, URLs, bot commands, etc.
	 */
	text_entities?: TelegramMessageEntity[];
	/**
	 * Animation that will be displayed in the game message in chats. Upload via BotFather.
	 */
	animation?: TelegramAnimation;
}

/**
 * Use this method to set the score of the specified user in a game message.
 * On success, if the message is not an inline message, the Message is returned,
 * otherwise True is returned. Returns an error, if the new score is not greater
 * than the user's current score in the chat and force is False.
 */
export interface TelegramSetGameScoreParams {
	/** User identifier */
	user_id: number;
	/** New score, must be non-negative */
	score: number;
	/** Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters */
	force?: boolean;
	/** Pass True if the game message should not be automatically edited to include the current scoreboard */
	disable_edit_message?: boolean;
	/** Unique identifier for the target chat */
	chat_id?: number;
	/** Identifier of the sent message */
	message_id?: number;
	/** Identifier of the inline message */
	inline_message_id?: string;
}

/**
 * Use this method to get data for high score tables. Will return the score of the specified user
 * and several of their neighbors in a game. Returns an Array of GameHighScore objects.
 *
 * This method will currently return scores for the target user, plus two of their closest neighbors
 * on each side. Will also return the top three users if the user and their neighbors are not among them.
 * Please note that this behavior is subject to change.
 */
export interface TelegramGetGameHighScoresParams {
	/** Target user id */
	user_id: number;
	/** Unique identifier for the target chat */
	chat_id?: number;
	/** Identifier of the sent message */
	message_id?: number;
	/** Identifier of the inline message */
	inline_message_id?: string;
}

/**
 * Represents one row of the high scores table for a game.
 */
export interface TelegramGameHighScore {
	/** Position in high score table for the game */
	position: number;
	/** User */
	user: TelegramUser;
	/** Score */
	score: number;
}

/**
 * Interface defining the parameters required to send a game.
 */
export interface TelegramSendGameParams {
	/**Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** Unique identifier of the business connection on behalf of which the message will be sent. */
	business_connection_id?: string;
	/** Unique identifier for the target chat. */
	chat_id: number;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only. */
	message_thread_id?: number;
	/** Short name of the game, serves as the unique identifier for the game. Set up your games via @BotFather. */
	game_short_name: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving. */
	protect_content?: boolean;
	/** Description of the message to reply to. */
	reply_parameters?: TelegramReplyParameters;
	/** A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. Not supported for messages sent on behalf of a business account. */
	reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * This object contains information about one answer option in a poll to send.
 */
export interface TelegramInputPollOption {
	/** Option text, 1-100 characters */
	text: string;

	/** Optional. Mode for parsing entities in the text. See formatting options for more details. Currently, only custom emoji entities are allowed */
	text_parse_mode?: TelegramParseMode;

	/** Optional. A JSON-serialized list of special entities that appear in the poll option text. It can be specified instead of text_parse_mode */
	text_entities?: TelegramMessageEntity[];
}

/** This object describes the type of a background. Currently, it can be one of */
export type TelegramBackgroundType = TelegramBackgroundTypeFill | TelegramBackgroundTypeWallpaper | TelegramBackgroundTypePattern | TelegramBackgroundTypeChatTheme;

/** This object represents a chat background. */
export interface TelegramChatBackground {
	/** Type of the background */
	type: TelegramBackgroundType;
}

export type TelegramBackgroundFill = TelegramBackgroundFillSolid | TelegramBackgroundFillGradient | TelegramBackgroundFillFreeformGradient;

/** The background is filled using the selected color. */
export interface TelegramBackgroundFillSolid {
	/** Type of the background fill, always “solid” */
	type: 'solid';
	/** The color of the background fill in the RGB24 format */
	color: number;
}

/** The background is a gradient fill. */
export interface TelegramBackgroundFillGradient {
	/** Type of the background fill, always “gradient” */
	type: 'gradient';
	/** Top color of the gradient in the RGB24 format */
	top_color: number;
	/** Bottom color of the gradient in the RGB24 format */
	bottom_color: number;
	/** Clockwise rotation angle of the background fill in degrees; 0-359 */
	rotation_angle: number;
}

/** The background is a freeform gradient that rotates after every message in the chat. */
export interface TelegramBackgroundFillFreeformGradient {
	/** Type of the background fill, always “freeform_gradient” */
	type: 'freeform_gradient';
	/** A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format */
	colors: number[];
}

/** The background is automatically filled based on the selected colors. */
export interface TelegramBackgroundTypeFill {
	/** Type of the background, always “fill” */
	type: 'fill';
	/** The background fill */
	fill: TelegramBackgroundFill;
	/** Dimming of the background in dark themes, as a percentage; 0-100 */
	dark_theme_dimming: number;
}

/** The background is a wallpaper in the JPEG format. */
export interface TelegramBackgroundTypeWallpaper {
	/** Type of the background, always “wallpaper” */
	type: 'wallpaper';
	/** Document with the wallpaper */
	document: TelegramDocument;
	/** Dimming of the background in dark themes, as a percentage; 0-100 */
	dark_theme_dimming: number;
	/** Optional. True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12 */
	is_blurred?: boolean;
	/** Optional. True, if the background moves slightly when the device is tilted */
	is_moving?: boolean;
}

/** The background is a PNG or TGV (gzipped subset of SVG with MIME type “application/x-tgwallpattern”) pattern to be combined with the background fill chosen by the user. */
export interface TelegramBackgroundTypePattern {
	/** Type of the background, always “pattern” */
	type: 'pattern';
	/** Document with the pattern */
	document: TelegramDocument;
	/** The background fill that is combined with the pattern */
	fill: TelegramBackgroundFill;
	/** Intensity of the pattern when it is shown above the filled background; 0-100 */
	intensity: number;
	/**	Optional. True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only */
	is_inverted?: boolean;
	/**	Optional. True, if the background moves slightly when the device is tilted */
	is_moving?: boolean;
}

/** The background is taken directly from a built-in chat theme. */
export interface TelegramBackgroundTypeChatTheme {
	/** Type of the background, always “chat_theme” */
	type: 'chat_theme';
	/** Name of the chat theme, which is usually an emoji */
	theme_name: string;
}

/**
 * Use this method to refund a successful payment in Telegram Stars.
 * Returns True on success.
 */
export interface TelegramRefundStarPaymentParams {
	/**
	 * Identifier of the user whose payment will be refunded.
	 */
	user_id: number;

	/**
	 * Telegram payment identifier.
	 */
	telegram_payment_charge_id: string;
}

/**
 * Contains a list of Telegram Star transactions.
 */
export interface TelegramStarTransactions {
	/**
	 * The list of transactions.
	 */
	transactions: TelegramStarTransaction[];
}

/**
 * Describes a Telegram Star transaction.
 */
export interface TelegramStarTransaction {
	/**
	 * Unique identifier of the transaction.
	 * Coincides with the identifier of the original transaction for refund transactions.
	 * Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users.
	 */
	id: string;

	/**
	 * Number of Telegram Stars transferred by the transaction.
	 */
	amount: number;

	/**
	 * Date the transaction was created in Unix time.
	 */
	date: number;

	/**
	 * Optional. Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal).
	 * Only for incoming transactions.
	 */
	source?: TelegramTransactionPartner;

	/**
	 * Optional. Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal).
	 * Only for outgoing transactions.
	 */
	receiver?: TelegramTransactionPartner;
}

/**
 * This object describes the source of a transaction, or its recipient for outgoing transactions.
 * Currently, it can be one of: TelegramTransactionPartnerUser, TelegramTransactionPartnerFragment,
 * TelegramTransactionPartnerTelegramAds, TelegramTransactionPartnerOther.
 */
export type TelegramTransactionPartner = TelegramTransactionPartnerUser | TelegramTransactionPartnerFragment | TelegramTransactionPartnerTelegramAds | TelegramTransactionPartnerOther;

/**
 * Describes a transaction with a user.
 */
export interface TelegramTransactionPartnerUser {
	/**
	 * Type of the transaction partner, always "user".
	 */
	type: 'user';

	/**
	 * Information about the user.
	 */
	user: TelegramUser;

	/**
	 * Optional. Bot-specified invoice payload.
	 */
	invoice_payload?: string;
}

/**
 * Describes a withdrawal transaction with Fragment.
 */
export interface TelegramTransactionPartnerFragment {
	/**
	 * Type of the transaction partner, always "fragment".
	 */
	type: 'fragment';

	/**
	 * Optional. State of the transaction if the transaction is outgoing.
	 */
	withdrawal_state?: TelegramRevenueWithdrawalState;
}

/**
 * Describes a withdrawal transaction to the Telegram Ads platform.
 */
export interface TelegramTransactionPartnerTelegramAds {
	/**
	 * Type of the transaction partner, always "telegram_ads".
	 */
	type: 'telegram_ads';
}

/**
 * Describes a transaction with an unknown source or recipient.
 */
export interface TelegramTransactionPartnerOther {
	/**
	 * Type of the transaction partner, always "other".
	 */
	type: 'other';
}

/**
 * Describes the state of a revenue withdrawal operation.
 * Currently, it can be one of: TelegramRevenueWithdrawalStatePending,
 * TelegramRevenueWithdrawalStateSucceeded, TelegramRevenueWithdrawalStateFailed.
 */
export type TelegramRevenueWithdrawalState = TelegramRevenueWithdrawalStatePending | TelegramRevenueWithdrawalStateSucceeded | TelegramRevenueWithdrawalStateFailed;

/**
 * The withdrawal is in progress.
 */
export interface TelegramRevenueWithdrawalStatePending {
	/**
	 * Type of the state, always "pending".
	 */
	type: 'pending';
}

/**
 * The withdrawal succeeded.
 */
export interface TelegramRevenueWithdrawalStateSucceeded {
	/**
	 * Type of the state, always "succeeded".
	 */
	type: 'succeeded';

	/**
	 * Date the withdrawal was completed in Unix time.
	 */
	date: number;

	/**
	 * An HTTPS URL that can be used to see transaction details.
	 */
	url: string;
}

/**
 * The withdrawal failed and the transaction was refunded.
 */
export interface TelegramRevenueWithdrawalStateFailed {
	/**
	 * Type of the state, always "failed".
	 */
	type: 'failed';
}

/**
 * Use this method to get the bot's Telegram Star transactions in chronological order.
 * On success, returns a TelegramStarTransactions object.
 */
export interface TelegramGetStarTransactionsParams {
	/**
	 * Optional. Number of transactions to skip in the response.
	 */
	offset?: number;

	/**
	 * Optional. The maximum number of transactions to be retrieved.
	 * Values between 1-100 are accepted. Defaults to 100.
	 */
	limit?: number;
}

/**
 * Describes paid media. Currently, it can be one of: TelegramPaidMediaPreview,
 * TelegramPaidMediaPhoto, TelegramPaidMediaVideo.
 */
export type TelegramPaidMedia = TelegramPaidMediaPreview | TelegramPaidMediaPhoto | TelegramPaidMediaVideo;

/**
 * The paid media isn't available before the payment.
 */
export interface TelegramPaidMediaPreview {
	/**
	 * Type of the paid media, always "preview".
	 */
	type: 'preview';

	/**
	 * Optional. Media width as defined by the sender.
	 */
	width?: number;

	/**
	 * Optional. Media height as defined by the sender.
	 */
	height?: number;

	/**
	 * Optional. Duration of the media in seconds as defined by the sender.
	 */
	duration?: number;
}

/**
 * The paid media is a photo.
 */
export interface TelegramPaidMediaPhoto {
	/**
	 * Type of the paid media, always "photo".
	 */
	type: 'photo';

	/**
	 * The photo.
	 */
	photo: TelegramPhotoSize[];
}

/**
 * The paid media is a video.
 */
export interface TelegramPaidMediaVideo {
	/**
	 * Type of the paid media, always "video".
	 */
	type: 'video';

	/**
	 * The video.
	 */
	video: TelegramVideo;
}

/**
 * Describes the paid media added to a message.
 */
export interface TelegramPaidMediaInfo {
	/**
	 * The number of Telegram Stars that must be paid to buy access to the media.
	 */
	star_count: number;

	/**
	 * Information about the paid media.
	 */
	paid_media: TelegramPaidMedia[];
}

/**
 * The paid media isn't available before the payment.
 */
export interface TelegramPaidMediaPreview {
	/**
	 * Type of the paid media, always "preview".
	 */
	type: 'preview';

	/**
	 * Optional. Media width as defined by the sender.
	 */
	width?: number;

	/**
	 * Optional. Media height as defined by the sender.
	 */
	height?: number;

	/**
	 * Optional. Duration of the media in seconds as defined by the sender.
	 */
	duration?: number;
}

/**
 * The paid media is a photo.
 */
export interface TelegramPaidMediaPhoto {
	/**
	 * Type of the paid media, always "photo".
	 */
	type: 'photo';

	/**
	 * The photo.
	 */
	photo: TelegramPhotoSize[];
}

/**
 * The paid media is a video.
 */
export interface TelegramPaidMediaVideo {
	/**
	 * Type of the paid media, always "video".
	 */
	type: 'video';

	/**
	 * The video.
	 */
	video: TelegramVideo;
}

/**
 * Use this method to send paid media to channel chats. On success, the sent Message is returned.
 */
export interface TelegramSendPaidMediaParams {
	/**
	 * Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 */
	chat_id: number | string;

	/**
	 * The number of Telegram Stars that must be paid to buy access to the media.
	 */
	star_count: number;

	/**
	 * A JSON-serialized array describing the media to be sent; up to 10 items.
	 */
	media: TelegramInputPaidMedia[];

	/**
	 * Optional. Media caption, 0-1024 characters after entities parsing.
	 */
	caption?: string;

	/**
	 * Optional. Mode for parsing entities in the media caption. See formatting options for more details.
	 * Values: "Markdown", "HTML", "MarkdownV2".
	 */
	parse_mode?: TelegramParseMode;

	/**
	 * Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 */
	caption_entities?: TelegramMessageEntity[];

	/**
	 * Optional. Pass True, if the caption must be shown above the message media.
	 */
	show_caption_above_media?: boolean;

	/**
	 * Optional. Sends the message silently. Users will receive a notification with no sound.
	 */
	disable_notification?: boolean;

	/**
	 * Optional. Protects the contents of the sent message from forwarding and saving.
	 */
	protect_content?: boolean;

	/**
	 * Optional. Description of the message to reply to.
	 */
	reply_parameters?: TelegramReplyParameters;

	/**
	 * Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove a reply keyboard or to force a reply from the user.
	 */
	reply_markup?: TelegramReplyMarkup;
}

/**
 * Describes the paid media to be sent. Currently, it can be one of:
 * TelegramInputPaidMediaPhoto, TelegramInputPaidMediaVideo.
 */
export type TelegramInputPaidMedia = TelegramInputPaidMediaPhoto | TelegramInputPaidMediaVideo;

/**
 * The paid media to send is a photo.
 */
export interface TelegramInputPaidMediaPhoto {
	/**
	 * Type of the media, must be "photo".
	 */
	type: 'photo';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>"
	 * to upload a new one using multipart/form-data under <file_attach_name> name.
	 */
	media: string;
}

/**
 * The paid media to send is a video.
 */
export interface TelegramInputPaidMediaVideo {
	/**
	 * Type of the media, must be "video".
	 */
	type: 'video';

	/**
	 * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended),
	 * pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>"
	 * to upload a new one using multipart/form-data under <file_attach_name> name.
	 */
	media: string;

	/**
	 * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 */
	thumbnail?: TelegramInputFile | string;

	/**
	 * Optional. Video width.
	 */
	width?: number;

	/**
	 * Optional. Video height.
	 */
	height?: number;

	/**
	 * Optional. Video duration in seconds.
	 */
	duration?: number;

	/**
	 * Optional. Pass True if the uploaded video is suitable for streaming.
	 */
	supports_streaming?: boolean;
}

/**
 * Describes a withdrawal transaction to the Telegram Ads platform.
 */
export interface TelegramTransactionPartnerTelegramAds {
	/**
	 * Type of the transaction partner, always "telegram_ads".
	 */
	type: 'telegram_ads';
}

/**
 * Describes a transaction with a user.
 */
export interface TelegramTransactionPartnerUser {
	/**
	 * Type of the transaction partner, always "user".
	 */
	type: 'user';

	/**
	 * Information about the user.
	 */
	user: TelegramUser;

	/**
	 * Optional. Bot-specified invoice payload.
	 */
	invoice_payload?: string;
}

/**
 * Contains basic information about a refunded payment.
 */
export interface TelegramRefundedPayment {
	/**
	 * Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars.
	 * Currently, always "XTR".
	 */
	currency: 'XTR';

	/**
	 * Total refunded price in the smallest units of the currency (integer, not float/double).
	 * For example, for a price of US$ 1.45, total_amount = 145.
	 * See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
	 */
	total_amount: number;

	/**
	 * Bot-specified invoice payload.
	 */
	invoice_payload: string;

	/**
	 * Telegram payment identifier.
	 */
	telegram_payment_charge_id: string;

	/**
	 * Optional. Provider payment identifier.
	 */
	provider_payment_charge_id?: string;
}
