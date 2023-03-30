import { IAnswerInlineQueryParams, IInlineQuery, IInlineQueryResult } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext, LocationContext } from "../";

export class InlineQueryContext extends Context<IInlineQuery> {
	public client = this._client

	/** Sender */
	public user = this._client.contexts.getContext<UserContext>("User", this._source.from);
	/** Sender location, only for bots that request user location */
	public location = this._source.location && this._client.contexts.getContext<LocationContext>("Location", this._source.location);

	
	/** Unique identifier for this query */
	public get id() { return this._source.id }

	/** Text of the query (up to 256 characters) */
	public get query() { return this._source.query }

	/** Offset of the results to be returned, can be controlled by the bot */
	public get offset() { return this._source.offset }

	/** Type of the chat from which the inline query was sent */
	public get chatType() { return this._source.chat_type }


	/** Internal implementation of the answer method */
	public answer(results: IInlineQueryResult[], params?: Partial<IAnswerInlineQueryParams>): Promise<true>;
	public answer(params: { inline_query_id?: string } & IAnswerInlineQueryParams): Promise<true>;
	public answer(results: any, params?: any): Promise<true> {
		if(params && !params.results) params.results = results;
		else if(!params) params = { results };
		
		return this._client.api.answerInlineQuery(Object.assign({ inline_query_id: this._source.id }, params));
	}
}