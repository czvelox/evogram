import { Evogram } from '../../Client';
import { MiddlewareManager } from './MiddlewareManager';

export type NextFunction = () => Promise<void>;

export interface MiddlewareContext {
	method: string;
	params: Record<string, any>;
	result?: any;
	// Флаг, указывающий, был ли запрос выполнен
	isExecuted: boolean;
	state: Record<string, any>;
}

export abstract class BaseMiddleware {
	constructor(protected client: Evogram) {
		this.client = client;
	}

	priority: number = 10;

	execute(ctx: MiddlewareContext, next: NextFunction): any {
		return next();
	}

	before?(ctx: MiddlewareContext, next: NextFunction): any;
	after?(ctx: MiddlewareContext): any;
	error?(ctx: MiddlewareContext, error: any): any;
}

// Декоратор для регистрации middleware
export function ApiMiddleware(): any {
	return function (ctor: typeof BaseMiddleware) {
		//@ts-ignore
		MiddlewareManager.middlewares.push(ctor);
	};
}
