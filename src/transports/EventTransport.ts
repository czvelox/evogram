import { Evogram } from '../Client';
import { ContextManager, UpdateContext } from '../contexts';

export enum EventTransportState {
	Enabled = 1,
	Disabled = 0,
}

export abstract class EventTransport {
	public state = EventTransportState.Disabled;
	constructor(protected client: Evogram) {}

	public abstract start(params: any, handle: any): void;
	public abstract stop(): void;

	protected async onUpdate(context: UpdateContext) {
		if (!context.name) return;

		let data = await this.client.middleware.execute({ client: this.client, ...context.source });
		if (!data) return;

		const updateContext = ContextManager.getContext<UpdateContext>('Update', { client: this.client, source: data });

		// @ts-ignore
		if (Object.keys(this.client.updates.handlers).find((x) => x === updateContext.name)) for (const handler of this.client.updates.handlers[updateContext.name]) await handler({ context: updateContext[updateContext.name], client: this.client });
	}
}
