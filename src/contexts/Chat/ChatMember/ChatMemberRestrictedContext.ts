import type { IChatMemberRestricted, IChatPermissions } from "../../../interfaces";
import { Evogram } from "../../../Client";
import { ChatMemberMemberContext } from "./";

export class ChatMemberRestrictedContext extends ChatMemberMemberContext {
	constructor(client: Evogram, protected _source: IChatMemberRestricted & { chat_id: number | string }) { super(client, _source) }

    /** The date when restrictions will be lifted for the chat member. */
	public untilDate = new Date(this._source.until_date);
	/** Returns a boolean indicating whether the user is a member of the chat. */
	public get isMember() { return this._source.is_member }
	/** Returns the Chat Member permissions. */
	public permissions = this._client.modules.contexts.getContext<IChatPermissions>("ChatPermissions", this._source);
}
