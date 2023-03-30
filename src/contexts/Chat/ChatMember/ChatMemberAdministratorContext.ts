import type { IChatMemberAdministrator } from "../../../interfaces";
import { Evogram } from "../../../Client";
import { ChatMemberMemberContext } from "./";

export class ChatMemberAdministratorContext extends ChatMemberMemberContext {
	constructor(client: Evogram, protected _source: IChatMemberAdministrator & { chat_id: number | string }) { super(client, _source) }

	/**
	 * Returns the chat member permissions.
	 * @returns An object containing the member permissions.
	 */
	public get permissions() {
		return {
			can_be_edited: this._source.can_be_edited,
			can_manage_chat: this._source.can_manage_chat,
			can_delete_messages: this._source.can_delete_messages,
			can_manage_video_chats: this._source.can_manage_video_chats,
			can_restrict_members: this._source.can_restrict_members,
			can_promote_members: this._source.can_promote_members,
			can_change_info: this._source.can_change_info,
			can_invite_users: this._source.can_invite_users,
			can_post_messages: this._source.can_post_messages,
			can_edit_messages: this._source.can_edit_messages,
			can_pin_messages: this._source.can_pin_messages,
			can_manage_topics: this._source.can_manage_topics
		};
	}

	/**
	 * Returns a boolean indicating whether the administrator is anonymous.
	 * @returns `true` if the administator is anonymous, `false` otherwise.
	 */
	public get isAnonymous() { return this._source.is_anonymous }

	/** * Returns the custom title of the administrator. */
	public get customTitle() { return this._source.custom_title }

	/**
	 * Demotes the current chat administrator to a member.
	 * @returns A Promise that resolves to `true` on success.
	 */
	public demote() {
		return this.promote({
			is_anonymous: false,
			can_manage_chat: false,
			can_post_messages: false,
			can_edit_messages: false,
			can_delete_messages: false,
			can_manage_video_chats: false,
			can_restrict_members: false,
			can_promote_members: false,
			can_change_info: false,
			can_invite_users: false,
			can_pin_messages: false,
			can_manage_topics: false
		});
	}

	/**
	 * Sets a custom title for the current chat administrator.
	 * @param customTitle - The custom title to set.
	 * @returns A Promise that resolves to true on success.
	 */
	public setCustomTitle(customTitle: string) {
		return this._client.api.setChatAdministratorCustomTitle({ chat_id: this._source.chat_id, user_id: this._source.user.id, custom_title: customTitle });
	}
}
