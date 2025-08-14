import { createHash } from 'crypto';
import { Command, CommandInstance, Evogram } from '..';
import { Logger } from '../logger';

export class SmartLink {
	constructor(private client: Evogram) {}
	private logger = new Logger('SmartLink');

	private command?: CommandInstance;
	private payload?: Record<string, any>;

	setCommand(command?: CommandInstance) {
		this.command = command;
		return this;
	}

	setPayload(payload: Record<string, any>) {
		this.payload = payload;
		return this;
	}

	toString() {
		const data = {
			command: this.command?.name,
			payload: this.payload,
		};

		const button_id = createHash('sha1').update(JSON.stringify(data)).digest('hex').slice(0, 12);
		this.client.database.addCallbackData(data).catch(() => {});

		this.logger.debug(`Generated smart link: https://t.me/${this?.client?.bot?.username}?start=${button_id}`);
		this.logger.debug(`Data: ${JSON.stringify(data)}`);
		if (!data.command) this.logger.warn('No command provided');

		return `https://t.me/${this.client.bot?.username}?start=${button_id}`;
	}
}
