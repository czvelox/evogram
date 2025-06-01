import _ from 'lodash';
import { Evogram } from '../../Client';
import { ContextManager } from './ContextManager';
import { API } from '../../API';

/**
 * Type definition for the parameters used in the `Context` constructor.
 *
 * @template T - The type of the source data that the context wraps.
 */
export interface ContextParams<T = any> {
	client: Evogram; // The `Evogram` client associated with the context
	source: T; // The source data of generic type `T`
	state?: any; // Additional state information related to the context
}

/**
 * The `Context` class is a generic container that holds contextual data related to a particular client, source, and state.
 *
 * @template T - The type of the source data that the context wraps.
 */
export class Context<T> {
	// Private fields to store client, source, and state data
	readonly #client: Evogram; // Holds the client instance (of type `Evogram`)
	readonly #source: T; // Holds the source data of generic type `T`
	readonly #state: any; // Holds additional state data
	#stateProxy: any = null; // Приватное поле для прокси

	/**
	 * Constructs a new `Context` instance.
	 *
	 * @param client - The `Evogram` client associated with this context.
	 * @param source - The source data wrapped by this context.
	 * @param state - Additional state information related to the context.
	 */
	constructor({ client, source, state }: ContextParams<T>) {
		// Initialize the private fields with the provided parameters
		this.#client = client;
		this.#source = source;
		this.#state = state || {};
	}

	/**
	 * Gets the client associated with this context.
	 *
	 * @returns The `Evogram` client.
	 */
	public get client(): Evogram {
		return this.#client;
	}

	/**
	 * Gets the source data wrapped by this context.
	 *
	 * @returns The source data of type `T`.
	 */
	public get source(): T {
		return this.#source;
	}

	/**
	 * Gets the state associated with this context.
	 *
	 * @returns The state data, which could be of any type (unknown).
	 */
	public get state(): any {
		if (!this.#stateProxy && typeof this.#state === 'object' && this.#state !== null) {
			const handler = {
				set: (target: any, prop: PropertyKey, value: any) => {
					target[prop] = value;
					this.#client.api.state[prop] = value;
					return true;
				},
			};
			this.#stateProxy = new Proxy(this.#state, handler);
		}
		return this.#stateProxy || this.#state;
	}

	protected getContext<T>(params: { key: string; source: any; state?: unknown }): T {
		return ContextManager.getContext(params.key, {
			client: this.#client,
			...params,
			state: Object.assign(this.#state || {}, params.state),
		});
	}
}
