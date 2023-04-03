import type { IEditMessageTextParams } from "../../interfaces";
import { BotContext } from "../";
import { MessageContext } from "./";

export class IncomingMessageContext extends MessageContext {
	public user = this.source.from && this._client.modules.contexts.getContext<BotContext>("Bot", this.source.from);

	/** Edit the text or caption of the message to the given text. */
	public edit(text: string, params?: Partial<IEditMessageTextParams>): Promise<IncomingMessageContext | true>;
	public edit(params: { text: string } & Partial<IEditMessageTextParams>): Promise<IncomingMessageContext | true>;
	public edit(text: any, params?: any): Promise<IncomingMessageContext | true> {
		if(params && !params.text) params.permissions = text;
		else if(!params) params = { text };

		const type: "caption" | "text" = this.source.photo || this.source.video || this.source.document || this.source.animation || this.source.audio || this.source.voice ? "caption" : "text";
		return this._client.api[type === "text" ? "editMessageText" : "editMessageCaption"]({ 
			chat_id: this.source.chat.id, message_id: this.source.message_id, [type]: text, ...params
		});
	}
}