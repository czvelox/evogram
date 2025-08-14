import { MiddlewareContext, MiddlewareD } from '..';
import { CallbackQueryContext, ContextManager } from '../../contexts';
import { CallbackDataEntity } from '../../migrated';

class CallbackDataMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		// Проверяем данные callback_query и фиксируем событие
		if (!ctx.callback_query || !ctx.callback_query.data || !ctx.callback_query.data.startsWith('cdm')) return next();

		const buttonId = ctx.callback_query.data.replace('cdm ', '');
		const payload = Object.fromEntries(
			new URLSearchParams(decodeURI(ctx.callback_query?.data.slice(ctx.callback_query?.data.indexOf('?') + 1))).entries()
		);

		// Извлекаем данные из callback_query.data
		ctx.state.callbackData = (await ctx.client.database.getCallbackData(buttonId)) || {};
		if (ctx.state.callbackData) ctx.state.callbackData.payload = { ...(payload || {}), ...(ctx.state.callbackData.payload || {}) };

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

			await eval(`(${onClick})(callbackQuery, ctx.state.callbackData.payload)`);
		}

		return next();
	}
}
