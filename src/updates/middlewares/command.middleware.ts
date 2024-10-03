import { getCommandArguments } from '../../commands';
import { CommandManager } from '../../commands/CommandManager';
import { ContextManager } from '../../contexts';
import { CallbackQueryContext, CommandContext, MessageContext } from '../../contexts/migrated';
import { MiddlewareContext, MiddlewareD } from '../../middleware';

class CommandMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.message) return next();

		const message = ContextManager.getContext<MessageContext>('Message', { client: ctx.client, source: ctx.message, state: ctx.state });
		const commandContext = ContextManager.getContext<CommandContext>('Command', { client: ctx.client, source: ctx.message, state: { ...ctx.state, origin: 'message', message } });
		const command = CommandManager.getCommand(commandContext);

		if (command) command.execute(commandContext, { args: command.validateArguments(commandContext, await getCommandArguments(commandContext, command)) || {} });

		return next();
	}
}
