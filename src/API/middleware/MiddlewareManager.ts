import { Evogram } from '../../Client';
import { Middleware } from '../../middleware/Middleware';
import { BaseMiddleware, MiddlewareContext, NextFunction } from './types';

export class MiddlewareManager {
	static middlewares: BaseMiddleware[] = [];
	private middlewares: BaseMiddleware[] = [];

	constructor(private client: Evogram) {
		//@ts-ignore
		this.middlewares = MiddlewareManager.middlewares.map((M) => new M(client)).sort((a, b) => a.priority - b.priority);
	}

	public use(middleware: BaseMiddleware): void {
		this.middlewares.push(middleware);
		this.middlewares.sort((a, b) => a.priority - b.priority);
	}

	private createNextFunction(middlewares: BaseMiddleware[], ctx: MiddlewareContext, index: number): NextFunction {
		return async () => {
			if (index < middlewares.length) {
				const middleware = middlewares[index];
				await middleware.execute(ctx, this.createNextFunction(middlewares, ctx, index + 1));
			}
		};
	}

	public async executeBefore(ctx: MiddlewareContext) {
		let allNextCalled = true;
		const middlewares = this.middlewares.sort((a, b) => a.priority - b.priority).filter((x) => x.before);

		// Recursive function to run middleware in order
		const run = async (index: number) => {
			if (index >= middlewares.length) return;

			const middleware = middlewares[index];
			let nextCalled = false;

			try {
				// Call the current middleware, providing context and the next function
				await middleware?.before?.(ctx, async () => {
					nextCalled = true;
					await run(index + 1); // Run the next middleware
				});
			} catch (error) {
				console.error(`Error in middleware at index ${index}:`, error);
				allNextCalled = false; // Middleware execution not fully successful
			}

			// Check if 'next' was called in this middleware
			if (!nextCalled) allNextCalled = false; // If 'next' wasn't called, mark as incomplete
		};

		// Start running from the first middleware
		await run(0);
		return allNextCalled ? ctx.params : null; // Return context if all middlewares executed successfully
	}

	public async executeAfter(ctx: MiddlewareContext): Promise<void> {
		for (const middleware of this.middlewares.sort((a, b) => a.priority - b.priority))
			if (middleware.after) await middleware.after(ctx);
	}

	public async executeError(ctx: MiddlewareContext, error: any): Promise<void> {
		for (const middleware of this.middlewares.sort((a, b) => a.priority - b.priority))
			if (middleware.error) await middleware.error(ctx, error);
	}
}
