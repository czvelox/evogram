import { TelegramGetUpdatesParams } from '../types';
import { EventTransport, EventTransportState } from './EventTransport';

/**
 * Represents a class for handling long-polling updates from the Telegram Bot API.
 */
export class Polling extends EventTransport {
	/**
	 * Starts long-polling with optional parameters.
	 * @param {TelegramGetUpdatesParams} [params] - Optional parameters for long-polling.
	 */
	public async start(params?: TelegramGetUpdatesParams) {
		console.log(`\x1b[34m❯\x1b[0m Bot has been started! (Polling)`);
		this.state = EventTransportState.Enabled;
		await this.worker(params);
	}

	/**
	 * Stops long-polling.
	 */
	public stop(): void {
		console.log(`\x1b[31m❯\x1b[0m Bot has been stopped! (Polling)`);
		this.state = EventTransportState.Disabled;
	}

	/**
	 * Worker function for long-polling updates.
	 * @param {TelegramGetUpdatesParams} [params={}] - Optional parameters for updates.
	 */
	private async worker(params: TelegramGetUpdatesParams = {}) {
		while (this.state === EventTransportState.Enabled) {
			try {
				// Fetch updates from the Telegram API
				const updates = await this.client.api.getUpdates(params);
				if (!updates || updates.length === 0) continue;

				// Process each update
				for (const update of updates) {
					this.onUpdate(update);
					// Update the offset parameter to fetch only new updates next time
					params.offset = update.update_id + 1;
				}
			} catch (error) {
				console.error(`\x1b[31m❌\x1b[0m Error during polling:`, error);
			}
		}
	}
}
