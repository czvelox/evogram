import { Evogram } from '../Client';
import { ContextManager, UpdateContext } from '../contexts';
import { sanitizeObject } from '../utils/Sanitize';

export enum EventTransportState {
	Enabled = 1,
	Disabled = 0,
}

export abstract class EventTransport {
	public state = EventTransportState.Disabled;
	constructor(protected client: Evogram) {}

	public abstract start(params: any, handle: any): void;
	public abstract stop(): void;

	public async onUpdate(context: UpdateContext) {
		if (!context.name) return;
		//@ts-ignore

		let data = await this.client.middleware.execute({ client: this.client, ...context.source, state: context.state || {} });
		if (!data) return;

		const updateContext = ContextManager.getContext<UpdateContext>('Update', { client: this.client, source: data, state: data.state });

		if (Object.keys(this.client.updates.handlers).find((x) => x === updateContext.name))
			// @ts-ignore
			// prettier-ignore
			for (const handler of this.client.updates.handlers[updateContext.name]) await handler({ context: updateContext[updateContext.name], client: this.client });
	}
}
