import { CallbackQueryContext, ContextManager } from '../../contexts';
import { CommandContext } from '../../contexts/migrated';
import { MiddlewareD } from '..';

class CallbackDataMiddleware {
	@MiddlewareD()
	async middleware(ctx: any, next: any) {
		// Получаем логгер для аккаунта
		const logger = ctx.client.logger.getAccountLogger(Object.values<any>(ctx).find((x) => x?.from?.id)?.from.id),
			meta = { source: 'CallbackData Middleware' };

		// Логирование запуска middleware
		logger.debug(`Middleware triggered`, meta);

		// Проверяем данные callback_query и фиксируем событие
		if (!ctx.callback_query || !ctx.callback_query.data || !ctx.callback_query.data.startsWith('cdm')) {
			logger.debug('Exiting middleware: callback query data is missing or does not start with "cdm"', meta);
			return next();
		}

		// Извлекаем данные из callback_query.data
		const [commandName, userID, id, redirect, isBackButton] = ctx.callback_query.data.split('cdm ')[1].split(';');
		logger.debug(`Parsed callback data: commandName=${commandName}, userID=${userID}, id=${id}, redirect=${redirect}, isBackButton=${isBackButton}`, meta);

		// Проверяем ID пользователя
		if (Number(userID) && Number(userID) !== ctx.callback_query.from.id) {
			logger.info(`Callback query ignored due to user ID mismatch: ${ctx.callback_query.from.id}`, meta);
			logger.debug(`Expected userID: ${userID}, actual userID: ${ctx.callback_query.from.id}`, meta);
			return;
		}

		// Загружаем данные callback_data из базы данных
		if (id) {
			const callbackData = await ctx.client.database.getCallbackData(id);

			ctx.state.callbackData = JSON.parse(callbackData?.json_data || '{}');
			logger.info(`Loaded callback data from database for ID ${id}`, meta);
			logger.debug(`Callback data loaded: ${JSON.stringify(ctx.state.callbackData)}`, meta);
		}

		// Создаем контекст callback-запроса
		const callbackQuery = ContextManager.getContext<CallbackQueryContext>('CallbackQuery', {
			client: ctx.client,
			source: ctx.callback_query,
			state: ctx.state,
		});

		// Выполняем действие onClick, если оно определено
		if (ctx.state.callbackData?.onClick) {
			logger.info('Executing onClick action in callback data', meta);

			try {
				eval(`(${ctx.state.callbackData.onClick})(callbackQuery)`);
				logger.debug(`onClick executed successfully for command: ${commandName}`, meta);
			} catch (error) {
				logger.error(`Error executing onClick: ${error}`, meta);
			}
			delete ctx.state.callbackData.onClick;
		}

		// Создаем командный контекст
		const commandContext = ContextManager.getContext<CommandContext>('Command', {
			client: ctx.client,
			source: {
				...callbackQuery.message.source,
				from: callbackQuery.source.from,
			},
			state: { ...ctx.state, origin: 'callbackQuery', callbackQuery },
		});

		// Редактирование сообщения для кнопки "Назад" или редиректа
		if ((redirect || isBackButton) && !ctx.state.callbackData?.keyboard && !commandName) {
			const data = Boolean(isBackButton)
				? await ctx.client.keyboard.getBack(commandContext)
				: await ctx.client.keyboard.get(commandContext, redirect, ctx.state.callbackData, commandName);

			await callbackQuery.message.edit(callbackQuery.message.text!, {
				reply_markup: { inline_keyboard: data.keyboard },
				...data.params,
			});
			logger.info(`Message edited for ${isBackButton ? 'back button' : 'redirect'}${redirect ? `: ${redirect}` : ``}`, meta);
			logger.debug(`Edited message with data: ${JSON.stringify(data)}`, meta);
		}

		// Редактирование сообщения с клавиатурой
		if (ctx.state.callbackData?.keyboard) {
			callbackQuery.message.edit(ctx.callback_query.message?.text, {
				reply_markup: { inline_keyboard: ctx.state.callbackData.keyboard.inline_keyboard },
			});
			logger.info('Message edited with provided inline keyboard', meta);
			logger.debug(`Inline keyboard data: ${JSON.stringify(ctx.state.callbackData.keyboard.inline_keyboard)}`, meta);
		}

		logger.info('CallbackDataMiddleware finished processing', meta);
		return next();
	}
}
