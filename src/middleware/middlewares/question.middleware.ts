import { ContextManager } from '../../contexts';
import { MiddlewareContext, MiddlewareD } from '..';

class QuestionMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		const logger = ctx.client.logger.getAccountLogger(Object.values<any>(ctx).find((x) => x?.from?.id)?.from.id),
			meta = { source: 'Question Middleware' };

		if (!ctx.message?.from) {
			logger.debug('No message sender found; proceeding to next middleware', meta);
			return next();
		}

		const userId = ctx.message.from.id;
		const question = ctx.client.question.getQuestion(userId);

		// Логирование наличия активного вопроса
		if (question) {
			logger.info(`Active question found`, meta);
			return question(ContextManager.getContext('Message', { client: ctx.client, source: ctx.message, state: ctx.state }));
		}

		logger.debug(`No active question; proceeding to next middleware`, meta);
		return next();
	}
}
