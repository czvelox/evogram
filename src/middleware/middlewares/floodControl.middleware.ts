import { MiddlewareContext } from '../Middleware';

export class FloodControlMiddleware {
	public static lastActivity: Map<number, Date> = new Map();

	static async middleware(ctx: MiddlewareContext, next: () => Promise<void>) {
		// Проверка параметров floodControl
		if (!ctx.client.params.floodControl) return next();

		const floodControl = ctx.client.params.floodControl;
		const userId = ctx.callback_query?.from?.id || ctx.message?.from?.id;

		if (!userId) return next();
		else if (ctx.client.question.getQuestion(userId, false)) return next();

		const lastActivityTime = FloodControlMiddleware.lastActivity.get(userId);
		FloodControlMiddleware.lastActivity.set(userId, new Date());

		// Проверка времени последней активности для предотвращения флуда
		if (lastActivityTime) {
			if (floodControl === true) {
				return;
			} else if (typeof floodControl === 'object' && floodControl.delay) {
				const delay = floodControl.delay;
				const timeSinceLast = Date.now() - lastActivityTime.getTime();

				if (timeSinceLast < delay) return;
			}
		}

		setTimeout(() => {
			FloodControlMiddleware.lastActivity.delete(userId);
		}, 10_000);

		// Продолжаем к следующему middleware
		await next();

		// Удаление активности пользователя при активном floodControl
		if (floodControl === true) FloodControlMiddleware.lastActivity.delete(userId);
	}
}
