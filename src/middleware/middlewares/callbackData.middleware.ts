import { CallbackQueryContext, ContextManager } from '../../contexts';
import { CallbackDataEntity } from '../../migrated';
import { MiddlewareContext, MiddlewareD } from '..';

class CallbackDataMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		// Проверяем данные callback_query и фиксируем событие
		if (!ctx.callback_query || !ctx.callback_query.data || !ctx.callback_query.data.startsWith('cdm')) return next();

		// Извлекаем данные из callback_query.data
		ctx.state.callbackData = (await ctx.client.database.getCallbackData(ctx.callback_query.data.replace('cdm ', ''))) || {};
		const { onlyForUser, onClick } = ctx.state.callbackData as CallbackDataEntity;

		// Проверяем ID пользователя
		if (Number(onlyForUser) && Number(onlyForUser) !== ctx.callback_query.from.id) return;
		// Выполняем действие onClick, если оно определено
		if (onClick) {
			// Создаем контекст callback-запроса
			const callbackQuery = ContextManager.getContext<CallbackQueryContext>('CallbackQuery', {
				client: ctx.client,
				source: ctx.callback_query,
				state: ctx.state,
			});

			await eval(`(${onClick})(callbackQuery)`);
		}

		return next();
	}
}
