import { CommandManager } from '../..';
import { EvogramInlineKeyboardButton } from '../../keyboard';
import { Logger } from '../../logger';
import { ApiMiddleware, BaseMiddleware, MiddlewareContext, NextFunction } from './types';

/**
 * Middleware для добавления кнопки назад в inline клавиатуру
 */
@ApiMiddleware()
export class BackButtonMiddleware extends BaseMiddleware {
	private logger = new Logger('BackButtonMiddleware');
	priority: number = 3;

	static ALLOWED_METHODS = ['editMessageText', 'editMessageCaption', 'editMessageMedia', 'editMessageReplyMarkup'];

	async before({ params, method, state }: MiddlewareContext, next: NextFunction) {
		try {
			if (!BackButtonMiddleware.ALLOWED_METHODS.includes(method)) return next();
			if (!params.chat_id || params.noBackButton || params.reply_markup?.keyboard) return next();

			if ((params.reply_markup?.inline_keyboard as EvogramInlineKeyboardButton[][])?.find((x) => x.find((y) => y.isBackButton)))
				return this.logger.debug('Skipping back button middleware, because inline keyboard already has back button'), next();

			const message = await this.client.database.message.getMessage(params.chat_id, params.message_id);
			if (!message) return this.logger.debug('Skipping back button middleware, because message is not found'), next();

			let history = message.history;
			// Обработка, если данная кнопка является кнопкой назад
			if (state.callbackData?.isBackButton) {
				// Получаем команду, которая была вызвана кнопкой назад
				const activeCommand: any = CommandManager.commands.find((x: any) =>
					[x?.params.name, x?.name].includes(state.callbackData?.command)
				);
				// Если команда найдена, то удаляем все команды после нее
				// prettier-ignore
				if (activeCommand) history = history.slice(0,history.findIndex((x) => x.command === activeCommand.params.name));
			}

			if (history.at(-1)?.command === state?.command?.params?.name) history.pop();
			if (!history?.length)
				return this.logger.debug('Skipping back button middleware, because history is empty or has only one command'), next();

			history.reverse();

			const lastCommand: any = history.find((x) =>
				CommandManager.commands.find((y: any) => y.params?.name === x.command && y.params?.backButton)
			);
			const backButtonText = (CommandManager.commands.find((x: any) => x.params?.name === lastCommand?.command) as any)?.params
				?.backButton;
			if (!backButtonText) return this.logger.debug('Skipping back button middleware, because backButtonText is not set'), next();

			// prettier-ignore
			const backButton = [{ text: `‹ ${backButtonText}`, command: lastCommand?.command, payload: lastCommand?.arguments || {}, isBackButton: true }];

			this.logger.log(`Message nav history: ${history.map((x) => x.command).join(' -> ')}`);
			if (params?.reply_markup && params?.reply_markup?.inline_keyboard) params?.reply_markup?.inline_keyboard.push(backButton);
			else if (params) params.reply_markup = { inline_keyboard: [backButton] };

			return next();
		} catch (e) {
			this.logger.error(e);
			return next();
		}
	}
}
