import {
	EmojiKey,
	TelegramChatActionType,
	TelegramForwardMessageParams,
	TelegramInputFile,
	TelegramInputPaidMedia,
	TelegramInputPollOption,
	TelegramMedia,
	TelegramMessage,
	TelegramPinChatMessageParams,
	TelegramPollOption,
	TelegramSendAnimationParams,
	TelegramSendAudioParams,
	TelegramSendContactParams,
	TelegramSendDiceParams,
	TelegramSendDocumentParams,
	TelegramSendGameParams,
	TelegramSendInvoiceParams,
	TelegramSendLocationParams,
	TelegramSendMediaGroupParams,
	TelegramSendMessageParams,
	TelegramSendPaidMediaParams,
	TelegramSendPhotoParams,
	TelegramSendPollParams,
	TelegramSendStickerParams,
	TelegramSendVenueParams,
	TelegramSendVideoNoteParams,
	TelegramSendVideoParams,
	TelegramSendVoiceParams,
	TelegramUnpinChatMessageParams,
} from '../../../types';
import { TemplateUtil } from '../../../utils';
import { Context } from '../../core';
import { MessageContext, IncomingMessageContext } from '../../../migrated';

export class MessageMethods extends Context<TelegramMessage> {
	/**
	 * Sends a text message to the chat.
	 * @param text The text of the message to send.
	 * @param params Optional parameters for sending the message.
	 * @returns A promise that resolves to the message context.
	 */
	public send(text: string, params?: Partial<TelegramSendMessageParams>): Promise<IncomingMessageContext>;
	/**
	 * Sends a message to the chat with optional parameters.
	 * @param params Parameters for sending the message, including chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public send(params: Omit<TelegramSendMessageParams, 'chat_id'>): Promise<IncomingMessageContext>;
	public send(data: any, params?: any): Promise<IncomingMessageContext> {
		return this.client.api.sendMessage({
			text: typeof data === 'string' ? data : data.text,
			chat_id: this.source.chat.id,
			business_connection_id: this.source.business_connection_id,
			message_thread_id: this.source.is_topic_message ? this.source.message_thread_id : undefined,
			...(params || (typeof data === 'object' ? data : {})),
		});
		// TODO: sending a message based on data from the context
	}

	public sendTemplate(
		templateName: string,
		payload?: Record<string, any>,
		params?: Omit<Omit<TelegramSendMessageParams, 'chat_id'>, 'text'>
	) {
		return this.send(Object.assign(TemplateUtil.getTemplate(templateName, Object.assign({}, this, payload)), params));
	}

	/**
	 * Sends a question to the chat.
	 * @param text The text of the message to send.
	 * @param callback A function to handle the response.
	 * @returns A promise that resolves to the message context.
	 */
	public sendQuestion(text: string, callback: (message: MessageContext) => void): Promise<IncomingMessageContext>;
	/**
	 * Sends a question to the chat with optional parameters.
	 * @param params Parameters for sending the message, including chat_id.
	 * @param callback A function to handle the response.
	 * @returns A promise that resolves to the message context.
	 */
	public sendQuestion(
		params: Omit<TelegramSendMessageParams, 'chat_id'>,
		callback: (message: MessageContext) => void
	): Promise<IncomingMessageContext>;
	public async sendQuestion(data: any, callback: any): Promise<IncomingMessageContext> {
		this.client.question.addQuestion(this.source.from?.id!, callback);
		return this.send(data);
	}

	/**
	 * Replies to the current message with a text message.
	 *
	 * @param text The text of the reply message.
	 * @param params Optional parameters for sending the reply message.
	 * @returns A promise that resolves to the message context.
	 */
	public reply(text: string, params?: Partial<TelegramSendMessageParams>): Promise<IncomingMessageContext>;
	/**
	 * Replies to the current message with specific parameters, including chat_id.
	 *
	 * @param params Parameters for sending the reply message, including chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public reply(params: TelegramSendMessageParams & { chat_id?: number | string }): Promise<IncomingMessageContext>;
	public reply(data: any, params?: any): Promise<IncomingMessageContext> {
		if (typeof data === 'string') params = Object.assign(params || {}, { text: data });
		else params = data;

		return this.send(Object.assign({ reply_to_message_id: this.source.message_id }, params));
	}

	/**
	 * Forwards the current message to another chat.
	 *
	 * @param chat_id The ID of the chat to which the message should be forwarded.
	 * @param params Optional parameters for forwarding the message.
	 * @returns A promise that resolves when the message has been forwarded.
	 */
	public forward(chat_id: string | number, params?: Partial<TelegramForwardMessageParams>) {
		return this.client.api.forwardMessage({
			message_thread_id: this.source.is_topic_message ? this.source.message_thread_id : undefined,
			from_chat_id: this.source.chat.id,
			message_id: this.source.message_id,
			chat_id,
			...params,
		});
	}

	/**
	 * Deletes the current message from the chat.
	 *
	 * @returns A promise that resolves when the message has been successfully deleted.
	 */
	public delete(timeout?: number) {
		return new Promise<Boolean>((res, rej) =>
			setTimeout(
				() =>
					this.client.api
						.deleteMessage({ chat_id: this.source.chat.id, message_id: this.source.message_id })
						.then(res)
						.catch(rej),
				timeout
			)
		);
	}

	/**
	 * Pins the current message in the chat.
	 *
	 * @param params Optional parameters for pinning the message.
	 * @returns A promise that resolves when the message has been successfully pinned.
	 */
	public pin(params?: Partial<TelegramPinChatMessageParams>) {
		return this.client.api.pinChatMessage({ chat_id: this.source.chat.id, message_id: this.source.message_id, ...params });
	}

	/**
	 * Unpins the current message from the chat.
	 *
	 * @param params Optional parameters for unpinning the message.
	 * @returns A promise that resolves when the message has been successfully unpinned.
	 */
	public unpin(params?: Partial<TelegramUnpinChatMessageParams>) {
		return this.client.api.unpinChatMessage({ chat_id: this.source.chat.id, message_id: this.source.message_id, ...params });
	}

	/**
	 * Sends a chat action (e.g., typing, uploading) to indicate activity in the chat.
	 *
	 * @param action The type of chat action to send.
	 * @returns A promise that resolves when the chat action has been sent.
	 */
	public sendAction(action: TelegramChatActionType) {
		return this.client.api.sendChatAction({
			chat_id: this.source.chat.id,
			message_thread_id: this.source.is_topic_message ? this.source.message_thread_id : undefined,
			action,
		});
	}

	/**
	 * Sends a photo to the chat.
	 *
	 * @param params Parameters for sending the photo, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendPhoto(params: Omit<TelegramSendPhotoParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a photo to the chat.
	 *
	 * @param photo The photo to send.
	 * @param params Optional parameters for sending the photo.
	 * @returns A promise that resolves to the message context.
	 */
	public sendPhoto(photo: TelegramInputFile, params?: Partial<TelegramSendPhotoParams>): Promise<IncomingMessageContext>;
	public sendPhoto(photoOrParams: any, params?: Partial<TelegramSendPhotoParams>): Promise<IncomingMessageContext> {
		const { photo, ...restParams } =
			photoOrParams instanceof Object && 'photo' in photoOrParams ? photoOrParams : { photo: photoOrParams, ...params };

		return this.client.api.sendPhoto({ chat_id: this.source.chat.id, photo, ...restParams });
	}

	/**
	 * Sends a video to the chat.
	 *
	 * @param params Parameters for sending the video, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVideo(params: Omit<TelegramSendVideoParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a video to the chat.
	 *
	 * @param video The video to send.
	 * @param params Optional parameters for sending the video.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVideo(video: TelegramInputFile, params?: Partial<TelegramSendVideoParams>): Promise<IncomingMessageContext>;
	public sendVideo(videoOrParams: any, params?: Partial<TelegramSendVideoParams>): Promise<IncomingMessageContext> {
		const { video, ...restParams } =
			videoOrParams instanceof Object && 'video' in videoOrParams ? videoOrParams : { video: videoOrParams, ...params };

		return this.client.api.sendVideo({ chat_id: this.source.chat.id, video, ...restParams });
	}

	/**
	 * Sends an audio file to the chat.
	 *
	 * @param params Parameters for sending the audio file, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendAudio(params: Omit<TelegramSendAudioParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends an audio file to the chat.
	 *
	 * @param audio The audio file to send.
	 * @param params Optional parameters for sending the audio file.
	 * @returns A promise that resolves to the message context.
	 */
	public sendAudio(audio: TelegramInputFile, params?: Partial<TelegramSendAudioParams>): Promise<IncomingMessageContext>;
	public sendAudio(audioOrParams: any, params?: Partial<TelegramSendAudioParams>): Promise<IncomingMessageContext> {
		const { audio, ...restParams } =
			audioOrParams instanceof Object && 'audio' in audioOrParams ? audioOrParams : { audio: audioOrParams, ...params };

		return this.client.api.sendAudio({ chat_id: this.source.chat.id, audio, ...restParams });
	}

	/**
	 * Sends a document to the chat.
	 *
	 * @param params Parameters for sending the document, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendDocument(params: Omit<TelegramSendDocumentParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a document to the chat.
	 *
	 * @param document The document to send.
	 * @param params Optional parameters for sending the document.
	 * @returns A promise that resolves to the message context.
	 */
	public sendDocument(document: TelegramInputFile, params?: Partial<TelegramSendDocumentParams>): Promise<IncomingMessageContext>;
	public sendDocument(documentOrParams: any, params?: Partial<TelegramSendDocumentParams>): Promise<IncomingMessageContext> {
		const { document, ...restParams } =
			documentOrParams instanceof Object && 'document' in documentOrParams
				? documentOrParams
				: { document: documentOrParams, ...params };

		return this.client.api.sendDocument({ chat_id: this.source.chat.id, document, ...restParams });
	}

	/**
	 * Sends an animation to the chat.
	 *
	 * @param params Parameters for sending the animation, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendAnimation(params: Omit<TelegramSendAnimationParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends an animation to the chat.
	 *
	 * @param animation The animation to send.
	 * @param params Optional parameters for sending the animation.
	 * @returns A promise that resolves to the message context.
	 */
	public sendAnimation(animation: TelegramInputFile, params?: Partial<TelegramSendAnimationParams>): Promise<IncomingMessageContext>;
	public sendAnimation(animationOrParams: any, params?: Partial<TelegramSendAnimationParams>): Promise<IncomingMessageContext> {
		const { animation, ...restParams } =
			animationOrParams instanceof Object && 'animation' in animationOrParams
				? animationOrParams
				: { animation: animationOrParams, ...params };

		return this.client.api.sendAnimation({ chat_id: this.source.chat.id, animation, ...restParams });
	}

	/**
	 * Sends a media group to the chat.
	 *
	 * @param params Parameters for sending the media group, excluding chat_id.
	 * @returns A promise that resolves to an array of message contexts.
	 */
	public sendMediaGroup(params: Omit<TelegramSendMediaGroupParams, 'chat_id'>): Promise<IncomingMessageContext[]>;
	/**
	 * Sends a media group to the chat.
	 *
	 * @param media An array of media items to send.
	 * @param params Optional parameters for sending the media group.
	 * @returns A promise that resolves to an array of message contexts.
	 */
	public sendMediaGroup(media: TelegramMedia[], params?: Partial<TelegramSendMediaGroupParams>): Promise<IncomingMessageContext[]>;
	public sendMediaGroup(mediaOrParams: any, params?: Partial<TelegramSendMediaGroupParams>): Promise<IncomingMessageContext[]> {
		const { media, ...restParams } = Array.isArray(mediaOrParams)
			? { media: mediaOrParams, ...params }
			: mediaOrParams instanceof Object && 'media' in mediaOrParams
				? mediaOrParams
				: { media: [], ...params };

		return this.client.api.sendMediaGroup({ chat_id: this.source.chat.id, media, ...restParams });
	}

	/**
	 * Sends a contact to the chat.
	 *
	 * @param params Parameters for sending the contact, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendContact(params: Omit<TelegramSendContactParams, 'chat_id'>): Promise<IncomingMessageContext> {
		return this.client.api.sendContact({ chat_id: this.source.chat.id, ...params });
	}

	/**
	 * Sends a dice with a specific emoji to the chat.
	 *
	 * @param params Parameters for sending the dice, excluding chat_id. The `emoji` field is optional.
	 * @returns A promise that resolves to the message context.
	 */
	public sendDice(params: Omit<TelegramSendDiceParams, 'chat_id'> & { emoji?: EmojiKey }): Promise<IncomingMessageContext>;
	/**
	 * Sends a dice with a specific emoji to the chat.
	 *
	 * @param emoji The emoji to use for the dice.
	 * @param params Optional parameters for sending the dice, excluding the `emoji` field.
	 * @returns A promise that resolves to the message context.
	 */
	public sendDice(emoji?: EmojiKey, params?: Partial<Omit<TelegramSendDiceParams, 'emoji'>>): Promise<IncomingMessageContext>;
	public sendDice(
		emojiOrParams?: EmojiKey | Omit<TelegramSendDiceParams, 'chat_id'>,
		params?: Partial<TelegramSendDiceParams>
	): Promise<IncomingMessageContext> {
		const { emoji, ...restParams } =
			typeof emojiOrParams === 'string'
				? { emoji: emojiOrParams, ...params }
				: emojiOrParams instanceof Object
					? { emoji: emojiOrParams.emoji, ...emojiOrParams }
					: { emoji: undefined, ...params };
		//@ts-ignore
		return this.client.api.sendDice({ chat_id: this.source.chat.id, emoji: emoji ? emojiMap[emoji] : undefined, ...restParams });
	}

	/**
	 * Sends an invoice to the chat.
	 *
	 * @param params Parameters for sending the invoice, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendInvoice(params: Omit<TelegramSendInvoiceParams, 'chat_id'>): Promise<IncomingMessageContext> {
		return this.client.api.sendInvoice({ chat_id: this.source.chat.id, ...params });
	}

	/**
	 * Sends a location to the chat.
	 *
	 * @param params Parameters for sending the location, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendLocation(params: Omit<TelegramSendLocationParams, 'chat_id'>): Promise<IncomingMessageContext> {
		return this.client.api.sendLocation({ chat_id: this.source.chat.id, ...params });
	}

	/**
	 * Sends paid media to the chat.
	 *
	 * @param params Parameters for sending the paid media, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendPaidMedia(params: Omit<TelegramSendPaidMediaParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends paid media to the chat with a specified star count.
	 *
	 * @param media An array of media items to send.
	 * @param star_count The number of stars to associate with the media.
	 * @param params Optional parameters for sending the paid media.
	 * @returns A promise that resolves to the message context.
	 */
	public sendPaidMedia(
		media: TelegramInputPaidMedia[],
		star_count: number,
		params?: Partial<TelegramSendPaidMediaParams>
	): Promise<IncomingMessageContext>;
	public sendPaidMedia(
		mediaOrParams: any,
		star_count?: number,
		params?: Partial<TelegramSendPaidMediaParams>
	): Promise<IncomingMessageContext> {
		const {
			media,
			star_count: paramStarCount,
			...restParams
		} = Array.isArray(mediaOrParams)
			? { media: mediaOrParams, ...params }
			: mediaOrParams instanceof Object && 'media' in mediaOrParams
				? mediaOrParams
				: { media: [], ...params };

		return this.client.api.sendPaidMedia({
			chat_id: this.source.chat.id,
			media,
			star_count: star_count ?? paramStarCount,
			...restParams,
		});
	}

	/**
	 * Sends a poll to the chat.
	 *
	 * @param params Parameters for sending the poll, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendPoll(params: Omit<TelegramSendPollParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a poll with a question and options to the chat.
	 *
	 * @param question The question to ask in the poll.
	 * @param options The options for the poll.
	 * @param params Optional parameters for sending the poll.
	 * @returns A promise that resolves to the message context.
	 */
	public sendPoll(
		question: string,
		options: TelegramInputPollOption[],
		params?: Partial<TelegramSendPollParams>
	): Promise<IncomingMessageContext>;
	public sendPoll(
		questionOrParams: any,
		options?: TelegramInputPollOption[],
		params?: Partial<TelegramSendPollParams>
	): Promise<IncomingMessageContext> {
		const {
			question,
			options: optionsArray,
			...restParams
		} = typeof questionOrParams === 'string'
			? { question: questionOrParams, options: options, ...params }
			: questionOrParams instanceof Object && 'question' in questionOrParams
				? questionOrParams
				: { question: '', options: [], ...params };

		return this.client.api.sendPoll({ chat_id: this.source.chat.id, question, options: optionsArray, ...restParams });
	}

	/**
	 * Sends a sticker to the chat.
	 *
	 * @param params Parameters for sending the sticker, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendSticker(params: Omit<TelegramSendStickerParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a sticker file to the chat.
	 *
	 * @param sticker The sticker file to send.
	 * @param params Optional parameters for sending the sticker.
	 * @returns A promise that resolves to the message context.
	 */
	public sendSticker(sticker: TelegramInputFile, params?: Partial<TelegramSendStickerParams>): Promise<IncomingMessageContext>;
	public sendSticker(stickerOrParams: any, params?: Partial<TelegramSendStickerParams>): Promise<IncomingMessageContext> {
		const { sticker, ...restParams } =
			stickerOrParams instanceof Object && 'sticker' in stickerOrParams ? stickerOrParams : { sticker: stickerOrParams, ...params };

		return this.client.api.sendSticker({ chat_id: this.source.chat.id, sticker, ...restParams });
	}

	/**
	 * Sends a venue to the chat.
	 *
	 * @param params Parameters for sending the venue, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVenue(params: Omit<TelegramSendVenueParams, 'chat_id'>): Promise<IncomingMessageContext> {
		return this.client.api.sendVenue({ chat_id: this.source.chat.id, ...params });
	}

	/**
	 * Sends a video note to the chat.
	 *
	 * @param params Parameters for sending the video note, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVideoNote(params: Omit<TelegramSendVideoNoteParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a video note file to the chat.
	 *
	 * @param video_note The video note file to send.
	 * @param params Optional parameters for sending the video note.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVideoNote(video_note: TelegramInputFile, params?: Partial<TelegramSendVideoNoteParams>): Promise<IncomingMessageContext>;
	public sendVideoNote(paramsOrVideoNote: any, params?: Partial<TelegramSendVideoNoteParams>): Promise<IncomingMessageContext> {
		const { video_note, ...restParams } =
			paramsOrVideoNote instanceof Object && 'video_note' in paramsOrVideoNote
				? paramsOrVideoNote
				: { video_note: paramsOrVideoNote, ...params };

		return this.client.api.sendVideoNote({ chat_id: this.source.chat.id, video_note, ...restParams });
	}

	/**
	 * Sends a voice message to the chat.
	 *
	 * @param params Parameters for sending the voice message, excluding chat_id.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVoice(params: Omit<TelegramSendVoiceParams, 'chat_id'>): Promise<IncomingMessageContext>;
	/**
	 * Sends a voice message file to the chat.
	 *
	 * @param voice The voice message file to send.
	 * @param params Optional parameters for sending the voice message.
	 * @returns A promise that resolves to the message context.
	 */
	public sendVoice(voice: TelegramInputFile, params?: Partial<TelegramSendVoiceParams>): Promise<IncomingMessageContext>;
	public sendVoice(paramsOrVoice: any, params?: Partial<TelegramSendVoiceParams>): Promise<IncomingMessageContext> {
		const { voice, ...restParams } =
			paramsOrVoice instanceof Object && 'voice' in paramsOrVoice ? paramsOrVoice : { voice: paramsOrVoice, ...params };

		return this.client.api.sendVoice({ chat_id: this.source.chat.id, voice, ...restParams });
	}

	/**
	 * Retrieves the database message associated with the current message.
	 *
	 * @returns A promise that resolves to the database message context.
	 */
	public getMessageDB() {
		return this.client.database.message.getMessage(this.source.chat.id, this.source.message_id);
	}
}
