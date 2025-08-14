import { LogLevel, Logger } from '../../logger';
import { ApiMiddleware, BaseMiddleware, MiddlewareContext } from './types';

@ApiMiddleware()
export class CommandsHistoryMiddleware extends BaseMiddleware {
	private logger = new Logger('CommandsHistoryMiddleware', { logLevel: LogLevel.ERROR });
	priority: number = 2;

	static ALLOWED_METHODS = [
		'sendMessage',
		'editMessageText',
		'editMessageCaption',
		'editMessageMedia',
		'editMessageReplyMarkup',
		'sendPhoto',
		'sendAudio',
		'sendDocument',
		'sendVideo',
		'sendAnimation',
		'sendVideoNote',
		'sendVoice',
		'sendLocation',
		'sendVenue',
	];

	async after({ params, method, state, result }: MiddlewareContext) {
		if (!CommandsHistoryMiddleware.ALLOWED_METHODS.includes(method) || !result.message_id)
			return this.logger.debug(
				`Skipping commands history middleware, because method is not allowed or message_id is not set (${method})`
			);

		if (!state.command) return this.logger.debug('Skipping commands history middleware, because command not found');

		const message = await this.client.database.message.getMessage(params.chat_id, result.message_id);
		if (!message)
			return this.logger.debug(
				`Skipping commands history middleware, because message is not found (id: ${result.message_id}, chat_id: ${params.chat_id})`
			);

		if (!state.callbackData?.isBackButton) {
			const lastMessage = message.history.at(-1);

			if (lastMessage && lastMessage?.command === state.command?.params.name) {
				lastMessage.arguments = state.commandArguments;
				lastMessage.chat_id = params.chat_id;
			} else {
				message.history.push({
					command: state.command.params.name,
					arguments: state.commandArguments,
					chat_id: params.chat_id,
				});
			}
		} else {
			message.history.pop();
		}

		//@ts-ignore
		this.client.database.message.updateMessage(message.message_id, { history: message.history });
	}
}
