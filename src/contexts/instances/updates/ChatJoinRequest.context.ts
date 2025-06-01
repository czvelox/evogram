import { TelegramChat, TelegramChatInviteLink, TelegramChatJoinRequest } from '../../../types';
import { Context, ContextD } from '../../core';
import { ChatContext, UserContext } from '../../../migrated';

@ContextD('ChatJoinRequest')
export class ChatJoinRequestContext extends Context<TelegramChatJoinRequest> {
	/** User that sent the join request. */
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.from });
	/** Chat to which the request was sent. */
	public chat = this.getContext<ChatContext>({ key: 'Chat', source: this.source.chat });
	/** Optional. Chat invite link that was used by the user to send the join request. */
	public inviteLink = this.getContext<TelegramChatInviteLink | undefined>({ key: 'ChatInviteLink', source: this.source.invite_link });

	/** Identifier of a private chat with the user who sent the join request. Can be used for direct communication for up to 5 minutes after the request is sent. */
	public userChatId = this.source.user_chat_id;
	/** Date the request was sent in Unix time. */
	public date = this.source.date;
	/** Optional. Bio of the user who sent the join request. */
	public bio = this.source.bio;

	/**
	 * Approves the join request, allowing the user to join the chat.
	 *
	 * @returns A Promise that resolves with the result of the API call to approve the chat join request.
	 */
	public approve() {
		return this.client.api.approveChatJoinRequest({ chat_id: this.source.chat.id, user_id: this.source.from.id });
	}

	/**
	 * Declines the join request, preventing the user from joining the chat.
	 *
	 * @returns A Promise that resolves with the result of the API call to decline the chat join request.
	 */
	public decline() {
		return this.client.api.declineChatJoinRequest({ chat_id: this.source.chat.id, user_id: this.source.from.id });
	}
}
