import { ContextManager } from '../../contexts';
import { MiddlewareContext, MiddlewareD } from '..';

class QuestionMiddleware {
	@MiddlewareD()
	async middleware(ctx: MiddlewareContext, next: any) {
		if (!ctx.message?.from) return next();
		if (ctx.client.question.priority === 'command' && ctx.state.command) return next();

		const userId = ctx.message.from.id;
		const question = ctx.client.question.getQuestion(userId);

		// Логирование наличия активного вопроса
		if (question) return question(ContextManager.getContext('Message', { client: ctx.client, source: ctx.message, state: ctx.state }));

		return next();
	}
}
