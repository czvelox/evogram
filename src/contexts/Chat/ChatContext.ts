import type { IChat, IChatInviteLink, ICreateChatInviteLinkParams, IInputFile } from "../../interfaces";
import { Context } from "../../modules/context";
import { ChatInviteLinkContext, DetailedChatContext } from "../";

export class ChatContext extends Context<IChat> {
	/** The ID of the chat. */
	public get id() { return this._source.id }
	/** The type of the chat. */
	public get type() { return this._source.type }
	/** The title of the chat, or its username, or the concatenation of its first_name and last_name. */
	public get title() { return this._source.title || this._source.username || [this._source.first_name, this._source.last_name].join(" ").trimEnd() }
	/** Whether the chat is a forum. */
	public get isForum() { return this._source.is_forum }


	/**
	 * Calls the exportChatInviteLink method of the api object to export an invite link for the chat.
	 * @returns A Promise that resolves to the invite link.
	 */
	public exportInviteLink() {
		return this._client.api.exportChatInviteLink({ chat_id: this._source.id });
	}

	/**
	 * Calls the createChatInviteLink method of the api object to create a new invite link for the chat.
	 * @param [params] Optional parameters for creating the invite link.
	 * @returns A Promise that resolves to the new invite link.
	 */
	public createInviteLink<T extends Context<IChatInviteLink> = ChatInviteLinkContext>(params?: Partial<ICreateChatInviteLinkParams>) {
		return this._client.api.createChatInviteLink<T>({ chat_id: this._source.id, ...params });
	}

	/**
	 * Calls the setChatPhoto method of the api object to set the chat photo.
	 * @param photo The photo to set, represented as a URL or Buffer object.
	 * @returns A Promise that resolves to true if the photo was successfully set.
	 */
	public setPhoto(photo: IInputFile) {
		return this._client.api.setChatPhoto({ chat_id: this._source.id, photo });
	}

	/**
	 * Calls the setChatTitle method of the api object to set the chat title.
	 * @param title The new title of the chat.
	 * @returns A Promise that resolves to true if the title was successfully set.
	 */
	public setTitle(title: string) {
		return this._client.api.setChatTitle({ chat_id: this._source.id, title });
	}

	/**
	 * Calls the setChatDescription method of the api object to set the chat description.
	 * @param [description] Optional new description of the chat.
	 * @returns A Promise that resolves to true if the description was successfully set.
	 */
	public setDescription(description?: string) {
		return this._client.api.setChatDescription({ chat_id: this._source.id, description });
	}

	/**
	 * Calls the leaveChat method of the api object to leave the chat.
	 * @returns A Promise that resolves to true if the chat was successfully left.
	 */
	public leave() {
		return this._client.api.leaveChat({ chat_id: this._source.id });
	}

	#detailedChat: any;
	public async getChat<T extends Context<IChat> = DetailedChatContext>(): Promise<T> {
		if(!this.#detailedChat) this.#detailedChat = await this._client.api.getChat({ chat_id: this._source.id });
		return this.#detailedChat;
	}
}
