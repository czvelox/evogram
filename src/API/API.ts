import axios from "axios";
import { Evogram } from "../Client";
import { TelegramError } from "./TelegramError";
import { IAddStickerToSetParams, IAnswerCallbackQueryParams, IAnswerInlineQueryParams, IAnswerPreCheckoutQueryParams, IAnswerShippingQueryParams, IAnswerWebAppQueryParams, IApproveChatJoinRequestParams, IBanChatMemberParams, IBanChatSenderChatParams, IBotCommand, IChat, IChatAdministratorRights, IChatInviteLink, IChatMember, ICloseForumTopicParams, ICloseGeneralForumTopicParams, ICopyMessageParams, ICreateChatInviteLinkParams, ICreateForumTopicParams, ICreateInvoiceLinkParams, ICreateNewStickerSetParams, IDeclineChatJoinRequestParams, IDeleteChatPhotoParams, IDeleteChatStickerSetParams, IDeleteForumTopicParams, IDeleteMessageParams, IDeleteMyCommandsParams, IDeleteStickerFromSetParams, IDeleteWebhookParams, IEditChatInviteLinkParams, IEditForumTopicParams, IEditGeneralForumTopicParams, IEditMessageCaptionParams, IEditMessageLiveLocationParams, IEditMessageMediaParams, IEditMessageReplyMarkupParams, IEditMessageTextParams, IExportChatInviteLinkParams, IFile, IForumTopic, IForwardMessageParams, IGameHighScore, IGetChatAdministratorsParams, IGetChatMemberCountParams, IGetChatMemberParams, IGetChatMenuButtonParams, IGetChatParams, IGetCustomEmojiStickersParams, IGetFileParams, IGetForumTopicIconStickersParams, IGetGameHighScoresParams, IGetMyCommandsParams, IGetMyDefaultAdministratorRightsParams, IGetStickerSetParams, IGetUpdatesParams, IGetUserProfilePhotosParams, IHideGeneralForumTopicParams, ILeaveChatParams, IMenuButton, IMessage, IMessageId, IPinChatMessageParams, IPoll, IPromoteChatMemberParams, IReopenForumTopicParams, IReopenGeneralForumTopicParams, IRestrictChatMemberParams, IRevokeChatInviteLinkParams, ISendAnimationParams, ISendAudioParams, ISendChatActionParams, ISendContactParams, ISendDiceParams, ISendDocumentParams, ISendGameParams, ISendInvoiceParams, ISendLocationParams, ISendMediaGroupParams, ISendMessageParams, ISendPhotoParams, ISendPollParams, ISendStickerParams, ISendVenueParams, ISendVideoNoteParams, ISendVideoParams, ISendVoiceParams, ISentWebAppMessage, ISetChatAdministratorCustomTitleParams, ISetChatDescriptionParams, ISetChatMenuButtonParams, ISetChatPermissionsParams, ISetChatPhotoParams, ISetChatStickerSetParams, ISetChatTitleParams, ISetGameScoreParams, ISetMyCommandsParams, ISetMyDefaultAdministratorRightsParams, ISetPassportDataErrorsParams, ISetStickerPositionInSetParams, ISetStickerSetThumbParams, ISetWebhookParams, ISticker, IStickerSet, IStopMessageLiveLocationParams, IStopPollParams, IUnbanChatMemberParams, IUnbanChatSenderChatParams, IUnhideGeneralForumTopicParams, IUnpinAllChatMessagesParams, IUnpinAllForumTopicMessagesParams, IUnpinChatMessageParams, IUpdate, IUploadStickerFileParams, IUser, IUserProfilePhotos, IWebhookInfo } from "../interfaces";
import { BotContext, ChatInviteLinkContext, ChatMemberContext, DetailedChatContext, ForumTopicContext, IncomingMessageContext, PollContext, UpdateContext, UserContext } from "../contexts";
import { Context } from "../modules/context";
import { removeParseModeErrors } from "../utils";

export class API {
	private url: string;
	private defaultParams: Record<string, any> = {};

	public setDefaultParams(method: string, params: Record<string, any>) {
		this.defaultParams[method] = params;
	}

	constructor(private client: Evogram) {
		this.url = "https://api.telegram.org/bot" + client.token;
	}

	/**
	 * Use this method to receive incoming updates using long polling (wiki). 
	 * Returns an Array of Update objects.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getupdates)
	 * 
	 * @param {IGetUpdatesParams} [params] - Optional parameters for the request.
	 * @return {Promise<UpdateContext[]>} A Promise that resolves with an array of Update objects.
	 */
	public async getUpdates<T = UpdateContext>(params?: IGetUpdatesParams): Promise<T[]> {
		return (await this.call("getUpdates", params)).map((update: IUpdate) => this.client.modules.contexts.getContext("Update", update));
	}

	/**
	 * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
	 * 
	 * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
	 */
	public setWebhook(params: ISetWebhookParams): Promise<true> {
		return this.call("setWebhook", params);
	}

	/**
	 * Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success.
	 */
	public deleteWebhook(params?: IDeleteWebhookParams): Promise<true> {
		return this.call("deleteWebhook", params);
	}

	/**
	 * Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty.
	 */
	public getWebhookInfo(): Promise<IWebhookInfo> {
		return this.call("getWebhookInfo");
	}

	/**
	 * A simple method for testing your bot's authentication token. 
	 * Requires no parameters. 
	 * Returns basic information about the bot in form of a User object.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getme)
	 * 
	 * @returns {Promise<T>} A Promise that resolves with an object of type T, which defaults to UserContext.
	 */
	public async getMe<T extends Context<IUser> = BotContext>(): Promise<T> {
		return this.client.modules.contexts.getContext("Bot", await this.call("getMe"));
	}

	/**
	 * Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters.
	 */
	public logOut(): Promise<true> {
		return this.call("logOut");
	}

	/**
	 * Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters.
	 */
	public close(): Promise<true> {
		return this.call("close");
	}

	/**
	 * Use this method to send text messages. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendmessage)
	 * 
	 * @param params The parameters to sending the message.
	 * @returns The context of the sent message.
	 */
	public async sendMessage<T extends Context<IMessage> = IncomingMessageContext>(params: ISendMessageParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("sendMessage", params));
	}

	/**
	 * Use this method to forward messages of any kind. 
	 * Service messages can't be forwarded. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#forwardmessage)
	 * 
	 * @param params - The parameters for forwarding the message.
	 * @returns A Promise that resolves to the incoming message context containing the forwarded message.
	 */
	public async forwardMessage<T extends Context<IMessage> = IncomingMessageContext>(params: IForwardMessageParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("forwardMessage", params));
	}

	/**
	 * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
	 */
	public copyMessage(params: ICopyMessageParams): Promise<IMessageId> {
		return this.call("copyMessage", params);
	}

	/**
	 * Use this method to send photos. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendphoto)
	 * 
	 * @param params The parameters for sending a photo, including chatId and photo.
	 * @returns A Promise of type T, which extends Context (IncomingMessageContext by default).
	 */
	public async sendPhoto<T extends Context<IMessage> = IncomingMessageContext>(params: ISendPhotoParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendPhoto", params));
	}

	/**
	 * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
	 * 
	 * For sending voice messages, use the sendVoice method instead.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendaudio)
	 * 
	 * @param params The parameters for sending the audio file.
	 * @returns The sent message on success.
	 */
	public async sendAudio<T extends Context<IMessage> = IncomingMessageContext>(params: ISendAudioParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendAudio", params));
	}

	/**
	 * Use this method to send general files. 
	 * On success, the sent Message is returned. 
	 * Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#senddocument)
	 * 
	 * @param params The parameters for sending the file.
	 * @returns The sent message on success.
	 */
	public async sendDocument<T extends Context<IMessage> = IncomingMessageContext>(params: ISendDocumentParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendDocument", params));
	}

	/**
	 * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). 
	 * On success, the sent Message is returned. 
	 * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvideo)
	 * 
	 * @param params The parameters for sending the video file.
	 * @returns The sent message on success.
	 */
	public async sendVideo<T extends Context<IMessage> = IncomingMessageContext>(params: ISendVideoParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendVideo", params));
	}

	/**
	 * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). 
	 * On success, the sent Message is returned. 
	 * Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendanimation)
	 * 
	 * @param params The parameters for sending the animation file.
	 * @returns The sent message on success.
	 */
	public async sendAnimation<T extends Context<IMessage> = IncomingMessageContext>(params: ISendAnimationParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendAnimation", params));
	}

	/**
	 * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. 
	 * For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). 
	 * On success, the sent Message is returned. 
	 * Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvoice)
	 * 
	 * @param params The parameters for sending the voice file.
	 * @returns The sent message on success.
	 */
	public async sendVoice<T extends Context<IMessage> = IncomingMessageContext>(params: ISendVoiceParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendVoice", params));
	}

	/**
	 * As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. 
	 * Use this method to send video messages. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvideonote)
	 * 
	 * @param params The parameters for sending the voice note file.
	 * @returns The sent message on success.
	 */
	public async sendVideoNote<T extends Context<IMessage> = IncomingMessageContext>(params: ISendVideoNoteParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendVideoNote", params));
	}

	/**
	 * Use this method to send a group of photos, videos, documents or audios as an album. 
	 * Documents and audio files can be only grouped in an album with messages of the same type. 
	 * On success, an array of Messages that were sent is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendmediagroup)
	 * 
	 * @param params The parameters for sending the media group.
	 * @returns A Promise that resolves with an array of messages that were sent.
	 */
	public async sendMediaGroup<T extends Context<IMessage> = IncomingMessageContext>(params: ISendMediaGroupParams): Promise<T[]> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.upload("sendMediaGroup", params));
	}

	/**
	 * Use this method to send point on the map. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendlocation)
	 * 
	 * @param params The parameters for sending location.
	 * @returns The sent message on success.
	 */
	public async sendLocation<T extends Context<IMessage> = IncomingMessageContext>(params: ISendLocationParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("sendLocation", params));
	}

	/**
	 * Use this method to edit live location messages. 
	 * A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. 
	 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagelivelocation)
	 * 
	 * @param params The parameters for editing live location.
	 * @returns The editing message on success.
	 */
	public async editMessageLiveLocation<T extends Context<IMessage> = IncomingMessageContext>(params: IEditMessageLiveLocationParams): Promise<T | true> {
		const response = await this.call("editMessageLiveLocation", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to stop updating a live location message before live_period expires. 
	 * On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#stopmessagelivelocation)
	 * 
	 * @param params The parameters for stopping a live location
	 * @returns The sent message on success.
	 */
	public async stopMessageLiveLocation<T extends Context<IMessage> = IncomingMessageContext>(params: IStopMessageLiveLocationParams): Promise<T | true> {
		const response = await this.upload("stopMessageLiveLocation", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to send information about a venue. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendvenue)
	 * 
	 * @param params The parameters for sending venue.
	 * @returns The sent message on success.
	 */
	public async sendVenue<T extends Context<IMessage> = IncomingMessageContext>(params: ISendVenueParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("sendVenue", params));
	}

	/**
	 * Use this method to send phone contacts. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendcontact)
	 * 
	 * @param params The parameters for sending contact
	 * @returns The sent message on success.
	 */
	public async sendContact<T extends Context<IMessage> = IncomingMessageContext>(params: ISendContactParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("sendContact", params));
	}

	/**
	 * Use this method to send a native poll. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendpoll)
	 * 
	 * @param The parameters for sending poll
	 * @returns The sent message on success.
	 */
	public async sendPoll<T extends Context<IMessage> = IncomingMessageContext>(params: ISendPollParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("sendPoll", params));
	}

	/**
	 * Use this method to send an animated emoji that will display a random value. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#senddice)
	 * 
	 * @param params The parameters for sending dice
	 * @returns The sent message on success.
	 */
	public async sendDice<T extends Context<IMessage> = IncomingMessageContext>(params: ISendDiceParams): Promise<T> {
		return this.client.modules.contexts.getContext("IncomingMessage", await this.call("sendDice", params));
	}

	/**
	 * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
	 */
	public sendChatAction(params: ISendChatActionParams): Promise<true> {
		return this.call("sendChatAction", params);
	}

	/**
	 * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
	 */
	public getUserProfilePhotos(params: IGetUserProfilePhotosParams): Promise<IUserProfilePhotos> {
		return this.call("getUserProfilePhotos", params);
	}

	/**
	 * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
	 */
	public getFile(params: IGetFileParams): Promise<IFile> {
		return this.call("getFile", params);
	}

	/**
	 * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public banChatMember(params: IBanChatMemberParams): Promise<true> {
		return this.call("banChatMember", params);
	}

	/**
	 * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success.
	 */
	public unbanChatMember(params: IUnbanChatMemberParams): Promise<true> {
		return this.call("unbanChatMember", params);
	}

	/**
	 * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
	 */
	public restrictChatMember(params: IRestrictChatMemberParams): Promise<true> {
		return this.call("restrictChatMember", params);
	}

	/**
	 * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success.
	 */
	public promoteChatMember(params: IPromoteChatMemberParams): Promise<true> {
		return this.call("promoteChatMember", params);
	}

	/**
	 * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
	 */
	public setChatAdministratorCustomTitle(params: ISetChatAdministratorCustomTitleParams): Promise<true> {
		return this.call("setChatAdministratorCustomTitle", params);
	}

	/**
	 * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public banChatSenderChat(params: IBanChatSenderChatParams): Promise<true> {
		return this.call("banChatSenderChat", params);
	}

	/**
	 * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public unbanChatSenderChat(params: IUnbanChatSenderChatParams): Promise<true> {
		return this.call("unbanChatSenderChat", params);
	}

	/**
	 * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success.
	 */
	public setChatPermissions(params: ISetChatPermissionsParams): Promise<true> {
		return this.call("setChatPermissions", params);
	}

	/**
	 * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
	 */
	public exportChatInviteLink(params: IExportChatInviteLinkParams): Promise<string> {
		return this.call("exportChatInviteLink", params);
	}

	/**
	 * Use this method to create an additional invite link for a chat. 
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. 
	 * The link can be revoked using the method revokeChatInviteLink. 
	 * Returns the new invite link as ChatInviteLink object.
	 * 
	 * @param {ICreateChatInviteLinkParams} params - Parameters for creating the chat invite link.
	 * @returns {Promise<ChatInviteLinkContext>} A promise that resolves to a ChatInviteLinkContext object representing the new invite link.
	 */
	public async createChatInviteLink<T extends Context<IChatInviteLink> = ChatInviteLinkContext>(params: ICreateChatInviteLinkParams): Promise<T> {
		return this.client.modules.contexts.getContext("ChatInviteLink", await this.call("createChatInviteLink", params));
	}

	/**
	 * Use this method to edit a non-primary invite link created by the bot. 
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. 
	 * Returns the edited invite link as a ChatInviteLink object.
	 * 
	 * @param {IEditChatInviteLinkParams} params - Parameters for editing the chat invite link.
	 * @returns {Promise<ChatInviteLinkContext>} A promise that resolves to a ChatInviteLinkContext object representing the edited chat invite link.
	 */
	public async editChatInviteLink<T extends Context<IChatInviteLink> = ChatInviteLinkContext>(params: IEditChatInviteLinkParams): Promise<T> {
		return this.client.modules.contexts.getContext("ChatInviteLink", await this.call("editChatInviteLink", params));
	}

	/**
	 * Use this method to revoke an invite link created by the bot. 
	 * If the primary link is revoked, a new link is automatically generated. 
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. 
	 * Returns the revoked invite link as ChatInviteLink object.
	 * 
	 * @param {IRevokeChatInviteLinkParams} params - Parameters for the revokeChatInviteLink method.
	 * @returns {Promise<ChatInviteLinkContext>} A promise that resolves to a ChatInviteLinkContext object representing the revoked link.
	 */
	public async revokeChatInviteLink<T extends Context<IChatInviteLink> = ChatInviteLinkContext>(params: IRevokeChatInviteLinkParams): Promise<T> {
		return this.client.modules.contexts.getContext("ChatInviteLink", await this.call("revokeChatInviteLink", params));
	}

	/**
	 * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
	 */
	public approveChatJoinRequest(params: IApproveChatJoinRequestParams): Promise<true> {
		return this.call("approveChatJoinRequest", params);
	}

	/**
	 * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
	 */
	public declineChatJoinRequest(params: IDeclineChatJoinRequestParams): Promise<true> {
		return this.call("declineChatJoinRequest", params);
	}

	/**
	 * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public setChatPhoto(params: ISetChatPhotoParams): Promise<true> {
		return this.upload("setChatPhoto", params);
	}

	/**
	 * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public deleteChatPhoto(params: IDeleteChatPhotoParams): Promise<true> {
		return this.call("deleteChatPhoto", params);
	}

	/**
	 * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public setChatTitle(params: ISetChatTitleParams): Promise<true> {
		return this.call("setChatTitle", params);
	}

	/**
	 * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 */
	public setChatDescription(params: ISetChatDescriptionParams): Promise<true> {
		return this.call("setChatDescription", params);
	}

	/**
	 * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
	 */
	public pinChatMessage(params: IPinChatMessageParams): Promise<true> {
		return this.call("pinChatMessage", params);
	}

	/**
	 * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
	 */
	public unpinChatMessage(params: IUnpinChatMessageParams): Promise<true> {
		return this.call("unpinChatMessage", params);
	}

	/**
	 * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
	 */
	public unpinAllChatMessages(params: IUnpinAllChatMessagesParams): Promise<true> {
		return this.call("unpinAllChatMessages", params);
	}

	/**
	 * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
	 */
	public leaveChat(params: ILeaveChatParams): Promise<true> {
		return this.call("leaveChat", params);
	}

	/**
	 * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.).
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#getchat)
	 * 
	 * @param {IGetChatParams} params - The parameters for the API call.
	 * @return {Promise} Returns a Chat object on success.
	 */
	public async getChat<T extends Context<IChat> = DetailedChatContext>(params: IGetChatParams): Promise<T> {
		return this.client.modules.contexts.getContext("DetailedChat", await this.call("getChat", params));
	}

	/**
	 * Use this method to get a list of administrators in a chat, which aren't bots. 
	 * Returns an Array of ChatMember objects.
	 * 
	 * @param {IGetChatAdministratorsParams} params - An object containing the chat_id of the target chat.
	 * @returns {Promise<ChatMemberContext[]>} A promise that resolves with an array of ChatMemberContext objects containing information about the requested chat members.
	 */
	public async getChatAdministrators<T extends Context<IChatMember> = ChatMemberContext>(params: IGetChatAdministratorsParams): Promise<T[]> {
		return (await this.call("getChatAdministrators", params)).map((member: IChatMember) => this.client.modules.contexts.getContext("ChatMember", member));
	}

	/**
	 * Use this method to get the number of members in a chat. Returns Int on success.
	 */
	public getChatMemberCount(params: IGetChatMemberCountParams): Promise<number> {
		return this.call("getChatMemberCount", params);
	}

	/**
	 * Use this method to get information about a member of a chat. 
	 * The method is only guaranteed to work for other users if the bot is an administrator in the chat. 
	 * Returns a ChatMember object on success.
	 * 
	 * @param {IGetChatMemberParams} params - An object containing the chat_id and user_id of the target chat member.
	 * @returns {Promise<ChatMemberContext>} A promise that resolves with a ChatMemberContext object containing information about the requested chat member.
	 */
	public async getChatMember<T extends Context<IChatMember> = ChatMemberContext>(params: IGetChatMemberParams): Promise<T> {
		return this.client.modules.contexts.getContext("ChatMember", await this.call("getChatMember", params));
	}

	/**
	 * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	 */
	public setChatStickerSet(params: ISetChatStickerSetParams): Promise<true> {
		return this.call("setChatStickerSet", params);
	}

	/**
	 * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	 */
	public deleteChatStickerSet(params: IDeleteChatStickerSetParams): Promise<true> {
		return this.call("deleteChatStickerSet", params);
	}

	/**
	 * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects.
	 */
	public getForumTopicIconStickers(params: IGetForumTopicIconStickersParams): Promise<ISticker[]> {
		return this.call("getForumTopicIconStickers", params);
	}

	/**
	 * Use this method to create a topic in a forum supergroup chat. 
	 * The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. 
	 * Returns information about the created topic as a ForumTopic object.
	 * 
	 * @param {ICreateForumTopicParams} params - The parameters to create a forum topic.
	 * @returns {Promise} - Returns information about the created topic as a ForumTopic object.
	 */
	public async createForumTopic<T extends Context<IForumTopic & any> = ForumTopicContext>(params: ICreateForumTopicParams): Promise<T> {
		return this.client.modules.contexts.getContext("ForumTopic", Object.assign(await this.call("createForumTopic", params), { chat_id: params.chat_id }));
	}

	/**
	 * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success.
	 */
	public editForumTopic(params: IEditForumTopicParams): Promise<true> {
		return this.call("editForumTopic", params);
	}

	/**
	 * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success.
	 */
	public closeForumTopic(params: ICloseForumTopicParams): Promise<true> {
		return this.call("closeForumTopic", params);
	}

	/**
	 * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success.
	 */
	public reopenForumTopic(params: IReopenForumTopicParams): Promise<true> {
		return this.call("reopenForumTopic", params);
	}

	/**
	 * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success.
	 */
	public deleteForumTopic(params: IDeleteForumTopicParams): Promise<true> {
		return this.call("deleteForumTopic", params);
	}

	/**
	 * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
	 */
	public unpinAllForumTopicMessages(params: IUnpinAllForumTopicMessagesParams): Promise<true> {
		return this.call("unpinAllForumTopicMessages", params);
	}

	/**
	 * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success.
	 */
	public editGeneralForumTopic(params: IEditGeneralForumTopicParams): Promise<true> {
		return this.call("editGeneralForumTopic", params);
	}

	/**
	 * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
	 */
	public closeGeneralForumTopic(params: ICloseGeneralForumTopicParams): Promise<true> {
		return this.call("closeGeneralForumTopic", params);
	}

	/**
	 * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success.
	 */
	public reopenGeneralForumTopic(params: IReopenGeneralForumTopicParams): Promise<true> {
		return this.call("reopenGeneralForumTopic", params);
	}

	/**
	 * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success.
	 */
	public hideGeneralForumTopic(params: IHideGeneralForumTopicParams): Promise<true> {
		return this.call("hideGeneralForumTopic", params);
	}

	/**
	 * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
	 */
	public unhideGeneralForumTopic(params: IUnhideGeneralForumTopicParams): Promise<true> {
		return this.call("unhideGeneralForumTopic", params);
	}

	/**
	 * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
	 */
	public answerCallbackQuery(params: IAnswerCallbackQueryParams): Promise<true> {
		return this.call("answerCallbackQuery", params);
	}

	/**
	 * Use this method to change the list of the bot's commands. See this manual for more details about bot commands. Returns True on success.
	 */
	public setMyCommands(params: ISetMyCommandsParams): Promise<true> {
		return this.call("setMyCommands", params);
	}

	/**
	 * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success.
	 */
	public deleteMyCommands(params?: IDeleteMyCommandsParams): Promise<true> {
		return this.call("deleteMyCommands", params);
	}

	/**
	 * Use this method to get the current list of the bot's commands for the given scope and user language. 
	 * Returns an Array of BotCommand objects. 
	 * If commands aren't set, an empty list is returned.
	 */
	public async getMyCommands<T extends Context<IBotCommand> | object = IBotCommand>(params?: IGetMyCommandsParams): Promise<T[]> {
		return (await this.call("getMyCommands", params)).map((command: IBotCommand) => this.client.modules.contexts.getContext("BotCommand", command));
	}

	/**
	 * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
	 */
	public setChatMenuButton(params?: ISetChatMenuButtonParams): Promise<true> {
		return this.call("setChatMenuButton", params);
	}

	/**
	 * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. 
	 * Returns MenuButton on success.
	 */
	public async getChatMenuButton<T extends Context<IMenuButton> | object = IMenuButton>(params?: IGetChatMenuButtonParams): Promise<T> {
		return this.client.modules.contexts.getContext("MenuButton", await this.call("getChatMenuButton", params));
	}

	/**
	 * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are are free to modify the list before adding the bot. Returns True on success.
	 */
	public setMyDefaultAdministratorRights(params?: ISetMyDefaultAdministratorRightsParams): Promise<true> {
		return this.call("setMyDefaultAdministratorRights", params);
	}

	/**
	 * Use this method to get the current default administrator rights of the bot. 
	 * Returns ChatAdministratorRights on success.
	 */
	public async getMyDefaultAdministratorRights<T extends Context<IChatAdministratorRights> | object = IChatAdministratorRights>(params?: IGetMyDefaultAdministratorRightsParams): Promise<T> {
		return this.call("getMyDefaultAdministratorRights", params);
	}

	/**
	 * Use this method to edit text and game messages. 
	 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagetext)
	 * 
	 * @param params The parameters for editing text.
	 * @returns The edited message on success.
	 */
	public async editMessageText<T extends Context<IMessage> = IncomingMessageContext>(params: IEditMessageTextParams): Promise<T | true> {
		const response = await this.upload("editMessageText", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to edit captions of messages. 
	 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagecaption)
	 * 
	 * @param params The parameters for editing caption.
	 * @returns The edited message on success.
	 */
	public async editMessageCaption<T extends Context<IMessage> = IncomingMessageContext>(params: IEditMessageCaptionParams): Promise<T | true> {
		const response = await this.upload("editMessageCaption", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to edit animation, audio, document, photo, or video messages. 
	 * If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. 
	 * When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. 
	 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagemedia)
	 * 
	 * @param params The parameters for editing media.
	 * @returns The edited message on success.
	 */
	public async editMessageMedia<T extends Context<IMessage> = IncomingMessageContext>(params: IEditMessageMediaParams): Promise<T | true> {
		const response = await this.upload("editMessageMedia", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to edit only the reply markup of messages. 
	 * On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#editmessagereplymarkup)
	 * 
	 * @param params The parameters for editing reply markup
	 * @returns The edited message on success.
	 */
	public async editMessageReplyMarkup<T extends Context<IMessage> = IncomingMessageContext>(params: IEditMessageReplyMarkupParams): Promise<T | true> {
		const response = await this.upload("editMessageReplyMarkup", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to stop a poll which was sent by the bot. 
	 * On success, the stopped Poll is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#stoppoll)
	 * 
	 * @param {IStopPollParams} params - The parameters for stopping the poll.
	 * @returns {Promise<PollContext>} A Promise that resolves to a PollContext object representing the stopped poll.
	 */
	public async stopPoll<T extends Context<IPoll> = PollContext>(params: IStopPollParams): Promise<T> {
		return this.client.modules.contexts.getContext("Poll", await this.call("stopPoll", params));
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
	 * Returns True on success.
	 */
	public deleteMessage(params: IDeleteMessageParams): Promise<true> {
		return this.call("deleteMessage", params);
	}

	/**
	 * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendsticker)
	 * 
	 * @param The parameters for sending sticker.
	 * @returns The sent message on success.
	 */
	public async sendSticker<T extends Context<IMessage> = IncomingMessageContext>(params: ISendStickerParams): Promise<T> {
		return this.client.modules.contexts.getContext("Message", await this.upload("sendSticker", params));
	}

	/**
	 * Use this method to get a sticker set. On success, a StickerSet object is returned.
	 */
	public getStickerSet(params: IGetStickerSetParams): Promise<IStickerSet> {
		return this.call("getStickerSet", params);
	}

	/**
	 * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects.
	 */
	public getCustomEmojiStickers(params: IGetCustomEmojiStickersParams): Promise<ISticker[]> {
		return this.call("getCustomEmojiStickers", params);
	}

	/**
	 * Use this method to upload a .PNG file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times). Returns the uploaded File on success.
	 */
	public uploadStickerFile(params: IUploadStickerFileParams): Promise<IFile> {
		return this.upload("uploadStickerFile", params);
	}

	/**
	 * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. You must use exactly one of the fields png_sticker, tgs_sticker, or webm_sticker. Returns True on success.
	 */
	public createNewStickerSet(params: ICreateNewStickerSetParams): Promise<true> {
		return this.upload("createNewStickerSet", params);
	}

	/**
	 * Use this method to add a new sticker to a set created by the bot. You must use exactly one of the fields png_sticker, tgs_sticker, or webm_sticker. Animated stickers can be added to animated sticker sets and only to them. Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success.
	 */
	public addStickerToSet(params: IAddStickerToSetParams): Promise<true> {
		return this.upload("addStickerToSet", params);
	}

	/**
	 * Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success.
	 */
	public setStickerPositionInSet(params: ISetStickerPositionInSetParams): Promise<true> {
		return this.call("setStickerPositionInSet", params);
	}

	/**
	 * Use this method to delete a sticker from a set created by the bot. Returns True on success.
	 */
	public deleteStickerFromSet(params: IDeleteStickerFromSetParams): Promise<true> {
		return this.call("deleteStickerFromSet", params);
	}

	/**
	 * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker sets only. Video thumbnails can be set only for video sticker sets only. Returns True on success.
	 */
	public setStickerSetThumb(params: ISetStickerSetThumbParams): Promise<true> {
		return this.upload("setStickerSetThumb", params);
	}

	/**
	 * Use this method to send answers to an inline query. On success, True is returned.No more than 50 results per query are allowed.
	 */
	public answerInlineQuery(params: IAnswerInlineQueryParams): Promise<true> {
		return this.call("answerInlineQuery", params);
	}

	/**
	 * Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned.
	 */
	public answerWebAppQuery(params: IAnswerWebAppQueryParams): Promise<ISentWebAppMessage> {
		return this.call("answerWebAppQuery", params);
	}

	/**
	 * Use this method to send invoices. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendinvoice)
	 * 
	 * @param params The parameters for sending invoices.
	 * @returns The sent message on success.
	 */
	public async sendInvoice<T extends Context<IMessage> = IncomingMessageContext>(params: ISendInvoiceParams): Promise<T> {
		return this.client.modules.contexts.getContext("Message", await this.call("sendInvoice", params));
	}

	/**
	 * Use this method to create a link for an invoice. Returns the created invoice link as String on success.
	 */
	public createInvoiceLink(params: ICreateInvoiceLinkParams): Promise<string> {
		return this.call("createInvoiceLink", params);
	}

	/**
	 * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned.
	 */
	public answerShippingQuery(params: IAnswerShippingQueryParams): Promise<true> {
		return this.call("answerShippingQuery", params);
	}

	/**
	 * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
	 */
	public answerPreCheckoutQuery(params: IAnswerPreCheckoutQueryParams): Promise<true> {
		return this.call("answerPreCheckoutQuery", params);
	}

	/**
	 * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
	 * 
	 * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
	 */
	public setPassportDataErrors(params: ISetPassportDataErrorsParams): Promise<true> {
		return this.call("setPassportDataErrors", params);
	}

	/**
	 * Use this method to send a game. 
	 * On success, the sent Message is returned.
	 * 
	 * [Telegram Documentation](https://core.telegram.org/bots/api#sendgame)
	 * 
	 * @param params The parameters for sending game.
	 * @returns The sent message on success.
	 */
	public async sendGame<T extends Context<IMessage> = IncomingMessageContext>(params: ISendGameParams): Promise<T> {
		return this.client.modules.contexts.getContext("Message", await this.call("sendGame", params));
	}

	/**
	 * Use this method to set the score of the specified user in a game message. 
	 * On success, if the message is not an inline message, the Message is returned, otherwise True is returned. 
	 * Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
	 * 
	 * @param params The parameters for setting game score
	 * @returns The sent message on success.
	 */
	public async setGameScore<T extends Context<IMessage> = IncomingMessageContext>(params: ISetGameScoreParams): Promise<T | true> {
		const response = await this.call("setGameScore", params);
		return typeof response === "object" ? this.client.modules.contexts.getContext("IncomingMessage", response) : response;
	}

	/**
	 * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.
	 */
	public getGameHighScores(params: IGetGameHighScoresParams): Promise<IGameHighScore[]> {
		return this.call("getGameHighScores", params);
	}


	private getCustomizedParams(method: string, params: Record<string, any>) {
		params = Object.assign(params, this.defaultParams[method]);
		if(params.parse_mode) params[params.text ? "text" : "caption"] = removeParseModeErrors(params.text || params.caption, params.parse_mode);

		return params;
	}

	public async upload(method: string, params: Record<string, any>) {
		params = this.getCustomizedParams(method, params);
		
		const formdata = new FormData();
		for (let [key, value] of Object.entries(params)) {
			if(Buffer.isBuffer(value)) formdata.append(key, new Blob([value]), "file.data");
			//@ts-ignore
			else formdata.append(key, value);
		}

		return this.call(method, formdata, true);
	}

	public async call(method: string, params?: object, upload?: boolean): Promise<any> {
		if(!upload && params) params = this.getCustomizedParams(method, params);

		const response = await axios.post(`${this.url}/${method}`, params)
			.catch(error => { throw new TelegramError(error.response?.data, { method, params }) });
		return response.data.result;
	}
}