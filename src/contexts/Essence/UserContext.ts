import type { IChatMember, IGetUserProfilePhotosParams, IUser } from "../../interfaces";
import { Context } from "../../modules/context";
import { getCountryWithCode } from "../../utils";
import { ChatMemberContext } from "../";

export class UserContext extends Context<IUser & { chat_id?: number | string }> {
	/** Returns the user's ID. */
	public get id() { return this._source.id }
	/** Returns the user's first name. */
	public get firstname() { return this._source.first_name }
	/** Returns the user's last name. */
	public get lastname() { return this._source.last_name }
	/** Returns the user's username. */
	public get username() { return this._source.username }
	/** Returns whether the user is a bot. */
	public get isBot() { return this._source.is_bot }
	/** Returns whether the user is a premium user. */
	public get isPremium() { return this._source.is_premium }
	/** Returns the user's language code and country. */
	public get language() { return this._source.language_code ? { code: this._source.language_code, country: getCountryWithCode(this._source.language_code) } : undefined }


	/** Returns the user's appeal, which is either their username or full name. */
	public get appeal() {
		return (this.username && `@${this.username}`) ?? this.fullname;
	}

	/** Returns the user's full name. */
	public get fullname() {
		return [this._source.first_name, this._source.last_name].join(" ").trimEnd();
	}


	/**
	 * Gets the user's profile photos.
	 * @param {Partial} [params] - Additional parameters for the API call.
	 * @returns The API response.
	 */
	public getProfilePhotos(params?: Partial<IGetUserProfilePhotosParams>) {
		return this._client.api.getUserProfilePhotos({ user_id: this._source.id, ...params });
	}

	#member: any;
	/**
	 * Gets the user's chat member object.
	 * @returns The chat member object or null if the user is not a member of a chat.
	*/
	public async getMember<T extends Context<IChatMember> = ChatMemberContext>(): Promise<T | null> {
		if(!this._source.chat_id) return null;

		if(!this.#member) this.#member = await this._client.api.getChatMember({ chat_id: this._source.chat_id, user_id: this._source.id });
		return this.#member;
	}
}