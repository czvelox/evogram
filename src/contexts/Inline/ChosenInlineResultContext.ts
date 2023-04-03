import type { IAnswerInlineQueryParams, IChosenInlineResult, IInlineQueryResult } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext, LocationContext } from "../";

export class ChosenInlineResultContext extends Context<IChosenInlineResult> {
	public client = this._client;

	/** The user who chose the inline result. */
	public user = this._client.modules.contexts.getContext<UserContext>("User", this._source.from);
	/** Sender location, only for bots that require user location */
	public location = this._source.location && this._client.modules.contexts.getContext<LocationContext>("Location", this._source.location);

	/** The unique identifier for the result that was chosen */
	public get id() { return this._source.result_id; }
	/** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
	public get inlineMessageID() { return this._source.inline_message_id; }
	/** The query that was used to obtain the result */
	public get query() { return this._source.query; }

	/**
	 * Internal implementation of the answer method
	 * @throws Error if inline_message_id is undefined.
	 */
	public answer(results: IInlineQueryResult[], params?: Partial<IAnswerInlineQueryParams>): Promise<true>;
	public answer(params: { inline_query_id?: string } & IAnswerInlineQueryParams): Promise<true>;
	public answer(results: any, params?: any): Promise<true> {
		if(!this._source.inline_message_id) throw new Error("Cannot answer inline query: inline_message_id is undefined\n- inline_message_id available only if there is an inline keyboard attached to the message.");

		if(params && !params.results) params.results = results;
		else if(!params) params = { results };
		
		return this._client.api.answerInlineQuery(Object.assign({inline_query_id: this._source.inline_message_id}, params));
	}
}
