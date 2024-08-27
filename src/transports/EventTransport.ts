import { TelegramUpdate } from '../../src/types';
import { Evogram } from '../Client';

export enum EventTransportState {
	Enabled = 1,
	Disabled = 0,
}

export abstract class EventTransport {
	public state = EventTransportState.Disabled;
	constructor(protected client: Evogram) {}

	public abstract start(params: any, handle: any): void;
	public abstract stop(): void;

	protected async onUpdate(context: TelegramUpdate) {
		const data = await this.client.middleware.execute({ client: this.client, ...context });
		if (!data) return;

		//@ts-ignore
		for (const item of Object.keys(data)) if (Object.keys(this.client.updates.handlers).find((x) => x === item)) for (const handler of this.client.updates.handlers[item]) await handler({ context: data[item], client: this.client });
	}
}
