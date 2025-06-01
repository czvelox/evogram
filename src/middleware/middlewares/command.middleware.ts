import { Command, getCommandArguments } from '../../commands';
import { CommandManager } from '../../commands/CommandManager';
import { MiddlewareContext, MiddlewareD } from '../';
import { CallbackQueryContext, CommandContext, MessageContext } from '../../migrated';
import { ContextManager, InlineQueryContext } from '../../contexts';

class CommandMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.message && !ctx.callback_query && !ctx.inline_query) return next();

		const callbackData = ctx.callback_query?.data
			? (await ctx.state.callbackData) || {
					command: ctx.callback_query.data.split('?')[0],
					payload: Object.fromEntries(
						new URLSearchParams(decodeURI(ctx.callback_query?.data.slice(ctx.callback_query?.data.indexOf('?') + 1))).entries()
					),
				}
			: ctx.message?.text?.startsWith('/start ')
				? (await ctx.client.database.getCallbackData(ctx.message.text.replace('/start ', ''))) || undefined
				: undefined;

		// Обработка сообщений
		if (ctx.message) {
			ctx.state.callbackData = callbackData;

			const message = ContextManager.getContext<MessageContext>('Message', {
				client: ctx.client,
				source: ctx.message,
				state: ctx.state,
			});
			const commandContext = ContextManager.getContext<CommandContext>('Command', {
				client: ctx.client,
				source: ctx.message,
				state: { ...ctx.state, origin: 'message', message },
			});

			const command = callbackData?.command
				? ctx.client.commands.commands.find((x) => [x.params.name, x.constructor.name].includes(callbackData.command!))
				: ctx.client.commands.getCommand(commandContext);

			if (!command) return next();

			ctx.state.command = command;
			await command.preExecute(commandContext);
		} else if (ctx.callback_query) {
			if (callbackData) ctx.state.callbackData = callbackData;

			const callbackQuery = ContextManager.getContext<CallbackQueryContext>('CallbackQuery', {
				client: ctx.client,
				source: ctx.callback_query,
				state: ctx.state,
			});
			const commandContext = ContextManager.getContext<CommandContext>('Command', {
				client: ctx.client,
				source: { ...callbackQuery.message.source, from: callbackQuery.source.from },
				state: { ...ctx.state, origin: 'callbackQuery', callbackQuery },
			});

			let command = callbackData
				? ctx.client.commands.commands.find((x) => [x.params.name, x.constructor.name].includes(callbackData.command!))
				: ctx.client.commands.getCommand(commandContext);
			if (!command) return next();

			ctx.state.command = command;
			await command.preExecute(commandContext);
		} else if (ctx.inline_query) {
			ctx.state.callbackData = (await ctx.client.database.getCallbackData(ctx.inline_query.query.trim().split('?')[0])) || undefined;
			const inlineQuery = ContextManager.getContext<InlineQueryContext>('InlineQuery', {
				client: ctx.client,
				source: ctx.inline_query,
				state: ctx.state,
			});
			const command = ctx.client.commands.commands.find((x) =>
				[x.params.name, x.constructor.name].includes(
					ctx.state.callbackData?.command! || ctx.inline_query!.query.trim().split('?')[0]
				)
			);

			if (!command) return next();

			ctx.state.command = command;
			await command.inlinePreExecute(inlineQuery).catch((error) => {
				console.error(error);
			});
		}

		return next();
	}
}
