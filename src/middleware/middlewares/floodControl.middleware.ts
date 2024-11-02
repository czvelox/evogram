import { MiddlewareContext } from '../Middleware';
import { MiddlewareD } from '../middleware.decorator';

class FloodControlMiddleware {
	public static lastActivity: Map<number, Date> = new Map();

	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: () => Promise<void>) {
		if (!ctx.client.params.floodControl) return next();

		const floodControl = ctx.client.params.floodControl;
		const userId = ctx.callback_query?.from?.id || ctx.message?.from?.id;

		if (!userId) return next();
		else if (ctx.client.question.getQuestion(userId, false)) return next();

		const lastActivityTime = FloodControlMiddleware.lastActivity.get(userId);
		FloodControlMiddleware.lastActivity.set(userId, new Date());

		if (lastActivityTime) {
			if (floodControl === true) return;
			else if (typeof floodControl === 'object' && floodControl.delay) {
				const delay = floodControl.delay;
				const timeSinceLast = Date.now() - lastActivityTime.getTime();
				if (timeSinceLast < delay) return;
			}
		}

		// Proceed to the next middleware
		await next();
		if (floodControl === true) FloodControlMiddleware.lastActivity.delete(userId);
	}
}
