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
		await this.client.middleware.execute({ client: this.client, ...context });
	}
}
