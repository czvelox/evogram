import { UserDBContext } from '../../../database/instances';
import { TelegramGetUserProfilePhotosParams, TelegramUser } from '../../../types';
import { Context, ContextD } from '../../core';

@ContextD('User')
export class UserContext extends Context<TelegramUser> {
	/** The user's identifier. */
	public id = this.source.id;
	/** The user's first name.*/
	public firstName = this.source.first_name;
	/** The user's last name. */
	public lastName = this.source.last_name;
	/** The user's username. */
	public username = this.source.username;
	/** Indicates whether the user is a bot. */
	public isBot = this.source.is_bot;
	/** The user's language code. */
	public languageCode = this.source.language_code;
	/** * Indicates whether the user is a premium member. */
	public isPremium = this.source.is_premium;

	/** Returns the user's full name. */
	public fullname = [this.source.first_name, this.source.last_name].join(' ').trimEnd();
	/** Returns the user's appeal, which is either their username or full name. */
	public appeal = (this.username && `@${this.username}`) ?? this.fullname;

	/**
	 * Gets the user's profile photos.
	 * @param {Partial} [params] - Additional parameters for the API call.
	 * @returns The API response.
	 */
	public getProfilePhotos(params?: Partial<TelegramGetUserProfilePhotosParams>) {
		return this.client.api.getUserProfilePhotos({ user_id: this.source.id, ...params });
	}

	public userDB: UserDBContext = this.state.userDB;

	// TODO: implement getting chatMember
}
