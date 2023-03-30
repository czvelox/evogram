import type { IEditForumTopicParams, IForumTopic, IForumTopicCreated, IForumTopicEdited, IForumTopicUpdate } from "../../interfaces";
import { Context } from "../../modules/context";

export class ForumTopicContext extends Context<{
	/** Icon color from IForumTopic */
	icon_color?: string, 
	/** Chat id for working methods */
	chat_id: number | string, 
	/** Message thread id for working methods */
	message_thread_id: number,
	/** Update type if the context is called from MessageContext */
	updateType?: IForumTopicUpdate 
} & (IForumTopic | IForumTopicCreated | IForumTopicEdited)> {
	/** Gets the id of the forum topic. */
	public get id() { return this._source.message_thread_id }
	/** Gets the name of the forum topic. */
	public get name() { return this._source.name }
	/** Gets the icon of the forum topic. */
	public get icon() { return { color: this._source.icon_color, emojiID: this._source.icon_custom_emoji_id } }
	/** Update type if the context is called from MessageContext */
	public get update() { return this._source.updateType }

	/** True, if the topic is General (only for MessageContext) */
	public isGeneral = this._source.updateType ? ["general_forum_topic_hidden", "general_forum_topic_unhidden"].includes(this._source.updateType) : false;

	/**
	 * Edits the forum topic.
	 * @param {object} params - The parameters to edit the forum topic.
	 * @throws {Error} - If the topic is General and has a mandatory name parameter for editing but it is missing.
	 */
	public edit(params: Partial<IEditForumTopicParams>) {
		if(this.isGeneral && !params.name) throw new Error("The topic is General and has a mandatory name parameter for editing");

		if(this.isGeneral && params.name) return this._client.api.editGeneralForumTopic({ chat_id: this._source.chat_id, name: params.name });
		else return this._client.api.editForumTopic(Object.assign({ chat_id: this._source.chat_id, message_thread_id: this._source.message_thread_id }, params));
	}

	/** Closes the forum topic. */
	public close() {
		if(this.isGeneral) return this._client.api.closeGeneralForumTopic({ "chat_id": this._source.chat_id });
		else return this._client.api.closeForumTopic({ chat_id: this._source.chat_id, message_thread_id: this._source.message_thread_id });
	}

	/** Reopens the forum topic. */
	public reopen() {
		if(this.isGeneral) this._client.api.reopenGeneralForumTopic({ "chat_id": this._source.chat_id });
		else return this._client.api.reopenForumTopic({ chat_id: this._source.chat_id, message_thread_id: this._source.message_thread_id });
	}

	/** Delete the forum topic. */
	public delete() {
		return this._client.api.deleteForumTopic({ chat_id: this._source.chat_id, message_thread_id: this._source.message_thread_id });
	}
}