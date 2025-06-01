import { Middleware, MiddlewareContext } from './Middleware';

/** Decorator to register a method as a middleware function */
export function MiddlewareD() {
	return function (
		targetClass: any, // The class where the method is decorated
		propertyKey: string, // The name of the method
		descriptor: PropertyDescriptor // The method descriptor
	) {
		const originalMethod = descriptor.value;

		if (typeof originalMethod === 'function') {
			// Add the method to the static middlewares array of the Middleware class
			Middleware.middlewares.push(async (ctx: MiddlewareContext, next: () => Promise<any>) => {
				// Call the original method
				await originalMethod.call(targetClass, ctx, next);
			});
		}
	};
}
