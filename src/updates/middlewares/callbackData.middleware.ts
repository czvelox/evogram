import { CommandManager } from '../../commands/CommandManager';
import { CallbackQueryContext, ContextManager } from '../../contexts';
import { CommandContext } from '../../contexts/migrated';
import { MiddlewareContext, MiddlewareD } from '../../middleware';

class CallbackDataMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.callback_query || !ctx.callback_query.data || !ctx.callback_query.data.startsWith('cdm')) return next();
		const [commandName, userID, id] = ctx.callback_query.data.split('cdm ')[1].split(';');

		if (Number(userID) && Number(userID) !== ctx.callback_query.from.id) return;
		else if (!id) return next();

		if (id) ctx.callback_query.data = JSON.parse((await ctx.client.database.db.get('SELECT json_data FROM callback_data WHERE id = ?', id))?.json_data || '{}');
		const callbackQuery = new CallbackQueryContext({ client: ctx.client, source: ctx.callback_query, state: ctx.state });
		// @ts-ignore
		if (ctx.callback_query.data.onClick) eval(`(${ctx.callback_query.data.onClick})(callbackQuery)`), delete ctx.callback_query.data.onClick;
		if (commandName) {
			const command = CommandManager.commands.find((command) => command.params.name === commandName);
			if (!command) return next();

			// prettier-ignore
			const commandContext = ContextManager.getContext<CommandContext>("Command", { client: ctx.client, source: {
				...callbackQuery.message.source,
				from: callbackQuery.source.from
			}, state: { ...ctx.state, origin: "callbackQuery", callbackQuery }});

			//@ts-ignore
			command.execute(commandContext, { args: command.validateArguments(commandContext, ctx.callback_query.data) || {} });
		}

		return next();
	}
}
