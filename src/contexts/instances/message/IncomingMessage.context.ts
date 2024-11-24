import { TelegramEditMessageTextParams } from '../../../types';
import { ContextD } from '../../core';
import { BotContext } from '../../../migrated';
import { MessageContext } from './Message.context';

@ContextD('IncomingMessage')
export class IncomingMessageContext extends MessageContext {
	public senderBusinessBot = this.getContext<BotContext | undefined>({ key: 'Bot', source: this.source.sender_business_bot });
	public user = this.getContext<BotContext>({ key: 'Bot', source: this.source.from });

	/** Edit the text or caption of the message to the given text. */
	public edit(text: string, params?: Partial<TelegramEditMessageTextParams>): Promise<IncomingMessageContext | true>;
	public edit(params: { text: string } & Partial<TelegramEditMessageTextParams>): Promise<IncomingMessageContext | true>;
	public edit(text: any, params?: any): Promise<IncomingMessageContext | true> {
		if (params && !params.text) params.text = text;
		else if (!params) params = typeof text === 'string' ? { text } : text;

		const type: 'caption' | 'text' =
			this.source.photo || this.source.video || this.source.document || this.source.animation || this.source.audio || this.source.voice ? 'caption' : 'text';
		//@ts-ignore
		return this.client.api[type === 'text' ? 'editMessageText' : 'editMessageCaption']({
			chat_id: this.source.chat.id,
			message_id: this.source.message_id,
			[type]: params.text,
			...params,
		});
	}
}
