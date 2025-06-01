import { TelegramServiceMessageType } from '../../../types';
import { ContextD } from '../../core';
import { MessageMethods } from './MessageMethods';

@ContextD('ServiceMessage')
export class ServiceMessage extends MessageMethods {
	public id = this.source.message_id;
	// prettier-ignore
	public name: TelegramServiceMessageType = 
            this.source.boost_added                          && "boost_added"                           ||
            this.source.proximity_alert_triggered            && "proximity_alert_triggered"             ||
            this.source.forum_topic_created 				 && "forum_topic_created"                   ||
            this.source.forum_topic_edited 				     && "forum_topic_edited"                    ||
            this.source.forum_topic_closed 				     && "forum_topic_closed"                    ||
            this.source.forum_topic_reopened 			     && "forum_topic_reopened"                  ||
            this.source.general_forum_topic_hidden 		     && "general_forum_topic_hidden"            ||
            this.source.general_forum_topic_unhidden 	     && "general_forum_topic_unhidden"          ||
            this.source.giveaway_created 				     && "giveaway_created"                      ||
            this.source.giveaway_completed 				     && "giveaway_completed"                    ||
            this.source.video_chat_scheduled 			     && "video_chat_scheduled"                  ||
            this.source.video_chat_started 				     && "video_chat_started"                    ||
            this.source.video_chat_ended 				     && "video_chat_ended"                      ||
            this.source.video_chat_participants_invited 	 && "video_chat_participants_invited"		||
            this.source.web_app_data 					     && "web_app_data"                          ||
            this.source.chat_background_set 				 && "chat_background_set"                   ||
            this.source.delete_chat_photo 			    	 && "delete_chat_photo"                     ||
            this.source.group_chat_created 			    	 && "group_chat_created"                    ||
            this.source.supergroup_chat_created 			 && "supergroup_chat_created"               ||
            this.source.channel_chat_created 			     && "channel_chat_created"                  ||
			this.source.successful_payment 			         && "successful_payment"                    ||
			this.source.users_shared 			     		 && "users_shared"                  		||
			this.source.chat_shared 			     		 && "chat_shared"                  			||
			this.source.write_access_allowed 			     && "write_access_allowed"                  ||
			this.source.refunded_payment 			     	 && "refunded_payment"                  	||
            this.source.message_auto_delete_timer_changed    && "message_auto_delete_timer_changed"      ;

	public boost_added = this.source.boost_added;
	public proximity_alert_triggered = this.source.proximity_alert_triggered;
	public forum_topic_created = this.source.forum_topic_created;
	public forum_topic_edited = this.source.forum_topic_edited;
	public forum_topic_closed = this.source.forum_topic_closed;
	public forum_topic_reopened = this.source.forum_topic_reopened;
	public general_forum_topic_hidden = this.source.general_forum_topic_hidden;
	public general_forum_topic_unhidden = this.source.general_forum_topic_unhidden;
	public giveaway_created = this.source.giveaway_created;
	public giveaway_completed = this.source.giveaway_completed;
	public video_chat_scheduled = this.source.video_chat_scheduled;
	public video_chat_started = this.source.video_chat_started;
	public video_chat_ended = this.source.video_chat_ended;
	public video_chat_participants_invited = this.source.video_chat_participants_invited;
	public web_app_data = this.source.web_app_data;
	public chat_background_set = this.source.chat_background_set;
	public delete_chat_photo = this.source.delete_chat_photo;
	public group_chat_created = this.source.group_chat_created;
	public channel_chat_created = this.source.channel_chat_created;
	public message_auto_delete_timer_changed = this.source.message_auto_delete_timer_changed;
	public successful_payment = this.source.successful_payment;
	public users_shared = this.source.users_shared;
	public chat_shared = this.source.chat_shared;
	public write_access_allowed = this.source.write_access_allowed;
	public refunded_payment = this.source.refunded_payment;
}
