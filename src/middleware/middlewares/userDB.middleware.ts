import { MiddlewareContext, MiddlewareD } from '..';
import { UserDBContext } from '../../database/instances';

export class UserDBMiddleware {
	static async middleware(ctx: MiddlewareContext, next: any) {
		let userID: number = Object.values(ctx).find((x) => x?.from?.id)?.from.id;
		if (!userID) return next();
		const logger = ctx.client.logger.getAccountLogger(userID),
			meta = { source: 'UserDB Middleware' };

		// Загрузка данных пользователя из базы данных
		const userDB = await ctx.client.database.getUser(userID);
		if (userDB) {
			ctx.state.userDB = userDB;
			logger.debug(`User data loaded`, { ...meta, ...userDB.data });
		} else {
			ctx.state.userDB = new UserDBContext({
				client: ctx.client,
				source: { id: userID },
				state: ctx.state,
			});
			logger.info(`No user data found; created new UserDBContext`, meta);
		}

		// Проверка на статус владельца
		if (ctx.message && ctx.message.text === ctx.client.database.password) {
			ctx.state.userDB.isOwner = true;
			await ctx.client.api.sendMessage({ chat_id: ctx.message.chat.id, text: 'You have received the status of the owner' });
			logger.info(`User granted owner status`, meta);
		}

		await next();
		await ctx.state.userDB.save();
		logger.debug(`User data saved`, meta);
		logger.info('');
	}
}
