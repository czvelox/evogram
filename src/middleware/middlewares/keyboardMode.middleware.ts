import { MiddlewareContext, MiddlewareD } from '..';

class KeyboardMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.client.params.keyboardMode || !ctx.message || ctx.message?.chat.type !== 'private') return next();
		setTimeout(() => ctx.client.api.deleteMessage({ chat_id: ctx.message!.chat.id, message_id: ctx.message!.message_id }), 5000);

		return next();
	}
}
