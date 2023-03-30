import type { IChatInviteLink, IEditChatInviteLinkParams } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "../";

export class ChatInviteLinkContext extends Context<IChatInviteLink & { chat_id: number | string }> {
	/** The user who created the chat invite link. */
	public creator = this._client.contexts.getContext<UserContext>("User", this._source.creator);
	/** The date and time when the chat invite link will expire, or `undefined` if it does not expire. */
	public expireDate = (this._source.expire_date && new Date(this._source.expire_date)) || undefined;

	/** The chat invite link. */
	public get link() { return this._source.invite_link }
	/** Whether the chat invite link creates a join request for users who follow it. */
	public get createsJoinRequest() { return this._source.creates_join_request }
	/** Whether the chat invite link is the primary invite link for the chat. */
	public get isPrimary() { return this._source.is_primary }
	/** Whether the chat invite link has been revoked. */
	public get isRevoked() { return this._source.is_revoked; }
	/** * The chat's name, if the chat is public and has a username. */
	public get name() { return this._source.name; }
	/** The maximum number of members that can join the chat using the chat invite link. */
	public get memberLimit() { return this._source.member_limit; }
	/** The number of users who have pending join requests for the chat. */
	public get pendingJoinRequestCount() { return this._source.pending_join_request_count; }


	/** Edits the chat invite link. */
	public edit<T extends Context<IChatInviteLink> = ChatInviteLinkContext>(params: Partial<IEditChatInviteLinkParams>) {
		return this._client.api.editChatInviteLink<T>(Object.assign({ chat_id: this._source.chat_id, invite_link: this._source.invite_link }, params));
	}

	/** Revokes the chat invite link. */
	public revoke<T extends Context<IChatInviteLink> = ChatInviteLinkContext>() {
		return this._client.api.revokeChatInviteLink<T>({ chat_id: this._source.chat_id, invite_link: this._source.invite_link });
	}
}
