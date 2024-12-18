import { CommandManager } from '../../../commands';
import { TelegramSendMessageParams } from '../../../types';
import { ContextD } from '../../core';
import { MessageContext, CallbackQueryContext, IncomingMessageContext } from '../../../migrated';

@ContextD('Command')
export class CommandContext extends IncomingMessageContext {
	public message?: MessageContext = this.state.message;
	public callbackQuery?: CallbackQueryContext = this.state.callbackQuery;

	public send(text: string, params?: Partial<TelegramSendMessageParams>): Promise<IncomingMessageContext>;
	public send(params: Omit<TelegramSendMessageParams, 'chat_id'>): Promise<IncomingMessageContext>;
	public send(data: any, params?: any): Promise<IncomingMessageContext> {
		//@ts-ignore
		return this.state.origin === 'callbackQuery' && this.client.params.keyboardMode ? this.edit(data, params) : super.send(data, params);
	}

	public redirect(commandName: string, args: Record<string, any>) {
		this.client.commands.commands.find((x) => x.params.name === commandName)?.execute(this, { args });
	}
}
