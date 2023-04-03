import type { IForwardMessage } from "../../interfaces";
import { Context } from "../../modules/context";
import { ChatContext, UserContext } from "../";

export class ForwardMessageContext extends Context<IForwardMessage> {
	/** The user who sent the forwarded message, if available. */
	public user = this._source.forward_from && this._client.modules.contexts.getContext<UserContext>("User", this._source.forward_from);
	/** The chat from which the forwarded message was sent, if available. */
	public chat = this._source.forward_from_chat && this._client.modules.contexts.getContext<ChatContext>("Chat", this._source.forward_from_chat);
	/** The date and time at which the message was forwarded, if available. */
	public date = this._source.forward_date && new Date(this._source.forward_date);

	/** The ID of the message that was forwarded. */
	public get id() { return this._source.forward_from_message_id }
	/** The signature of the forwarded message, if available. */
	public get signature() { return this._source.forward_signature }
	/** The sender's name of the forwarded message, if available. */
	public get senderName() { return this._source.forward_sender_name }
}