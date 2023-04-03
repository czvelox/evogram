import type { IUpdateName } from "../interfaces";
import { Evogram } from "../Client";
import { Polling, Webhook } from "../transports";
import { CallbackQueryContext, ChatJoinRequestContext, ChatMemberUpdatedContext, ChosenInlineResultContext, InlineQueryContext, MessageContext, PollAnswerContext, PollContext, PreCheckoutQueryContext, ShippingQueryContext, UpdateContext } from "../contexts";

export type IUpdateHandler<T> = (data: T) => Promise<void> | void;

export class Updates {
	public polling: Polling;
	public webhook: Webhook;

	/** Object with all update handlers */
	public handlers: { [updateName in IUpdateName]?: ((data: any) => Promise<void> | void)[]} = {}

	constructor(client: Evogram) {
		this.polling = new Polling(client, this);
		this.webhook = new Webhook(client, this);
	}

	/**
	 * Method for registering update handlers
	 * @param {IUpdateName} update Name of the update to be processed
	 * @param {IUpdateName} handler Callback function, which will be called on a new update
	 * @return {Updates} Return this
	 *
	 * @example
	 * 	client.updates.on("message", message => {
	 * 	    message.send("Hello, world!");
	 * 	});
	 */
	public on(update: "message" | "edited_message" | "channel_post" | "edited_channel_post", handler: IUpdateHandler<MessageContext>): this;
	public on(update: "inline_query", handler: IUpdateHandler<InlineQueryContext>): this;
	public on(update: "chosen_inline_result", handler: IUpdateHandler<ChosenInlineResultContext>): this;
	public on(update: "callback_query", handler: IUpdateHandler<CallbackQueryContext>): this;
	public on(update: "shipping_query", handler: IUpdateHandler<ShippingQueryContext>): this;
	public on(update: "pre_checkout_query", handler: IUpdateHandler<PreCheckoutQueryContext>): this;
	public on(update: "poll", handler: IUpdateHandler<PollContext>): this;
	public on(update: "poll_answer", handler: IUpdateHandler<PollAnswerContext>): this;
	public on(update: "my_chat_member" | "chat_member", handler: IUpdateHandler<ChatMemberUpdatedContext>): this;
	public on(update: "chat_join_request", handler: IUpdateHandler<ChatJoinRequestContext>): this;
	public on(update: IUpdateName, handler: (data: any) => void): this {
		this.handlers[update] = (this.handlers[update] || []).concat(handler);
		return this;
	}

	/**
	 * A method for handling Telegram updates
	 * @param {UpdateContext} update Update to be processed
	 */
	public async onUpdate(update: UpdateContext) {
		if(!update.name || !this.handlers[update.name]) return;
		//@ts-ignore
		for(const handler of this.handlers[update.name]) handler(update[update.name]);
	}
}