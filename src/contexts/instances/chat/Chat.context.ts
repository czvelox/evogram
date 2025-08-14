import { ChatDBContext } from '../../../database/instances/ChatDB.context';
import { TelegramChat } from '../../../types';
import { Context, ContextD } from '../../core';

@ContextD('Chat')
export class ChatContext extends Context<TelegramChat> {
	public id = this.source.id;
	public firstName = this.source.first_name;
	public lastName = this.source.last_name;
	public username = this.source.username;
	public type = this.source.type;
	public isForum = this.source.is_forum;

	/** Returns the user's full name. */
	public title = this.source.title || [this.source.first_name, this.source.last_name].join(' ').trimEnd();
	/** Returns the user's appeal, which is either their username or full name. */
	public appeal = (this.username && `@${this.username}`) ?? this.title;

	public chatDB: ChatDBContext = this.state?.chatDB;
}
