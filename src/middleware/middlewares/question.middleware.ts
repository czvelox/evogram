import { ContextManager } from '../../contexts';
import { MiddlewareContext, MiddlewareD } from '..';

class QuestionMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.message?.from) return next();

		const question = ctx.client.question.getQuestion(ctx.message.from.id);
		if (question) return question(ContextManager.getContext('Message', { client: ctx.client, source: ctx.message, state: ctx.state }));

		return next();
	}
}
