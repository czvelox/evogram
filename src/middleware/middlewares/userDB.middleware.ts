import { MiddlewareContext, MiddlewareD } from '..';
import { UserDBContext } from '../../database/instances';

export class UserDBMiddleware {
	static async middleware(ctx: MiddlewareContext, next: any) {
		let userID: number = Object.values(ctx).find((x) => x?.from?.id)?.from.id;
		if (!userID) return next();

		ctx.state.userDB =
			(await ctx.client.database.getUser(userID)) ||
			new UserDBContext({
				client: ctx.client,
				source: { id: userID },
				state: ctx.state,
			});

		await next();
		ctx.state.userDB.save();
	}
}
