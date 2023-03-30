import type { IChatActionType, IForwardMessageParams, IMessage, IMessageEntity, IPinChatMessageParams, ISendMessageParams, IUnpinChatMessageParams } from "../../interfaces";
import { Context } from "../../modules/context";
import { ChatContext, UserContext, VenueContext, LocationContext, ForwardMessageContext, PollContext, ForumTopicContext } from "../";
import { IncomingMessageContext } from "./";

export class MessageContext extends Context<IMessage> {
	public source = this._source;
	public client = this._client;

	public user = this._source.from && this._client.contexts.getContext<UserContext>("User", this._source.from);
	public viaBot = this._source.via_bot && this._client.contexts.getContext<UserContext>("User", this._source.via_bot);

	public chat = this._client.contexts.getContext<ChatContext>("Chat", this._source.chat);
	public senderChat = this._source.sender_chat && this._client.contexts.getContext<ChatContext>("Chat", this._source.chat);

	public date = new Date(this._source.date);
	public editDate = this._source.edit_date && new Date(this._source.edit_date);

	public forwardMessage = this._source.forward_date && this._client.contexts.getContext<ForwardMessageContext>("ForwardMessage", { forward_from: this._source.forward_from, forward_from_chat: this._source.forward_from_chat, forward_from_message_id: this._source.forward_from_message_id, forward_signature: this._source.forward_signature, forward_sender_name: this.source.forward_sender_name, forward_date: this._source.forward_date });
	public replyMessage = this._source.reply_to_message && this._client.contexts.getContext<MessageContext>("Message", this._source.reply_to_message);

	public location = this._source.location && this._client.contexts.getContext<LocationContext>("Location", this._source.location);
	public venue = this._source.venue && this._client.contexts.getContext<VenueContext>("Venue", this._source.venue);

	public entities = this._source.entities || this._source.caption_entities && this._client.contexts.getContext<IMessageEntity>("MessageEntity", this._source.entities || this._source.caption_entities);
	public poll = this._source.poll && this._client.contexts.getContext<PollContext>("Poll", this._source.poll);

	public forumTopic = ["forum_topic_created", "forum_topic_edited", "forum_topic_closed", "forum_topic_reopened", "general_forum_topic_hidden", "general_forum_topic_unhidden"].map(x => {
		//@ts-ignore
		const data = this._source[x];
		if(data) return this._client.contexts.getContext<ForumTopicContext>("ForumTopic", Object.assign(data, { 
			chat_id: this._source.chat.id, 
			message_thread_id: this._source.message_thread_id, 
			updateType: x 
		}))
	}).find(x => x);

	public update = {
		new_chat_members: this._source.new_chat_members?.map(user => this._client.contexts.getContext<UserContext>("User", user)),
		left_chat_member: this._source.left_chat_member && this._client.contexts.getContext<UserContext>("User", this._source.left_chat_member),
		new_chat_title: this._source.new_chat_title,
		new_chat_photo: this._source.new_chat_photo,
		delete_chat_photo: this._source.delete_chat_photo,
		group_chat_created: this._source.group_chat_created,
		supergroup_chat_created: this._source.supergroup_chat_created,
		channel_chat_created: this._source.channel_chat_created,
		successful_payment: this._source.successful_payment,
		connected_website: this._source.connected_website,
		write_access_allowed: this._source.write_access_allowed,
		video_chat_scheduled: this._source.video_chat_scheduled,
		video_chat_started: this._source.video_chat_started,
		video_chat_ended: this._source.video_chat_ended,
		video_chat_participants_invited: this._source.video_chat_participants_invited,
		message_auto_delete_timer_changed: this._source.message_auto_delete_timer_changed,
		migrate_to_chat_id: this._source.migrate_to_chat_id,
		migrate_from_chat_id: this._source.migrate_from_chat_id,
		pinned_message: this._source.pinned_message,
		web_app_data: this._source.web_app_data
	}

	public media = {
		animation: this._source.animation,
		audio: this._source.audio,
		photo: this._source.photo,
		sticker: this._source.sticker,
		video: this._source.video,
		video_note: this._source.video_note,
		voice: this._source.voice,
		has_media_spoiler: this._source.has_media_spoiler,
		media_group_id: this._source.media_group_id
	}

	public get dice() { return this._source.dice }
	public get game() { return this._source.game }

	public get id() { return this._source.message_id }
	public get text() { return this._source.text }
	public get authorSignature() { return this._source.author_signature }
	public get invoice() { return this._source.invoice }
	public get replyMarkup() { return this._source.reply_markup }
	public get passportData() { return this._source.passport_data }
	public get hasProtectedContent() { return this._source.has_protected_content }
	public get isTopicMessage() { return this._source.is_topic_message }
	public get isAutomaticForward() { return this._source.is_automatic_forward }



	/**
	 * Sends a message to the chat.
	 * 
	 * @example 
	 * 	send("Hello, World!")
	 * 	send("<b>This text is bold</b>", { parse_mode: "HTML" })
	 * 	send({ text: "Hello, Evogram!" })
	 */
	public send<T extends Context<IMessage> = IncomingMessageContext>(text: string, params?: Partial<ISendMessageParams>): Promise<T>;
	public send<T extends Context<IMessage> = IncomingMessageContext>(params: { text: string } & Partial<ISendMessageParams>): Promise<T>;
	public send(text: any, params?: any) {
		if(params && !params.text) params.permissions = text;
		else if(!params) params = { text };

		return this._client.api.sendMessage(Object.assign({ chat_id: this.source.chat.id, message_thread_id: this.source.message_thread_id, text }, params));
	}

	/** Replies to the current message. */
	public reply<T extends Context<IMessage> = IncomingMessageContext>(text: string, params?: Partial<ISendMessageParams>): Promise<T>;
	public reply<T extends Context<IMessage> = IncomingMessageContext>(params: { text: string } & Partial<ISendMessageParams>): Promise<T>;
	public reply(text: any, params?: any) {
		return this.send(text, Object.assign({ reply_to_message_id: this.id }, params));
	}

	/** Deletes the current message. */
	public delete() {
		return this._client.api.deleteMessage({ chat_id: this.source.chat.id, message_id: this.source.message_id });
	}

	/** Forwards the current message to a specified chat. */
	public forward<T extends Context<IMessage> = IncomingMessageContext>(chat_id: string | number, params?: Partial<IForwardMessageParams>) {
		return this._client.api.forwardMessage<T>(Object.assign({ message_thread_id: this.source.message_thread_id, from_chat_id: this.source.chat.id, message_id: this.source.message_id, chat_id }, params));
	}

	/** Pin the message in the chat. */
	public pin(params?: Partial<IPinChatMessageParams>) {
		return this._client.api.pinChatMessage(Object.assign({ chat_id: this.source.chat.id, message_id: this.source.message_id }, params));
	}

	/** Unpin the message in the chat. */
	public unpin(params?: Partial<IUnpinChatMessageParams>) {
		return this._client.api.unpinChatMessage(Object.assign({ chat_id: this.source.chat.id, message_id: this.source.message_id }, params));
	}

	/** Send the action in the chat.  */
	public sendAction(action: IChatActionType) {
		return this._client.api.sendChatAction({ chat_id: this.source.chat.id, message_thread_id: this.source.message_thread_id, action });
	}
}