import { MiddlewareContext } from '..';
import { ChatDBContext } from '../../migrated';

export class ChatDBMiddleware {
	static async middleware(ctx: MiddlewareContext, next: any) {
		let chatID: number = Object.values(ctx).find((x) => x?.chat?.id)?.chat.id || ctx.callback_query?.message?.chat.id;
		if (!chatID) return next();

		// Загрузка данных пользователя из базы данных
		const chatDB = await ctx.client.database.getChat(chatID);

		if (chatDB) {
			ctx.state.chatDB = chatDB;
		} else {
			const source = await ctx.client.database.addChat({
				chat_id: chatID,
				telegram_data: Object.values(ctx).find((x) => x?.chat?.id)?.chat,
			});
			ctx.state.chatDB = new ChatDBContext({
				client: ctx.client,
				source,
				state: ctx.state,
			});
		}

		return next();
	}
}
