import { BotContext, ContextManager, TelegramAddStickerToSetParams, TelegramAnswerCallbackQueryParams, TelegramAnswerInlineQueryParams, TelegramAnswerPreCheckoutQueryParams, TelegramAnswerShippingQueryParams, TelegramAnswerWebAppQueryParams, TelegramApproveChatJoinRequestParams, TelegramBanChatMemberParams, TelegramBanChatSenderChatParams, TelegramBotCommand, TelegramBotDescription, TelegramBotName, TelegramBotShortDescription, TelegramBusinessConnection, TelegramChat, TelegramChatAdministratorRights, TelegramChatInviteLink, TelegramChatMember, TelegramCloseForumTopicParams, TelegramCloseGeneralForumTopicParams, TelegramCopyMessageParams, TelegramCopyMessagesParams, TelegramCreateChatInviteLinkParams, TelegramCreateForumTopicParams, TelegramCreateInvoiceLinkParams, TelegramCreateNewStickerSetParams, TelegramDeclineChatJoinRequestParams, TelegramDeleteChatPhotoParams, TelegramDeleteChatStickerSetParams, TelegramDeleteForumTopicParams, TelegramDeleteMessageParams, TelegramDeleteMessagesParams, TelegramDeleteMyCommandsParams, TelegramDeleteStickerFromSetParams, TelegramDeleteStickerSetParams, TelegramDeleteWebhookParams, TelegramEditChatInviteLinkParams, TelegramEditForumTopicParams, TelegramEditGeneralForumTopicParams, TelegramEditMessageCaptionParams, TelegramEditMessageLiveLocationParams, TelegramEditMessageMediaParams, TelegramEditMessageReplyMarkupParams, TelegramEditMessageTextParams, TelegramExportChatInviteLinkParams, TelegramFile, TelegramForumTopic, TelegramForwardMessageParams, TelegramForwardMessagesParams, TelegramGameHighScore, TelegramGetChatAdministratorsParams, TelegramGetChatMemberCountParams, TelegramGetChatMemberParams, TelegramGetChatMenuButtonParams, TelegramGetChatParams, TelegramGetCustomEmojiStickersParams, TelegramGetFileParams, TelegramGetGameHighScoresParams, TelegramGetMyCommandsParams, TelegramGetMyDefaultAdministratorRightsParams, TelegramGetMyDescriptionParams, TelegramGetMyNameParams, TelegramGetMyShortDescriptionParams, TelegramGetStarTransactionsParams, TelegramGetStickerSetParams, TelegramGetUpdatesParams, TelegramGetUserChatBoostsParams, TelegramGetUserProfilePhotosParams, TelegramHideGeneralForumTopicParams, TelegramLeaveChatParams, TelegramMenuButton, TelegramMessage, TelegramMessageId, TelegramPinChatMessageParams, TelegramPoll, TelegramPromoteChatMemberParams, TelegramRefundStarPaymentParams, TelegramReopenForumTopicParams, TelegramReopenGeneralForumTopicParams, TelegramReplaceStickerInSetParams, TelegramRestrictChatMemberParams, TelegramRevokeChatInviteLinkParams, TelegramSendAnimationParams, TelegramSendAudioParams, TelegramSendChatActionParams, TelegramSendContactParams, TelegramSendDiceParams, TelegramSendDocumentParams, TelegramSendGameParams, TelegramSendInvoiceParams, TelegramSendLocationParams, TelegramSendMediaGroupParams, TelegramSendMessageParams, TelegramSendPaidMediaParams, TelegramSendPhotoParams, TelegramSendPollParams, TelegramSendStickerParams, TelegramSendVenueParams, TelegramSendVideoNoteParams, TelegramSendVideoParams, TelegramSendVoiceParams, TelegramSentWebAppMessage, TelegramSetChatAdministratorCustomTitleParams, TelegramSetChatDescriptionParams, TelegramSetChatMenuButtonParams, TelegramSetChatPermissionsParams, TelegramSetChatPhotoParams, TelegramSetChatStickerSetParams, TelegramSetChatTitleParams, TelegramSetCustomEmojiStickerSetThumbnailParams, TelegramSetGameScoreParams, TelegramSetMessageReactionParams, TelegramSetMyCommandsParams, TelegramSetMyDefaultAdministratorRightsParams, TelegramSetMyDescriptionParams, TelegramSetMyNameParams, TelegramSetMyShortDescriptionParams, TelegramSetStickerEmojiListParams, TelegramSetStickerKeywordsParams, TelegramSetStickerMaskPositionParams, TelegramSetStickerPositionInSetParams, TelegramSetStickerSetThumbnailParams, TelegramSetStickerSetTitleParams, TelegramSetWebhookParams, TelegramStarTransaction, TelegramStarTransactions, TelegramSticker, TelegramStickerSet, TelegramStopMessageLiveLocationParams, TelegramStopPollParams, TelegramUnbanChatMemberParams, TelegramUnbanChatSenderChatParams, TelegramUnhideGeneralForumTopicParams, TelegramUnpinAllChatMessagesParams, TelegramUnpinAllForumTopicMessagesParams, TelegramUnpinAllGeneralForumTopicMessagesParams, TelegramUnpinChatMessageParams, TelegramUpdate, TelegramUpdateType, TelegramUploadStickerFileParams, TelegramUserProfilePhotos, TelegramWebhookInfo, UpdateContext } from '..';
import { ApiWorker } from './API.worker';

/**
 * Class representing an API client for making requests to the Telegram Bot API.
 */
export class API extends ApiWorker {
	/**
	 * Use this method to receive incoming updates using long polling.
	 * Returns an array of Update objects.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getupdates)
	 */
	public async getUpdates(params?: TelegramGetUpdatesParams): Promise<UpdateContext[]> {
		const data = await this.call('getUpdates', params);
		return data.map((update: TelegramUpdate) => ContextManager.getContext('Update', { client: this.client, source: update }));
	}

	/**
	 * Use this method to specify a URL and receive incoming updates via an outgoing webhook.
	 * Whenever there is an update for the bot, Telegram will send an HTTPS POST request to the specified URL,
	 * containing a JSON-serialized Update. In case of an unsuccessful request, Telegram will give up after a reasonable amount of attempts.
	 *
	 * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token.
	 * If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setwebhook)
	 */
	public setWebhook(params: TelegramSetWebhookParams): Promise<boolean> {
		return this.call('setWebhook', params);
	}

	/**
	 * Use this method to remove webhook integration if you decide to switch back to getUpdates.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletewebhook)
	 */
	public deleteWebhook(params?: TelegramDeleteWebhookParams): Promise<boolean> {
		return this.call('deleteWebhook', params);
	}

	/**
	 * Use this method to get current webhook status.
	 * If the bot is using getUpdates, will return an object with the url field empty.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getwebhookinfo)
	 */
	public getWebhookInfo(): Promise<TelegramWebhookInfo> {
		return this.call('getWebhookInfo');
	}

	/**
	 * A simple method for testing your bot's authentication token.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getme)
	 */
	public getMe(): Promise<BotContext> {
		return this.getContext('getMe', {}, 'Bot');
	}

	/**
	 * Use this method to log out from the cloud Bot API server before launching the bot locally.
	 * You must log out the bot before running it locally, otherwise there is no guarantee that
	 * the bot will receive updates. After a successful call, you can immediately log in on a
	 * local server, but will not be able to log in back to the cloud Bot API server for 10 minutes.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#logout)
	 */
	public logOut(): Promise<boolean> {
		return this.call('logOut');
	}

	/**
	 * Use this method to close the bot instance before moving it from one local server to another.
	 * You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart.
	 * The method will return error 429 in the first 10 minutes after the bot is launched.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#close)
	 */
	public close(): Promise<boolean> {
		return this.call('close');
	}

	/**
	 * Use this method to send text messages.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendmessage)
	 */
	public sendMessage(params: TelegramSendMessageParams): Promise<TelegramMessage> {
		return this.call('sendMessage', params);
	}

	/**
	 * Use this method to forward messages of any kind.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#forwardmessage)
	 */
	public forwardMessage(params: TelegramForwardMessageParams): Promise<TelegramMessage> {
		return this.call('forwardMessage', params);
	}

	/**
	 * Use this method to forward multiple messages of any kind.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#forwardmessages)
	 */
	public forwardMessages(params: TelegramForwardMessagesParams): Promise<TelegramMessageId> {
		// Since an array of MessageId is returned on success, there's no need for getContext
		return this.call('forwardMessages', params);
	}

	/**
	 * Use this method to copy messages of any kind.
	 * Service messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied.
	 * A quiz poll can be copied only if the value of the field correct_option_id is known to the bot.
	 * The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#copymessage)
	 */
	public copyMessage(params: TelegramCopyMessageParams): Promise<TelegramMessageId> {
		// Since a MessageId is returned on success, there's no need for getContext
		return this.call('copyMessage', params);
	}

	/**
	 * Use this method to copy messages of any kind.
	 * If some of the specified messages can't be found or copied, they are skipped.
	 * Service messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied.
	 * A quiz poll can be copied only if the value of the field correct_option_id is known to the bot.
	 * The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message.
	 * Album grouping is kept for copied messages.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#copymessages)
	 */
	public copyMessages(params: TelegramCopyMessagesParams): Promise<TelegramMessageId[]> {
		// Since an array of MessageId is returned on success, there's no need for getContext
		return this.call('copyMessages', params);
	}

	/**
	 * Use this method to send photos.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendphoto)
	 */
	public sendPhoto(params: TelegramSendPhotoParams): Promise<TelegramMessage> {
		return this.call('sendPhoto', params);
	}

	/**
	 * Use this method to send audio files, if you want Telegram clients to display them in the music player.
	 * Your audio must be in the .MP3 or .M4A format.
	 * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendaudio)
	 */
	public sendAudio(params: TelegramSendAudioParams): Promise<TelegramMessage> {
		return this.call('sendAudio', params);
	}

	/**
	 * Use this method to send general files.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#senddocument)
	 */
	public sendDocument(params: TelegramSendDocumentParams): Promise<TelegramMessage> {
		return this.call('sendDocument', params);
	}

	/**
	 * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvideo)
	 */
	public sendVideo(params: TelegramSendVideoParams): Promise<TelegramMessage> {
		return this.call('sendVideo', params);
	}

	/**
	 * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendanimation)
	 */
	public sendAnimation(params: TelegramSendAnimationParams): Promise<TelegramMessage> {
		return this.call('sendAnimation', params);
	}

	/**
	 * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.
	 * For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document).
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvoice)
	 */
	public sendVoice(params: TelegramSendVoiceParams): Promise<TelegramMessage> {
		return this.call('sendVoice', params);
	}

	/**
	 * Use this method to send video messages.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvideonote)
	 */
	public sendVideoNote(params: TelegramSendVideoNoteParams): Promise<TelegramMessage> {
		return this.call('sendVideoNote', params);
	}

	/**
	 * Use this method to send a group of photos, videos, documents, or audios as an album.
	 * Documents and audio files can be only grouped in an album with messages of the same type.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendmediagroup)
	 */
	public sendMediaGroup(params: TelegramSendMediaGroupParams): Promise<TelegramMessage[]> {
		return this.call('sendMediaGroup', params);
	}

	/**
	 * Use this method to send a point on the map.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendlocation)
	 */
	public sendLocation(params: TelegramSendLocationParams): Promise<TelegramMessage> {
		return this.call('sendLocation', params);
	}

	/**
	 * Use this method to send information about a venue.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvenue)
	 */
	public sendVenue(params: TelegramSendVenueParams): Promise<TelegramMessage> {
		return this.call('sendVenue', params);
	}

	/**
	 * Use this method to send phone contacts.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendcontact)
	 */
	public sendContact(params: TelegramSendContactParams): Promise<TelegramMessage> {
		return this.call('sendContact', params);
	}

	/**
	 * Use this method to send a native poll.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendpoll)
	 */
	public sendPoll(params: TelegramSendPollParams): Promise<TelegramMessage> {
		return this.call('sendPoll', params);
	}

	/**
	 * Use this method to send an animated emoji that will display a random value.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#senddice)
	 */
	public sendDice(params: TelegramSendDiceParams): Promise<TelegramMessage> {
		return this.call('sendDice', params);
	}

	/**
	 * Use this method when you need to tell the user that something is happening on the bot's side.
	 * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
	 *
	 * We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendchataction)
	 */
	public sendChatAction(params: TelegramSendChatActionParams): Promise<boolean> {
		return this.call('sendChatAction', params);
	}

	/**
	 * Use this method to change the chosen reactions on a message.
	 * Service messages can't be reacted to.
	 * Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setmessagecontent)
	 */
	public setMessageReaction(params: TelegramSetMessageReactionParams): Promise<boolean> {
		return this.call('setMessageReaction', params);
	}

	/**
	 * Use this method to get a list of profile pictures for a user.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getuserprofilephotos)
	 */
	public getUserProfilePhotos(params: TelegramGetUserProfilePhotosParams): Promise<TelegramUserProfilePhotos> {
		return this.call('getUserProfilePhotos', params);
	}

	/**
	 * Use this method to get basic information about a file and prepare it for downloading.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getfile)
	 */
	public getFile(params: TelegramGetFileParams): Promise<TelegramFile> {
		return this.call('getFile', params);
	}

	/**
	 * Use this method to ban a user in a group, a supergroup, or a channel.
	 * In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#banchatmember)
	 */
	public banChatMember(params: TelegramBanChatMemberParams): Promise<boolean> {
		return this.call('banChatMember', params);
	}

	/**
	 * Use this method to unban a previously banned user in a supergroup or channel.
	 * The user will not return to the group or channel automatically, but will be able to join via link, etc.
	 * The bot must be an administrator for this to work.
	 * By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it.
	 * So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unbanchatmember)
	 */
	public unbanChatMember(params: TelegramUnbanChatMemberParams): Promise<boolean> {
		return this.call('unbanChatMember', params);
	}

	/**
	 * Use this method to restrict a user in a supergroup.
	 * The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights.
	 * Pass True for all permissions to lift restrictions from a user.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#restrictchatmember)
	 */
	public restrictChatMember(params: TelegramRestrictChatMemberParams): Promise<boolean> {
		return this.call('restrictChatMember', params);
	}

	/**
	 * Use this method to promote or demote a user in a supergroup or a channel.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 * Pass False for all boolean parameters to demote a user.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#promotechatmember)
	 */
	public promoteChatMember(params: TelegramPromoteChatMemberParams): Promise<boolean> {
		return this.call('promoteChatMember', params);
	}

	/**
	 * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchatadministratorcustomtitle)
	 */
	public setChatAdministratorCustomTitle(params: TelegramSetChatAdministratorCustomTitleParams): Promise<boolean> {
		return this.call('setChatAdministratorCustomTitle', params);
	}

	/**
	 * Use this method to ban a channel chat in a supergroup or a channel.
	 * Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels.
	 * The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#banchatsenderchat)
	 */
	public banChatSenderChat(params: TelegramBanChatSenderChatParams): Promise<boolean> {
		return this.call('banChatSenderChat', params);
	}

	/**
	 * Use this method to unban a previously banned channel chat in a supergroup or channel.
	 * The bot must be an administrator for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unbanchatsenderchat)
	 */
	public unbanChatSenderChat(params: TelegramUnbanChatSenderChatParams): Promise<boolean> {
		return this.call('unbanChatSenderChat', params);
	}

	/**
	 * Use this method to set default chat permissions for all members.
	 * The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchatpermissions)
	 */
	public setChatPermissions(params: TelegramSetChatPermissionsParams): Promise<boolean> {
		return this.call('setChatPermissions', params);
	}

	/**
	 * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#exportchatinvitelink)
	 */
	public exportChatInviteLink(params: TelegramExportChatInviteLinkParams): Promise<string> {
		return this.call('exportChatInviteLink', params);
	}

	/**
	 * Use this method to create an additional invite link for a chat.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 * The link can be revoked using the method revokeChatInviteLink.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#createchatinvitelink)
	 */
	public createChatInviteLink(params: TelegramCreateChatInviteLinkParams): Promise<TelegramChatInviteLink> {
		return this.call('createChatInviteLink');
	}

	/**
	 * Use this method to edit a non-primary invite link created by the bot.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editchatinvitelink)
	 */
	public editChatInviteLink(params: TelegramEditChatInviteLinkParams): Promise<TelegramChatInviteLink> {
		return this.call('editChatInviteLink', params);
	}

	/**
	 * Use this method to revoke an invite link created by the bot.
	 * If the primary link is revoked, a new link is automatically generated.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#revokechatinvitelink)
	 */
	public revokeChatInviteLink(params: TelegramRevokeChatInviteLinkParams): Promise<TelegramChatInviteLink> {
		return this.call('revokeChatInviteLink', params);
	}

	/**
	 * Use this method to approve a chat join request.
	 * The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#approvechatjoinrequest)
	 */
	public approveChatJoinRequest(params: TelegramApproveChatJoinRequestParams): Promise<boolean> {
		return this.call('approveChatJoinRequest', params);
	}

	/**
	 * Use this method to decline a chat join request.
	 * The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#declinechatjoinrequest)
	 */
	public declineChatJoinRequest(params: TelegramDeclineChatJoinRequestParams): Promise<boolean> {
		return this.call('declineChatJoinRequest', params);
	}

	/**
	 * Use this method to set a new profile photo for the chat.
	 * Photos can't be changed for private chats.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchatphoto)
	 */
	public setChatPhoto(params: TelegramSetChatPhotoParams): Promise<boolean> {
		return this.call('setChatPhoto', params);
	}

	/**
	 * Use this method to delete a chat photo.
	 * Photos can't be changed for private chats.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletechatphoto)
	 */
	public deleteChatPhoto(params: TelegramDeleteChatPhotoParams): Promise<boolean> {
		return this.call('deleteChatPhoto', params);
	}

	/**
	 * Use this method to change the title of a chat.
	 * Titles can't be changed for private chats.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchattitle)
	 */
	public setChatTitle(params: TelegramSetChatTitleParams): Promise<boolean> {
		return this.call('setChatTitle', params);
	}

	/**
	 * Use this method to change the description of a group, a supergroup, or a channel.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchatdescription)
	 */
	public setChatDescription(params: TelegramSetChatDescriptionParams): Promise<boolean> {
		return this.call('setChatDescription', params);
	}

	/**
	 * Use this method to add a message to the list of pinned messages in a chat.
	 * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must
	 * have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#pinchatmessage)
	 */
	public pinChatMessage(params: TelegramPinChatMessageParams): Promise<boolean> {
		return this.call('pinChatMessage', params);
	}

	/**
	 * Use this method to remove a message from the list of pinned messages in a chat.
	 * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must
	 * have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unpinchatmessage)
	 */
	public unpinChatMessage(params: TelegramUnpinChatMessageParams): Promise<boolean> {
		return this.call('unpinChatMessage', params);
	}

	/**
	 * Use this method to clear the list of pinned messages in a chat.
	 * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must
	 * have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unpinallchatmessages)
	 */
	public unpinAllChatMessages(params: TelegramUnpinAllChatMessagesParams): Promise<boolean> {
		return this.call('unpinAllChatMessages', params);
	}

	/**
	 * Use this method for your bot to leave a group, supergroup, or channel. Returns True on success.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#leavechat)
	 */
	public leaveChat(params: TelegramLeaveChatParams): Promise<boolean> {
		return this.call('leaveChat', params);
	}

	/**
	 * Use this method to get up-to-date information about the chat. Returns a Chat object on success.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getchat)
	 */
	public getChat(params: TelegramGetChatParams): Promise<TelegramChat> {
		return this.call('getChat', params);
	}

	/**
	 * Use this method to get a list of administrators in a chat, which aren't bots.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getchatadministrators)
	 */
	public getChatAdministrators(params: TelegramGetChatAdministratorsParams): Promise<TelegramChatMember> {
		return this.call('getChatAdministrators', params);
	}

	/**
	 * Use this method to get the number of members in a chat.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getchatmembercount)
	 */
	public getChatMemberCount(params: TelegramGetChatMemberCountParams): Promise<number> {
		return this.call('getChatMemberCount', params);
	}

	/**
	 * Use this method to get information about a member of a chat.
	 * The method is only guaranteed to work for other users if the bot is an administrator in the chat.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getchatmember)
	 */
	public getChatMember(params: TelegramGetChatMemberParams): Promise<TelegramChatMember> {
		return this.call('getChatMember', params);
	}

	/**
	 * Use this method to set a new group sticker set for a supergroup.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchatstickerset)
	 */
	public setChatStickerSet(params: TelegramSetChatStickerSetParams): Promise<boolean> {
		return this.call('setChatStickerSet', params);
	}

	/**
	 * Use this method to delete a group sticker set from a supergroup.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletechatstickerset)
	 */
	public deleteChatStickerSet(params: TelegramDeleteChatStickerSetParams): Promise<boolean> {
		return this.call('deleteChatStickerSet', params);
	}

	/**
	 * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getforumtopiciconstickers)
	 */
	public getForumTopicIconStickers(): Promise<TelegramSticker[]> {
		return this.call('getForumTopicIconStickers');
	}

	/**
	 * Use this method to create a topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#createforumtopic)
	 */
	public createForumTopic(params: TelegramCreateForumTopicParams): Promise<TelegramForumTopic> {
		return this.call('createForumTopic', params);
	}

	/**
	 * Use this method to edit name and icon of a topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights,
	 * unless it is the creator of the topic.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editforumtopic)
	 */
	public editForumTopic(params: TelegramEditForumTopicParams): Promise<boolean> {
		return this.call('editForumTopic', params);
	}

	/**
	 * Use this method to close an open topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights,
	 * unless it is the creator of the topic.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#closeforumtopic)
	 */
	public closeForumTopic(params: TelegramCloseForumTopicParams): Promise<boolean> {
		return this.call('closeForumTopic', params);
	}

	/**
	 * Use this method to reopen a closed topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights,
	 * unless it is the creator of the topic.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#reopenforumtopic)
	 */
	public reopenForumTopic(params: TelegramReopenForumTopicParams): Promise<boolean> {
		return this.call('reopenForumTopic', params);
	}

	/**
	 * Use this method to delete a forum topic along with all its messages in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deleteforumtopic)
	 */
	public deleteForumTopic(params: TelegramDeleteForumTopicParams): Promise<boolean> {
		return this.call('deleteForumTopic', params);
	}

	/**
	 * Use this method to clear the list of pinned messages in a forum topic.
	 * The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unpinallforumtopicmessages)
	 */
	public unpinAllForumTopicMessages(params: TelegramUnpinAllForumTopicMessagesParams): Promise<boolean> {
		return this.call('unpinAllForumTopicMessages', params);
	}

	/**
	 * Use this method to edit the name of the 'General' topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editgeneralforumtopic)
	 */
	public editGeneralForumTopic(params: TelegramEditGeneralForumTopicParams): Promise<boolean> {
		return this.call('editGeneralForumTopic', params);
	}

	/**
	 * Use this method to close an open 'General' topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#closegeneralforumtopic)
	 */
	public closeGeneralForumTopic(params: TelegramCloseGeneralForumTopicParams): Promise<boolean> {
		return this.call('closeGeneralForumTopic', params);
	}

	/**
	 * Use this method to reopen a closed 'General' topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
	 * The topic will be automatically unhidden if it was hidden.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#reopengeneralforumtopic)
	 */
	public reopenGeneralForumTopic(params: TelegramReopenGeneralForumTopicParams): Promise<boolean> {
		return this.call('reopenGeneralForumTopic', params);
	}

	/**
	 * Use this method to hide the 'General' topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
	 * The topic will be automatically closed if it was open.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#hidegeneralforumtopic)
	 */
	public hideGeneralForumTopic(params: TelegramHideGeneralForumTopicParams): Promise<boolean> {
		return this.call('hideGeneralForumTopic', params);
	}

	/**
	 * Use this method to unhide the 'General' topic in a forum supergroup chat.
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unhidegeneralforumtopic)
	 */
	public unhideGeneralForumTopic(params: TelegramUnhideGeneralForumTopicParams): Promise<boolean> {
		return this.call('unhideGeneralForumTopic', params);
	}

	/**
	 * Use this method to clear the list of pinned messages in a General forum topic.
	 * The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#unpinallgeneralforumtopicmessages)
	 */
	public unpinAllGeneralForumTopicMessages(params: TelegramUnpinAllGeneralForumTopicMessagesParams): Promise<boolean> {
		return this.call('unpinAllGeneralForumTopicMessages', params);
	}

	/**
	 * Use this method to send answers to callback queries sent from inline keyboards.
	 * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#answercallbackquery)
	 */
	public answerCallbackQuery(params: TelegramAnswerCallbackQueryParams): Promise<boolean> {
		return this.call('answerCallbackQuery', params);
	}

	/**
	 * Use this method to get the list of boosts added to a chat by a user.
	 * Requires administrator rights in the chat.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getuserchatboosts)
	 */
	public getUserChatBoosts(params: TelegramGetUserChatBoostsParams) {
		return this.call('getUserChatBoosts', params);
	}

	/**
	 * Use this method to get information about the connection of the bot with a business account.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getbusinessconnection)
	 */
	public getBusinessConnection(): Promise<TelegramBusinessConnection> {
		return this.call('getBusinessConnection', undefined);
	}

	/**
	 * Use this method to change the list of the bot's commands.
	 * See this manual for more details about bot commands.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setmycommands)
	 */
	public setMyCommands(params: TelegramSetMyCommandsParams): Promise<boolean> {
		return this.call('setMyCommands', params);
	}

	/**
	 * Use this method to delete the list of the bot's commands
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletemycommands)
	 */
	public deleteMyCommands(params?: TelegramDeleteMyCommandsParams) {
		return this.call('deleteMyCommands', params);
	}

	/**
	 * Use this method to get the current list of the bot's commands for the given scope and user language.
	 * If commands aren't set, an empty list is returned.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getmycommands)
	 */
	public getMyCommands(params?: TelegramGetMyCommandsParams): Promise<TelegramBotCommand[]> {
		return this.call('getMyCommands', params);
	}

	/**
	 * Use this method to change the bot's name.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setmyname)
	 */
	public setMyName(params?: TelegramSetMyNameParams): Promise<boolean> {
		return this.call('setMyName', params);
	}

	/**
	 * Use this method to get the current bot name for the given user language.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getmyname)
	 */
	public getMyName(params?: TelegramGetMyNameParams): Promise<TelegramBotName> {
		return this.call('getMyName', params);
	}

	/**
	 * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setmydescription)
	 */
	public setMyDescription(params?: TelegramSetMyDescriptionParams): Promise<boolean> {
		return this.call('setMyDescription', params);
	}

	/**
	 * Use this method to get the current bot description for the given user language.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getmydescription)
	 */
	public getMyDescription(params?: TelegramGetMyDescriptionParams): Promise<TelegramBotDescription> {
		return this.call('getMyDescription', params);
	}

	/**
	 * Use this method to change the bot's short description, which is shown on the bot's profile page
	 * and is sent together with the link when users share the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setmyshortdescription)
	 */
	public setMyShortDescription(params?: TelegramSetMyShortDescriptionParams): Promise<boolean> {
		return this.call('setMyShortDescription', params);
	}

	/**
	 * Use this method to get the current bot short description for the given user language.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getmyshortdescription)
	 */
	public getMyShortDescription(params?: TelegramGetMyShortDescriptionParams): Promise<TelegramBotShortDescription> {
		return this.call('getMyShortDescription', params);
	}

	/**
	 * Use this method to change the bot's menu button in a private chat, or the default menu button.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setchatmenubutton)
	 */
	public setChatMenuButton(params?: TelegramSetChatMenuButtonParams): Promise<boolean> {
		return this.call('setChatMenuButton', params);
	}

	/**
	 * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getchatmenubutton)
	 */
	public getChatMenuButton(params?: TelegramGetChatMenuButtonParams): Promise<TelegramMenuButton> {
		return this.call('getChatMenuButton', params);
	}

	/**
	 * Use this method to change the default administrator rights requested by the bot
	 * when it's added as an administrator to groups or channels.
	 * These rights will be suggested to users, but they are free to modify the list before adding the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setmydefaultadministratorrights)
	 */
	public setMyDefaultAdministratorRights(params?: TelegramSetMyDefaultAdministratorRightsParams): Promise<boolean> {
		return this.call('setMyDefaultAdministratorRights', params);
	}

	/**
	 * Use this method to get the current default administrator rights of the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getmydefaultadministratorrights)
	 */
	public getMyDefaultAdministratorRights(params?: TelegramGetMyDefaultAdministratorRightsParams): Promise<TelegramChatAdministratorRights> {
		return this.call('getMyDefaultAdministratorRights', params);
	}

	/**
	 * Use this method to edit text and game messages.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagetext)
	 */
	public editMessageText(params: TelegramEditMessageTextParams): Promise<TelegramMessage | boolean> {
		return this.call('editMessageText', params);
	}

	/**
	 * Use this method to edit captions of messages.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagecaption)
	 */
	public editMessageCaption(params: TelegramEditMessageCaptionParams): Promise<TelegramMessage | boolean> {
		return this.call('editMessageCaption', params);
	}

	/**
	 * Use this method to edit animation, audio, document, photo, or video messages.
	 * If a message is part of a message album, then it can be edited only to an audio for audio albums,
	 * only to a document for document albums and to a photo or a video otherwise.
	 * When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagemedia)
	 */
	public editMessageMedia(params: TelegramEditMessageMediaParams): Promise<TelegramMessage | boolean> {
		return this.call('editMessageMedia', params);
	}

	/**
	 * Use this method to edit live location messages.
	 * A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagelivelocation)
	 */
	public editMessageLiveLocation(params: TelegramEditMessageLiveLocationParams): Promise<TelegramMessage | boolean> {
		return this.call('editMessageLiveLocation', params);
	}

	/**
	 * Use this method to stop updating a live location message before live_period expires.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#stopmessagelivelocation)
	 */
	public stopMessageLiveLocation(params: TelegramStopMessageLiveLocationParams): Promise<TelegramMessage | boolean> {
		return this.call('stopMessageLiveLocation', params);
	}

	/**
	 * Use this method to edit only the reply markup of messages.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagereplymarkup)
	 */
	public editMessageReplyMarkup(params: TelegramEditMessageReplyMarkupParams): Promise<TelegramMessage | boolean> {
		return this.call('editMessageReplyMarkup', params);
	}

	/**
	 * Use this method to stop a poll which was sent by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#stoppoll)
	 */
	public stopPoll(params: TelegramStopPollParams): Promise<TelegramPoll> {
		return this.call('stopPoll', params);
	}

	/**
	 * Use this method to delete a message, including service messages, with the following limitations:
	 * - A message can only be deleted if it was sent less than 48 hours ago.
	 * - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
	 * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
	 * - Bots can delete outgoing messages in private chats, groups, and supergroups.
	 * - Bots can delete incoming messages in private chats.
	 * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
	 * - If the bot is an administrator of a group, it can delete any message there.
	 * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletemessage)
	 */
	public deleteMessage(params: TelegramDeleteMessageParams): Promise<boolean> {
		return this.call('deleteMessage', params);
	}

	/**
	 * Use this method to delete multiple messages simultaneously.
	 * If some of the specified messages can't be found, they are skipped.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletemessages)
	 */
	public deleteMessages(params: TelegramDeleteMessagesParams): Promise<boolean> {
		return this.call('deleteMessages', params);
	}

	/**
	 * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendsticker)
	 */
	public sendSticker(params: TelegramSendStickerParams): Promise<TelegramMessage> {
		return this.call('sendSticker', params);
	}

	/**
	 * Use this method to get a sticker set.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getstickerset)
	 */
	public getStickerSet(params: TelegramGetStickerSetParams): Promise<TelegramStickerSet> {
		return this.call('getStickerSet', params);
	}

	/**
	 * Use this method to get information about custom emoji stickers by their identifiers.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getcustomemojistickers)
	 */
	public getCustomEmojiStickers(params: TelegramGetCustomEmojiStickersParams): Promise<TelegramSticker[]> {
		return this.call('getCustomEmojiStickers', params);
	}

	/**
	 * Use this method to upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods
	 * (the file can be used multiple times). Returns the uploaded File on success.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#uploadstickerfile)
	 */
	public uploadStickerFile(params: TelegramUploadStickerFileParams): Promise<TelegramFile> {
		return this.call('uploadStickerFile', params);
	}

	/**
	 * Use this method to create a new sticker set owned by a user.
	 * The bot will be able to edit the sticker set thus created.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#createnewstickerset)
	 */
	public createNewStickerSet(params: TelegramCreateNewStickerSetParams): Promise<boolean> {
		return this.call('createNewStickerSet', params);
	}

	/**
	 * Use this method to add a new sticker to a set created by the bot.
	 * Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#addstickertoset)
	 */
	public addStickerToSet(params: TelegramAddStickerToSetParams): Promise<boolean> {
		return this.call('addStickerToSet', params);
	}

	/**
	 * Use this method to move a sticker in a set created by the bot to a specific position.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setstickerpositioninset)
	 */
	public setStickerPositionInSet(params: TelegramSetStickerPositionInSetParams): Promise<boolean> {
		return this.call('setStickerPositionInSet', params);
	}

	/**
	 * Use this method to delete a sticker from a set created by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletestickerfromset)
	 */
	public deleteStickerFromSet(params: TelegramDeleteStickerFromSetParams): Promise<boolean> {
		return this.call('deleteStickerFromSet', params);
	}

	/**
	 * Use this method to replace an existing sticker in a sticker set with a new one.
	 * The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#replacestickerinset)
	 */
	public replaceStickerInSet(params: TelegramReplaceStickerInSetParams): Promise<boolean> {
		return this.call('replaceStickerInSet', params);
	}

	/**
	 * Use this method to change the list of emoji assigned to a regular or custom emoji sticker.
	 * The sticker must belong to a sticker set created by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setstickeremojilist)
	 */
	public setStickerEmojiList(params: TelegramSetStickerEmojiListParams): Promise<boolean> {
		return this.call('setStickerEmojiList', params);
	}

	/**
	 * Use this method to change search keywords assigned to a regular or custom emoji sticker.
	 * The sticker must belong to a sticker set created by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setstickerkeywords)
	 */
	public setStickerKeywords(params: TelegramSetStickerKeywordsParams): Promise<boolean> {
		return this.call('setStickerKeywords', params);
	}

	/**
	 * Use this method to change the mask position of a mask sticker.
	 * The sticker must belong to a sticker set that was created by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setstickermaskposition)
	 */
	public setStickerMaskPosition(params: TelegramSetStickerMaskPositionParams): Promise<boolean> {
		return this.call('setStickerMaskPosition', params);
	}

	/**
	 * Use this method to set the title of a created sticker set.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setstickersettitle)
	 */
	public setStickerSetTitle(params: TelegramSetStickerSetTitleParams): Promise<boolean> {
		return this.call('setStickerSetTitle', params);
	}

	/**
	 * Use this method to set the thumbnail of a regular or mask sticker set.
	 * The format of the thumbnail file must match the format of the stickers in the set.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setstickersetthumbnail)
	 */
	public setStickerSetThumbnail(params: TelegramSetStickerSetThumbnailParams): Promise<boolean> {
		return this.call('setStickerSetThumbnail', params);
	}

	/**
	 * Use this method to set the thumbnail of a custom emoji sticker set.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setcustomemojistickersetthumbnail)
	 */
	public setCustomEmojiStickerSetThumbnail(params: TelegramSetCustomEmojiStickerSetThumbnailParams): Promise<boolean> {
		return this.call('setCustomEmojiStickerSetThumbnail', params);
	}

	/**
	 * Use this method to delete a sticker set that was created by the bot.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#deletestickerset)
	 */
	public deleteStickerSet(params: TelegramDeleteStickerSetParams): Promise<boolean> {
		return this.call('deleteStickerSet', params);
	}

	/**
	 * Use this method to set the result of an interaction with a Web App
	 * and send a corresponding message on behalf of the user to the chat from which the query originated.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#answerwebappquery)
	 */
	public answerWebAppQuery(params: TelegramAnswerWebAppQueryParams): Promise<TelegramSentWebAppMessage> {
		return this.call('answerWebAppQuery', params);
	}

	/**
	 * Use this method to send invoices.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendinvoice)
	 */
	public sendInvoice(params: TelegramSendInvoiceParams): Promise<TelegramMessage> {
		return this.call('sendInvoice', params);
	}

	/**
	 * Use this method to create a link for an invoice.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#createinvoicelink)
	 */
	public createInvoiceLink(params: TelegramCreateInvoiceLinkParams): Promise<string> {
		return this.call('createInvoiceLink', params);
	}

	/**
	 * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified,
	 * the Bot API will send an Update with a shipping_query field to the bot.
	 * Use this method to reply to shipping queries.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#answershippingquery)
	 */
	public answerShippingQuery(params: TelegramAnswerShippingQueryParams): Promise<boolean> {
		return this.call('answerShippingQuery', params);
	}

	/**
	 * Once the user has confirmed their payment and shipping details,
	 * the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query.
	 * Use this method to respond to such pre-checkout queries.
	 * Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#answerprecheckoutquery)
	 */
	public answerPreCheckoutQuery(params: TelegramAnswerPreCheckoutQueryParams): Promise<boolean> {
		return this.call('answerPreCheckoutQuery', params);
	}

	/**
	 * Sends answers to an inline query.
	 * Use this method to send answers to an inline query. On success, True is returned.
	 * No more than 50 results per query are allowed.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#answerinlinequery)
	 */
	public answerInlineQuery(params: TelegramAnswerInlineQueryParams): Promise<boolean> {
		return this.call('answerInlineQuery', params);
	}

	/**
	 * Use this method to send a game.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendgame)
	 */
	public sendGame(params: TelegramSendGameParams): Promise<TelegramMessage> {
		return this.call('sendGame', params);
	}

	/**
	 * Use this method to set the score of the specified user in a game message.
	 * On success, if the message is not an inline message, the Message is returned, otherwise True is returned.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#setgamescore)
	 */
	public setGameScore(params: TelegramSetGameScoreParams): Promise<TelegramMessage | boolean> {
		return this.call('setGameScore', params);
	}

	/**
	 * Use this method to get data for high score tables.
	 * Will return the score of the specified user and several of their neighbors in a game.
	 *
	 * This method will currently return scores for the target user, plus two of their closest neighbors on each side.
	 * Will also return the top three users if the user and their neighbors are not among them.
	 * Please note that this behavior is subject to change.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getgamehighscores)
	 */
	public getGameHighScores(params: TelegramGetGameHighScoresParams): Promise<TelegramGameHighScore[]> {
		return this.call('getGameHighScores', params);
	}

	/**
	 * Use this method to refund a star payment.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#refundstarpayment)
	 */
	public refundStarPayment(params: TelegramRefundStarPaymentParams): Promise<true> {
		return this.call('refundStarPayment', params);
	}

	/**
	 * Use this method to get star transactions.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getstartransactions)
	 */
	public getStarTransactions(params: TelegramGetStarTransactionsParams): Promise<TelegramStarTransactions> {
		return this.call('getStarTransactions', params);
	}

	/**
	 * Use this method to send paid media.
	 *
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendpaidmedia)
	 */
	public sendPaidMedia(params: TelegramSendPaidMediaParams): Promise<TelegramMessage> {
		return this.call('sendPaidMedia', params);
	}
}
