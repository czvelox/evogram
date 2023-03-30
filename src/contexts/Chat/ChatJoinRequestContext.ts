import type { IChatJoinRequest } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext, ChatContext, ChatInviteLinkContext } from "../";

export class ChatJoinRequestContext extends Context<IChatJoinRequest> {
	public client = this._client;

	/** The chat the join request was sent to. */
	public chat = this._client.contexts.getContext<ChatContext>("Chat", this._source.chat);
	/** The user who sent the join request. */
	public user = this._client.contexts.getContext<UserContext>("User", this._source.from);
	/** The invite link used to send the join request. Undefined if no invite link was used. */
	public link = this._source.invite_link && this._client.contexts.getContext<ChatInviteLinkContext>("ChatInviteLink", Object.assign(this._source.invite_link, { chat_id: this._source.chat.id }));
	/** The date when the join request was sent. */
	public date = new Date(this._source.date);

	/** Returns the ID of the user in the chat. */
	public get userChatID() { return this._source.user_chat_id }
	/** Returns the user's bio. */
	public get bio() { return this._source.bio }


	/**
	 * Approves the chat join request.
	 * @returns Promise that resolves with true on success, or rejects with an error on failure.
	 */
	public approve() {
		return this._client.api.approveChatJoinRequest({ chat_id: this._source.chat.id, user_id: this._source.from.id });
	}

	/**
	 * Declines the chat join request.
	 * @returns Promise that resolves with true on success, or rejects with an error on failure.
	 */
	public decline() {
		return this._client.api.declineChatJoinRequest({ chat_id: this._source.chat.id, user_id: this._source.from.id });
	}
}
