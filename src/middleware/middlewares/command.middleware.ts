import { getCommandArguments } from '../../commands';
import { CommandManager } from '../../commands/CommandManager';
import { ContextManager } from '../../contexts';
import { CommandContext, MessageContext } from '../../contexts/migrated';
import { MiddlewareContext, MiddlewareD } from '..';
import { KeyboardManager } from '../../keyboard';

class CommandMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.message) return next();

		const message = ContextManager.getContext<MessageContext>('Message', { client: ctx.client, source: ctx.message, state: ctx.state });
		const commandContext = ContextManager.getContext<CommandContext>('Command', { client: ctx.client, source: ctx.message, state: { ...ctx.state, origin: 'message', message } });
		const command = CommandManager.getCommand(commandContext);

		if (command === ctx.client.params.keyboardMode?.menuCommand) KeyboardManager.redirectHistory.set(ctx.message.from!.id, [{ redirect: ctx.client.params.keyboardMode!.menuCommand }]);
		if (command) command.execute(commandContext, { args: command.validateArguments(commandContext, await getCommandArguments(commandContext, command)) || {} });

		return next();
	}
}
