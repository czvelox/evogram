import type { IChatMemberBanned } from "../../../interfaces";
import { Context } from "../../../modules/context";

export class ChatMemberBannedContext extends Context<IChatMemberBanned & { chat_id: number | string }> {
	/** Gets the unban date of the banned chat member. */
	public untilDate = new Date(this._source.until_date);

	/** Unbans the chat member. */
	public unban() {
		return this._client.api.unbanChatMember({ chat_id: this._source.chat_id, user_id: this._source.user.id });
	}
}