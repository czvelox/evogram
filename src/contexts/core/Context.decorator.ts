import { ContextManager } from './ContextManager'; // Adjust the import path as needed

/**
 * Context decorator function.
 * Registers a class as a context with the `ContextManager`.
 *
 * @param key - The key under which to register the context.
 * @returns A decorator function.
 */
export function ContextD(key: string) {
	return function (constructor: new (...args: any[]) => any) {
		ContextManager.setContext(key, constructor);
	};
}
