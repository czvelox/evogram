import { CommandInstance, CommandManager } from '../../../commands';
import { TelegramSendMessageParams } from '../../../types';
import { ContextD } from '../../core';
import { MessageContext, CallbackQueryContext, IncomingMessageContext, Command } from '../../../migrated';

@ContextD('Command')
export class CommandContext extends IncomingMessageContext {
	public message?: MessageContext = this.state.message;
	public callbackQuery?: CallbackQueryContext = this.state.callbackQuery;

	public send(text: string, params?: Partial<TelegramSendMessageParams>): Promise<IncomingMessageContext>;
	public send(params: Omit<TelegramSendMessageParams, 'chat_id'>): Promise<IncomingMessageContext>;
	public send(data: any, params?: any): Promise<IncomingMessageContext> {
		//@ts-ignore
		return this.state.origin === 'callbackQuery' && this.client.params.keyboardMode
			? //@ts-ignore
				this.edit(data, params)
			: super.send(data, params);
	}

	public async redirect(command: CommandInstance, args?: Record<string, any>) {
		const cmd = this.client.commands.commands.find((x) => x.constructor.name === command.name);
		if (!cmd) throw new Error(`Command "${command.name}" not found`);

		this.state.command = cmd;
		this.state.commandArguments = args || {};

		return await cmd.preExecute(this, args || {});
	}

	public async redirectToBack() {
		const message = await this.client.database.message.getMessage(this.chat.id, this.id);
		if (!message || !message.history.at(-2)?.arguments) return;

		this.state.callbackData = {
			...this.state.callbackData,
			isBackButton: true,
		};

		return this.redirect(
			//@ts-ignore
			CommandManager.commands.find((x) => [x.params.name, x.name].includes(message.history.at(-2)?.command)),
			message.history.at(-2)?.arguments
		);
	}
}
