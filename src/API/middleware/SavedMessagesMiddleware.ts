import { ApiMiddleware, BaseMiddleware, MiddlewareContext, NextFunction } from './types';

@ApiMiddleware()
export class SavedMessagesMiddleware extends BaseMiddleware {
	priority: number = 1;
	static ALLOWED_METHODS = [
		'sendMessage',
		'forwardMessage',
		'sendPhoto',
		'sendAudio',
		'sendDocument',
		'sendVideo',
		'sendAnimation',
		'sendLocation',
		'sendVenue',
		'sendContact',
		'sendPoll',
		'sendDice',
		'sendSticker',
		'sendVoice',
		'sendVideoNote',
		'editMessageText',
		'editMessageCaption',
		'editMessageMedia',
		'editMessageReplyMarkup',
	];

	async before({ params, method, state }: MiddlewareContext, next: NextFunction) {
		try {
			if (!SavedMessagesMiddleware.ALLOWED_METHODS.includes(method)) return next();

			state.message_id = parseInt(Math.random().toString(36).substring(2, 6), 36) * -1;

			await this.client.database.message?.addMessage({
				message_id: state.message_id.toString(),
				chat_id: Number(params.chat_id),
				created_at: new Date(),
				sended_data: params,
				payload: params.payload,
			});

			return next();
		} catch (e) {
			console.error(e);
			return next();
		}
	}

	async after({ params, method, result, state }: MiddlewareContext) {
		if (!SavedMessagesMiddleware.ALLOWED_METHODS.includes(method)) return;
		//@ts-ignore
		await this.client.database.message?.updateMessage(state.message_id, {
			payload: params.payload,
			telegram_data: result,
			user_id: result.from?.id,
			message_id: result.message_id.toString(),
		});
	}
}
