import { CustomTagManager } from '../../utils/CustomTagManager';
import { ApiMiddleware, BaseMiddleware, MiddlewareContext, NextFunction } from './types';

@ApiMiddleware()
export class CustomTagApiMiddleware extends BaseMiddleware {
	priority = 0;

	async before(ctx: MiddlewareContext, next: NextFunction) {
		if (typeof ctx.params?.text === 'string') ctx.params.text = await CustomTagManager.process(this.client, ctx.params.text);
		if (typeof ctx.params.caption === 'string') ctx.params.caption = await CustomTagManager.process(this.client, ctx.params.caption);
		if (typeof ctx.params.media?.caption === 'string')
			ctx.params.media.caption = await CustomTagManager.process(this.client, ctx.params.media.caption);

		return next();
	}
}
