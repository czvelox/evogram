import { MiddlewareContext, MiddlewareD } from '..';
import { ContextManager } from '../../contexts';
import { TelegramUser } from '../../types';

export class UserDBMiddleware {
	static async middleware(ctx: MiddlewareContext, next: any) {
		let user: TelegramUser = Object.values(ctx).find((x) => x?.from?.id)?.from;
		if (!user) return next();

		// Загрузка данных пользователя из базы данных
		const userDB = await ctx.client.database.getUser(user.id);
		if (userDB?.banned) return;

		if (userDB) {
			ctx.state.userDB = userDB;
		} else {
			const source = await ctx.client.database.addUser({ user_id: user.id, telegram_data: user });
			ctx.state.userDB = ContextManager.getContext('UserDB', { client: ctx.client, source, state: ctx.state });
		}

		// Проверка на статус владельца
		if (ctx.message && ctx.message.text === ctx.client.database.password) {
			ctx.state.userDB.accessLevel = 128;
			await ctx.client.api.sendMessage({ chat_id: ctx.message.chat.id, text: 'You have received the status of the owner' });
		}

		return next();
	}
}
