import { Command, getCommandArguments } from '../../commands';
import { CommandManager } from '../../commands/CommandManager';
import { MiddlewareContext, MiddlewareD } from '../';
import { KeyboardManager } from '../../keyboard';
import { CallbackQueryContext, CommandContext, MessageContext } from '../../migrated';
import { ContextManager } from '../../contexts';

class CommandMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		// Получаем логгер для аккаунта
		const logger = ctx.client.logger.getAccountLogger(Object.values<any>(ctx).find((x) => x?.from?.id)?.from.id),
			meta = { source: 'Command Middleware' };

		// Проверка наличия сообщения или callback-запроса
		if (!ctx.message && !ctx.callback_query) {
			logger.debug('Exiting middleware: no message or callback query', meta);
			return next();
		}

		// Обработка сообщений
		if (ctx.message) {
			logger.info(`Received message: ${ctx.message.text}`, { ...meta, ...ctx.message });
			const message = ContextManager.getContext<MessageContext>('Message', { client: ctx.client, source: ctx.message, state: ctx.state });
			const commandContext = ContextManager.getContext<CommandContext>('Command', {
				client: ctx.client,
				source: ctx.message,
				state: { ...ctx.state, origin: 'message', message },
			});
			const command = ctx.client.commands.getCommand(commandContext);

			// Логирование команды и клавиатурного режима
			if (ctx.client.params.keyboardMode?.menuCommand !== undefined && command?.params.name === ctx.client.params.keyboardMode?.menuCommand) {
				KeyboardManager.redirectHistory.set(ctx.message.from!.id, [{ redirect: ctx.client.params.keyboardMode!.menuCommand }]);
				logger.info(`User ${ctx.message.from?.id} redirected to menu command`, meta);
			}

			if (command) {
				const args = (await getCommandArguments(commandContext, command)) || {};
				logger.info(`Executing command: ${command.params.name}`, meta, { args });

				ctx.state.command = command;
				try {
					await command.execute(commandContext, { args });
				} catch (error: any) {
					await (command.onError || Command.onError)(commandContext, error);
				}
			}

			// Обработка callback-запросов
		} else if (ctx.callback_query) {
			logger.info(`Received callback query from user: ${ctx.callback_query?.from?.id}`, meta);
			if (!ctx.callback_query?.data || (typeof ctx?.callback_query?.data === 'string' && !ctx?.callback_query?.data?.startsWith('cdm'))) {
				logger.debug('Exiting middleware: callback query data does not start with "cdm"', meta);
				return next();
			}

			// const [commandName] = ctx.callback_query?.data.split('cdm ')[1].split(';');
			const callbackQuery = ContextManager.getContext<CallbackQueryContext>('CallbackQuery', { client: ctx.client, source: ctx.callback_query, state: ctx.state });
			const commandContext = ContextManager.getContext<CommandContext>('Command', {
				client: ctx.client,
				source: { ...callbackQuery.message.source, from: callbackQuery.source.from },
				state: { ...ctx.state, origin: 'callbackQuery', callbackQuery },
			});

			const command = ctx.client.commands.getCommand(commandContext);
			if (!command) return next();

			const args = (await getCommandArguments(commandContext, command)) || {};
			logger.info(`Executing callback command: ${command.params.name}`, meta, { args });

			ctx.state.command = command;

			try {
				await command.execute(commandContext, { args });
			} catch (error: any) {
				await (command.onError || Command.onError)(commandContext, error);
			}
		}

		return next();
	}
}
