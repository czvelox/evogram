import { Evogram } from "../../Client";

export class Context<T> {
	constructor(protected _client: Evogram, protected _source: T) {}
	/**
	 * Converts the source object to a context object of a given type.
	 * @template TContext - Generic type parameter for the context object.
	 * @returns {TContext} The context object.
	 * 
	 * @example
	 * 	client.updates.on("message", message => {
	 * 		const user = message.user.toContext<CustomUserContext>();
	 * 		// Now user works correctly with your context
	 * 	})
	 */
	public toContext<TContext extends object>(): TContext {
		//@ts-ignore
		return this._source 
	}
}