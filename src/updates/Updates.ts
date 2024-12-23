import { Evogram } from '../Client';
import {
	BusinessConnectionContext,
	BusinessMessagesDeletedContext,
	CallbackQueryContext,
	ChatJoinRequestContext,
	ChosenInlineResultContext,
	MessageContext,
	PollAnswerContext,
	PollContext,
	ServiceMessage,
	ShippingQueryContext,
} from '../contexts/migrated';
import { Polling } from '../transports';
import {
	TelegramChatBoostRemoved,
	TelegramChatBoostUpdated,
	TelegramChatMemberUpdated,
	TelegramInlineQuery,
	TelegramMessageReactionCountUpdated,
	TelegramMessageReactionUpdated,
	TelegramPreCheckoutQuery,
	TelegramUpdateType,
} from '../types';

export type UpdateHandler<T> = (data: { context: T; client: Evogram }) => any;
export type UpdateHandlerMap = { [updateName in TelegramUpdateType]?: UpdateHandler<any>[] };

export class Updates {
	constructor(private client: Evogram) {}

	public handlers: UpdateHandlerMap = {};
	public polling = new Polling(this.client);

	/**
	 * Method for registering update handlers
	 * @param {TelegramUpdateType} update Name of the update to be processed
	 * @param {TelegramUpdateType} handler Callback function, which will be called on a new update
	 * @return {Updates} Return this
	 *
	 * @example
	 * 	client.updates.on("message", message => {
	 * 	    message.send("Hello, world!");
	 * 	});
	 */
	public on(
		update: 'message' | 'edited_message' | 'channel_post' | 'edited_channel_post' | 'business_message' | 'edited_business_message',
		handler: UpdateHandler<MessageContext>
	): this;
	public on(update: 'service_message', handler: UpdateHandler<ServiceMessage>): this;
	public on(update: 'business_connection', handler: UpdateHandler<BusinessConnectionContext>): this;
	public on(update: 'deleted_business_messages', handler: UpdateHandler<BusinessMessagesDeletedContext>): this;
	public on(update: 'message_reaction', handler: UpdateHandler<TelegramMessageReactionUpdated>): this;
	public on(update: 'message_reaction_count', handler: UpdateHandler<TelegramMessageReactionCountUpdated>): this;
	public on(update: 'inline_query', handler: UpdateHandler<TelegramInlineQuery>): this;
	public on(update: 'chosen_inline_result', handler: UpdateHandler<ChosenInlineResultContext>): this;
	public on(update: 'callback_query', handler: UpdateHandler<CallbackQueryContext>): this;
	public on(update: 'shipping_query', handler: UpdateHandler<ShippingQueryContext>): this;
	public on(update: 'pre_checkout_query', handler: UpdateHandler<TelegramPreCheckoutQuery>): this;
	public on(update: 'poll', handler: UpdateHandler<PollContext>): this;
	public on(update: 'poll_answer', handler: UpdateHandler<PollAnswerContext>): this;
	public on(update: 'my_chat_member' | 'chat_member', handler: UpdateHandler<TelegramChatMemberUpdated>): this;
	public on(update: 'chat_join_request', handler: UpdateHandler<ChatJoinRequestContext>): this;
	public on(update: 'chat_boost', handler: UpdateHandler<TelegramChatBoostUpdated>): this;
	public on(update: 'removed_chat_boost', handler: UpdateHandler<TelegramChatBoostRemoved>): this;
	public on(update: TelegramUpdateType, handler: (data: any) => void): this {
		this.handlers[update] = (this.handlers[update] || []).concat(handler);
		return this;
	}
}
