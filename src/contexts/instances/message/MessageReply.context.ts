import { TelegramTextQuote } from '../../../types';
import { Context, ContextD, ContextParams } from '../../core';
import { TelegramMessage } from '../../../types';
import * as Contexts from '../../../migrated';

export class ReplyContext extends Context<TelegramMessage> {
	public story = this.source.reply_to_story;
	public message = this.getContext<Contexts.MessageReplyContext | undefined>({ key: 'MessageReply', source: this.source.reply_to_message, state: this.source.quote });
	public origin = this.getContext<Contexts.MessageOriginContext | undefined>({ key: 'MessageOrigin', source: this.source.forward_origin });

	// prettier-ignore
	public type = 
        this.story   && "story"   ||
        this.message && "message" ||
        this.origin  && "origin"   ;
}

@ContextD('MessageReply')
export class MessageReplyContext extends Context<TelegramMessage> {
	public quote?: TelegramTextQuote = this.state.quote;
}
