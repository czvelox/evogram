import { Context, ContextD } from '../../core';
import { TelegramBusinessMessagesDeleted } from '../../../types';
import { ChatContext } from '../../../migrated';

@ContextD('BusinessMessagesDeleted')
export class BusinessMessagesDeletedContext extends Context<TelegramBusinessMessagesDeleted> {
	/** Chat associated with the deleted business messages. */
	public chat = this.getContext<ChatContext>({ key: 'Chat', source: this.source.chat });

	/** Business connection ID related to the deleted messages. */
	public business_connection_id = this.source.business_connection_id;
	/** IDs of the deleted messages. */
	public message_ids = this.source.message_ids;
}
