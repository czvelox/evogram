import { TelegramUpdate, TelegramUpdateType } from '../../../types';
import { Context, ContextD, ContextParams } from '../../core';
import { PollAnswerContext, PollContext } from '../../migrated';

@ContextD('Update')
export class UpdateContext extends Context<TelegramUpdate> {
	constructor(contextParams: ContextParams) {
		super(contextParams);
		//@ts-ignore
		if (this.serviceMessage?.name) this.name = 'service_message';
		console.log(this.service_message);
	}

	/** The ID of the update. */
	public id = this.source.update_id;
	// prettier-ignore
	/** The type of the update determined based on the presence of specific properties in the source. */
	public name: TelegramUpdateType | undefined = 
            this.source.message                   && "message"                   ||
            this.source.edited_message            && "edited_message"            ||
            this.source.channel_post              && "channel_post"              ||
            this.source.edited_channel_post       && "edited_channel_post"       ||
            this.source.business_connection       && "business_connection"       ||
            this.source.business_message          && "business_message"          ||
            this.source.edited_business_message   && "edited_business_message"   ||
            this.source.deleted_business_messages && "deleted_business_messages" ||
            this.source.message_reaction          && "message_reaction"          ||
            this.source.message_reaction_count    && "message_reaction_count"    ||
            this.source.inline_query              && "inline_query"              ||
            this.source.chosen_inline_result      && "chosen_inline_result"      ||
            this.source.callback_query            && "callback_query"            ||
            this.source.shipping_query            && "shipping_query"            ||
            this.source.pre_checkout_query        && "pre_checkout_query"        ||
            this.source.poll                      && "poll"                      ||
            this.source.poll_answer               && "poll_answer"               ||
            this.source.my_chat_member            && "my_chat_member"            ||
            this.source.chat_member               && "chat_member"               ||
            this.source.chat_join_request         && "chat_join_request"         ||
            this.source.chat_boost                && "chat_boost"                ||
            this.source.removed_chat_boost        && "removed_chat_boost"         ;

	public message = this.getContext({ key: 'Message', source: this.source.message });
	public edited_message = this.getContext({ key: 'Message', source: this.source.edited_message });
	public channel_post = this.getContext({ key: 'Message', source: this.source.channel_post });
	public edited_channel_post = this.getContext({ key: 'Message', source: this.source.edited_channel_post });
	public business_connection = this.getContext({ key: 'Message', source: this.source.business_connection });
	public business_message = this.getContext({ key: 'Message', source: this.source.business_message });
	public edited_business_message = this.getContext({ key: 'Message', source: this.source.edited_business_message });
	public deleted_business_messages = this.getContext({ key: 'Message', source: this.source.deleted_business_messages });
	public message_reaction = this.getContext({ key: 'MessageReaction', source: this.source.message_reaction });
	public message_reaction_count = this.getContext({ key: 'MessageReactionCount', source: this.source.message_reaction_count });
	public inline_query = this.getContext({ key: 'InlineQuery', source: this.source.inline_query });
	public chosen_inline_result = this.getContext({ key: 'ChosenInlineResult', source: this.source.chosen_inline_result });
	public callback_query = this.getContext({ key: 'CallbackQuery', source: this.source.callback_query });
	public shipping_query = this.getContext({ key: 'ShippingQuery', source: this.source.shipping_query });
	public pre_checkout_query = this.getContext({ key: 'PreCheckoutQuery', source: this.source.pre_checkout_query });
	public poll = this.getContext<PollContext>({ key: 'Poll', source: this.source.poll });
	public poll_answer = this.getContext<PollAnswerContext>({ key: 'PollAnswer', source: this.source.poll_answer });
	public my_chat_member = this.getContext({ key: 'ChatMemberUpdated', source: this.source.my_chat_member });
	public chat_member = this.getContext({ key: 'ChatMemberUpdated', source: this.source.chat_member });
	public chat_join_request = this.getContext({ key: 'ChatJoinRequest', source: this.source.chat_join_request });
	public chat_boost = this.getContext({ key: 'ChatBoost', source: this.source.chat_boost });
	public removed_chat_boost = this.getContext({ key: 'RemovedChatBoost', source: this.source.removed_chat_boost });

	public service_message = this.getContext({ key: 'ServiceMessage', source: this.source.message });
}
