import { Evogram } from '../Client';
import { TelegramUpdate } from '../types';
import { UserDBMiddleware } from './middlewares/userDB.middleware';

/**
 * Represents the context for middleware functions.
 * Inherits properties from TelegramUpdate and adds the client and any other properties.
 */
export interface MiddlewareContext extends TelegramUpdate {
	client: Evogram;
	state: Record<string, any>; // Allow for any additional properties
}

/**
 * Type definition for middleware functions.
 * It takes a MiddlewareContext and a next function to call the next middleware in the stack.
 */
export type MiddlewareFunction = (ctx: MiddlewareContext, next: () => Promise<any>) => Promise<any>;

/**
 * Manages the registration and execution of middleware functions for the Evogram client.
 */
export class Middleware {
	constructor() {
		this.middlewares.push(UserDBMiddleware.middleware);
	}

	public static middlewares: MiddlewareFunction[] = [];
	// Array to hold registered middleware functions
	private middlewares: MiddlewareFunction[] = [];

	/**
	 * Registers a middleware function to the stack.
	 * @param middleware The middleware function to register.
	 */
	public use(middleware: MiddlewareFunction): void {
		this.middlewares.push(middleware);
	}

	/**
	 * Executes all registered middleware functions in order.
	 * @param context The context to pass to middleware (includes TelegramUpdate and client).
	 * @returns The context if all middleware executed successfully, or null if not.
	 */
	async execute(context: MiddlewareContext): Promise<MiddlewareContext | null> {
		let allNextCalled = true;
		const middlewares = [...this.middlewares, ...Middleware.middlewares];

		// Recursive function to run middleware in order
		const run = async (index: number) => {
			if (index < middlewares.length) {
				const middleware = middlewares[index];
				let nextCalled = false;

				try {
					// Call the current middleware, providing context and the next function
					await middleware(context, async () => {
						nextCalled = true;
						await run(index + 1); // Run the next middleware
					});
				} catch (error) {
					console.error(`Error in middleware at index ${index}:`, error);
					allNextCalled = false; // Middleware execution not fully successful
				}

				// Check if 'next' was called in this middleware
				if (!nextCalled) allNextCalled = false; // If 'next' wasn't called, mark as incomplete
			}
		};

		// Start running from the first middleware
		await run(0);
		return allNextCalled ? context : null; // Return context if all middlewares executed successfully
	}
}
