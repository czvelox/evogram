import type { IUpdate, IUpdateName } from "../interfaces";
import { Context } from "../modules/context";

export class UpdateContext extends Context<IUpdate> {
	public source = this._source;

	/** The identifier of the update. */
	public get id() { return this._source.update_id }
	/** The name of the type of the update, if it can be determined from the update object. */
	public name: IUpdateName | undefined = 
		this._source.message && "message" ||
		this._source.edited_message && "edited_message" ||
		this._source.channel_post && "channel_post" ||
		this._source.edited_channel_post && "edited_channel_post" ||
		this._source.inline_query && "inline_query" ||
		this._source.callback_query && "callback_query" ||
		this._source.shipping_query && "shipping_query" ||
		this._source.pre_checkout_query && "pre_checkout_query" ||
		this._source.poll && "poll" ||
		this._source.poll_answer && "poll_answer" ||
		this._source.my_chat_member && "my_chat_member" ||
		this._source.chat_member && "chat_member" ||
		this._source.chat_join_request && "chat_join_request" ||
		this._source.chosen_inline_result && "chosen_inline_result";

	/** The context for the message in the update, if there is one. */
	public message = this._source.message && this._client.modules.contexts.getContext("Message", this._source.message);
	/** The context for the edited message in the update, if there is one. */
	public edited_message = this._source.edited_message && this._client.modules.contexts.getContext("Message", this._source.edited_message);
	/** The context for the channel post in the update, if there is one. */
	public channel_post = this._source.channel_post && this._client.modules.contexts.getContext("Message", this._source.channel_post);
	/** The context for the edited channel post in the update, if there is one. */
	public edited_channel_post = this._source.edited_channel_post && this._client.modules.contexts.getContext("Message", this._source.edited_channel_post);
	/** The context for the inline query in the update, if there is one. */
	public inline_query = this._source.inline_query && this._client.modules.contexts.getContext("InlineQuery", this._source.inline_query);
	/** The context for the chosen inline result in the update, if there is one. */
	public chosen_inline_result = this._source.chosen_inline_result && this._client.modules.contexts.getContext("ChosenInlineResult", this._source.chosen_inline_result);
	/** The context for the callback query in the update, if there is one. */
	public callback_query = this._source.callback_query && this._client.modules.contexts.getContext("CallbackQuery", this._source.callback_query);
	/** The context for the shipping query in the update, if there is one. */
	public shipping_query = this._source.shipping_query && this._client.modules.contexts.getContext("ShippingQuery", this._source.shipping_query);
	/** The context for the pre checkout query in the update, if there is one. */
	public pre_checkout_query = this._source.pre_checkout_query && this._client.modules.contexts.getContext("PreCheckoutQuery", this._source.pre_checkout_query);
	/** The context for the poll in the update, if there is one. */
	public poll = this._source.poll && this._client.modules.contexts.getContext("Poll", this._source.poll);
	/** The context for the poll answer in the update, if there is one. */
	public poll_answer = this._source.poll_answer && this._client.modules.contexts.getContext("PollAnswer", this._source.poll_answer);
	/** The context for the my chat member in the update, if there is one. */
	public my_chat_member = this._source.my_chat_member && this._client.modules.contexts.getContext("ChatMemberUpdated", this._source.my_chat_member);
	/** The context for the chat member in the update, if there is one. */
	public chat_member = this._source.chat_member && this._client.modules.contexts.getContext("ChatMemberUpdated", this._source.chat_member);
	/** The context for the chat join request in the update, if there is one. */
	public chat_join_request = this._source.chat_join_request && this._client.modules.contexts.getContext("ChatJoinRequest", this._source.chat_join_request);
}