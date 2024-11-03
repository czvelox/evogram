import { MiddlewareContext } from '../Middleware';
import { MiddlewareD } from '../middleware.decorator';

export class FloodControlMiddleware {
	public static lastActivity: Map<number, Date> = new Map();

	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: () => Promise<void>) {
		const logger = ctx.client.logger.getAccountLogger(Object.values<any>(ctx).find((x) => x?.from?.id)?.from.id),
			meta = { source: 'FloodControl Middleware' };

		// Проверка параметров floodControl
		if (!ctx.client.params.floodControl) {
			logger.debug('Flood control disabled; proceeding to next middleware', meta);
			return next();
		}

		const floodControl = ctx.client.params.floodControl;
		const userId = ctx.callback_query?.from?.id || ctx.message?.from?.id;

		if (!userId) {
			logger.debug('User ID not found in message or callback query; proceeding to next middleware', meta);
			return next();
		} else if (ctx.client.question.getQuestion(userId, false)) {
			logger.debug(`User is in the middle of a question; skipping flood control`, meta);
			return next();
		}

		const lastActivityTime = FloodControlMiddleware.lastActivity.get(userId);
		FloodControlMiddleware.lastActivity.set(userId, new Date());

		// Проверка времени последней активности для предотвращения флуда
		if (lastActivityTime) {
			if (floodControl === true) {
				logger.info(`Flood control active. Skipping further requests`, meta);
				return;
			} else if (typeof floodControl === 'object' && floodControl.delay) {
				const delay = floodControl.delay;
				const timeSinceLast = Date.now() - lastActivityTime.getTime();
				logger.debug(`Time since last activity: ${timeSinceLast}ms, delay threshold: ${delay}ms`, meta);

				if (timeSinceLast < delay) {
					logger.info(`Flood control delay active. Blocking request`, meta);
					return;
				}
			}
		}

		// Продолжаем к следующему middleware
		await next();
		logger.debug(`Processed request`, meta);

		// Удаление активности пользователя при активном floodControl
		if (floodControl === true) {
			FloodControlMiddleware.lastActivity.delete(userId);
			logger.debug(`Activity cleared from flood control records`, meta);
		}
	}
}
