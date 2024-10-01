import { MiddlewareContext, MiddlewareD } from '../../middleware';

class CallbackDataMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.callback_query || !ctx.callback_query.data || !ctx.callback_query.data.startsWith('cdm')) return next();
		const [, userID, id] = ctx.callback_query.data.split('cdm')[1].split(';');

		if (Number(userID) && Number(userID) !== ctx.callback_query.from.id) return;
		else if (!id) return next();

		ctx.callback_query.data = JSON.parse((await ctx.client.database.db.get('SELECT json_data FROM callback_data WHERE id = ?', id))?.json_data || '{}');
		// @ts-ignore
		if (ctx.callback_query.data.onClick) eval(`(${ctx.callback_query.data.onClick})(new (require("../../contexts").CallbackQueryContext)({ client: ctx.client, source: ctx.callback_query, state: ctx.state }))`), delete ctx.callback_query.data.onClick;

		next();
	}
}
