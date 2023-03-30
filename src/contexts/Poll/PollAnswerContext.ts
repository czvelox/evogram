import type { IPollAnswer } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "../";

export class PollAnswerContext extends Context<IPollAnswer> {
	public client = this._client;

	/** User context for the user who changed the answer to the poll. */
	public user = this._client.contexts.getContext<UserContext>("User", this._source.user);
	/** Gets the ID of the poll. */
	public get id() { return this._source.poll_id }
	/** Gets the IDs of the options selected by the user. */
	public get options() { return this._source.option_ids }
}