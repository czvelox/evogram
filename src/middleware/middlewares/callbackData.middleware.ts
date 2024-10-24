import { CommandManager } from '../../commands/CommandManager';
import { CallbackQueryContext, ContextManager } from '../../contexts';
import { CommandContext } from '../../contexts/migrated';
import { MiddlewareContext, MiddlewareD } from '..';
import { getCommandArguments } from '../../commands';

class CallbackDataMiddleware {
	@MiddlewareD()
	async middleware(ctx: any, next: any) {
		if (!ctx.callback_query || !ctx.callback_query.data || !ctx.callback_query.data.startsWith('cdm')) return next();
		const [commandName, userID, id, redirect] = ctx.callback_query.data.split('cdm ')[1].split(';');

		if (Number(userID) && Number(userID) !== ctx.callback_query.from.id) return;

		if (id) ctx.callback_query.data = JSON.parse((await ctx.client.database.getCallbackData(id))?.json_data || '{}');
		const callbackQuery = new CallbackQueryContext({ client: ctx.client, source: ctx.callback_query, state: ctx.state });
		// @ts-ignore
		if (ctx.callback_query.data.onClick) eval(`(${ctx.callback_query.data.onClick})(callbackQuery)`), delete ctx.callback_query.data.onClick;

		if (redirect && !ctx.callback_query.data.keyboard) {
			const data = await ctx.client.keyboard.get(redirect, ctx.callback_query.from.id, ctx.callback_query.data);
			await callbackQuery.message.edit(callbackQuery.message.text!, {
				reply_markup: { inline_keyboard: data.keyboard },
				...(typeof data.params === 'function' ? data.params() : data.params),
			});
		}

		if (commandName) {
			const command = CommandManager.commands.find((command) => command.params.name === commandName);
			if (!command) return next();

			// prettier-ignore
			const commandContext = ContextManager.getContext<CommandContext>("Command", { client: ctx.client, source: {
				...callbackQuery.message.source,
				from: callbackQuery.source.from
			}, state: { ...ctx.state, origin: "callbackQuery", callbackQuery }});

			//@ts-ignore
			command.execute(commandContext, { args: command.validateArguments(commandContext, await getCommandArguments(commandContext, command)) || {} });
		} else if (ctx.callback_query.data.keyboard) {
			callbackQuery.message.edit(ctx.callback_query.message?.text, { reply_markup: { inline_keyboard: ctx.callback_query.data.keyboard.inline_keyboard } });
		}

		return next();
	}
}
