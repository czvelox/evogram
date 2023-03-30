import type { IBanChatMemberParams, IChatMemberAdministrator, IChatMemberMember, IChatMemberRestricted, IChatPermissions, IPromoteChatMemberParams, IRestrictChatMemberParams } from "../../../interfaces";
import { Context } from "../../../modules/context";

export class ChatMemberMemberContext extends Context<(IChatMemberMember | IChatMemberAdministrator | IChatMemberRestricted) & { chat_id: number | string }> {
	/**
	 * Ban the chat member.
	 * @param params - The ban parameters.
	 * @returns A promise that resolves to true if the ban was successful.
	 */
	public ban(params?: Partial<IBanChatMemberParams>): Promise<true> {
		return this._client.api.banChatMember(Object.assign({ chat_id: this._source.chat_id, user_id: this._source.user.id }, params));
	}

	/**
	 * Ban the sender chat of the chat member.
	 * @returns A promise that resolves to true if the ban was successful.
	 */
	public banSenderChat(): Promise<true> {
		return this._client.api.banChatSenderChat({ chat_id: this._source.chat_id, sender_chat_id: this._source.user.id });
	}

	/**
	 * Restrict the chat member with the given permissions and parameters.
	 * @param permissions - The chat member's new permissions.
	 * @param params - The restrict parameters.
	 * @returns A promise that resolves to true if the restrict was successful.
	 */
	public restrict(permissions: IChatPermissions, params: Partial<IRestrictChatMemberParams>): Promise<true>;

	/**
	 * Restrict the chat member with the given parameters.
	 * @param params - The restrict parameters, including the new permissions.
	 * @returns A promise that resolves to true if the restrict was successful.
	 */
	public restrict(params: { permissions: IChatPermissions } & Partial<IRestrictChatMemberParams>): Promise<true>;

	/**
	 * Restrict the chat member with the given parameters.
	 * @param permissions - The chat member's new permissions.
	 * @param params - The restrict parameters, including the new permissions.
	 * @returns A promise that resolves to true if the restrict was successful.
	 */
	public restrict(permissions: any, params?: any): Promise<true> {
		if(params && !params.results) params.permissions = permissions;
		else if(!params) params = { permissions };

		return this._client.api.restrictChatMember(Object.assign({ chat_id: this._source.chat_id, user_id: this._source.user.id }, params));
	}

	/**
	 * Promote the chat member.
	 * @param params - The promote parameters.
	 * @returns A promise that resolves to true if the promotion was successful.
	 */
	public promote(params?: Partial<IPromoteChatMemberParams>) {
		return this._client.api.promoteChatMember(Object.assign({ chat_id: this._source.chat_id, user_id: this._source.user.id }, params));
	}
}
