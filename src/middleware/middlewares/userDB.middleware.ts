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

		if (ctx.message && ctx.message.text === ctx.client.database.password) {
			ctx.state.userDB.isOwner = true;
			ctx.client.api.sendMessage({ chat_id: ctx.message.chat.id, text: 'You have received the status of the owner' });
		}

		await next();
		ctx.state.userDB.save();
	}
}
