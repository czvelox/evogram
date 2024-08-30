import { TelegramUpdate, TelegramUpdateType } from '../../../types';
import { Context, ContextD } from '../../core';

@ContextD('Update')
export class UpdateContext extends Context<TelegramUpdate> {
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
	public editedMessage = this.getContext({ key: 'Message', source: this.source.edited_message });
	public channelPost = this.getContext({ key: 'Message', source: this.source.channel_post });
	public editedChannelPost = this.getContext({ key: 'Message', source: this.source.edited_channel_post });
	public businessConnection = this.getContext({ key: 'Message', source: this.source.business_connection });
	public businessMessage = this.getContext({ key: 'Message', source: this.source.business_message });
	public editedBusinessMessage = this.getContext({ key: 'Message', source: this.source.edited_business_message });
	public deletedBusinessMessages = this.getContext({ key: 'Message', source: this.source.deleted_business_messages });
	public messageReaction = this.getContext({ key: 'MessageReaction', source: this.source.message_reaction });
	public messageReactionCount = this.getContext({ key: 'MessageReactionCount', source: this.source.message_reaction_count });
	public inlineQuery = this.getContext({ key: 'InlineQuery', source: this.source.inline_query });
	public chosenInlineResult = this.getContext({ key: 'ChosenInlineResult', source: this.source.chosen_inline_result });
	public callbackQuery = this.getContext({ key: 'CallbackQuery', source: this.source.callback_query });
	public shippingQuery = this.getContext({ key: 'ShippingQuery', source: this.source.shipping_query });
	public preCheckoutQuery = this.getContext({ key: 'PreCheckoutQuery', source: this.source.pre_checkout_query });
	public poll = this.getContext({ key: 'Poll', source: this.source.poll });
	public pollAnswer = this.getContext({ key: 'PollAnswer', source: this.source.poll_answer });
	public myChatMember = this.getContext({ key: 'ChatMemberUpdated', source: this.source.my_chat_member });
	public chatMember = this.getContext({ key: 'ChatMemberUpdated', source: this.source.chat_member });
	public chatJoinRequest = this.getContext({ key: 'ChatJoinRequest', source: this.source.chat_join_request });
	public chatBoost = this.getContext({ key: 'ChatBoost', source: this.source.chat_boost });
	public removedChatBoost = this.getContext({ key: 'RemovedChatBoost', source: this.source.removed_chat_boost });
}
