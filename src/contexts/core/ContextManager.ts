import type { ContextParams } from './Context';

/**
 * The `ContextManager` class is a static utility that manages different contexts.
 * It stores contexts in a dictionary and allows setting, getting, and deleting them by key.
 */
export class ContextManager {
	// A static record to hold contexts, where the key is a string and the value can be any class type.
	public static contexts: Record<string, new (params: ContextParams) => any> = {};

	/**
	 * Set the context for a given key.
	 *
	 * @param key - The key to associate with the context.
	 * @param context - The class constructor to set as the context.
	 * @returns The `ContextManager` class itself, for method chaining.
	 */
	public static setContext(key: string, context: new (params: ContextParams) => any): typeof ContextManager {
		this.contexts[key] = context;
		return this;
	}

	/**
	 * Get the context for a given key.
	 *
	 * If the context for the given key exists, it creates a new instance using the provided parameters.
	 * If not, it returns the source from the parameters.
	 *
	 * @param key - The key to get the context for.
	 * @param params - The parameters to use when creating a new context instance.
	 * @returns A new instance of the context class if found, otherwise returns the `source` from the params.
	 */
	public static getContext<T>(key: string, params: ContextParams): T {
		const ContextClass = this.contexts[key];
		return ContextClass && params.source ? new ContextClass(params) : params.source;
	}

	/**
	 * Delete the context for a given key.
	 *
	 * @param key - The key to delete the context for.
	 * @returns The `ContextManager` class itself, for method chaining.
	 */
	public static deleteContext(key: string): typeof ContextManager {
		delete this.contexts[key];
		return this;
	}
}
