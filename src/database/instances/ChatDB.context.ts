import { Context, ContextD } from '../../contexts';
import { ChatEntity } from '../entities';

export type UserHistory = { command: any; arguments?: Record<string, any> };

@ContextD('ChatDB')
export class ChatDBContext<T extends Record<string, any> = any> extends Context<Partial<ChatEntity> & { chat_id: number }> {
	public readonly id = this.source.chat_id;

	private _createdAt = this.initCreatedAt();
	get createdAt(): Date { return this._createdAt; }
	set createdAt(value: Date) { this._createdAt = value; this.save({ created_at: value }); }

	private _lastActivity = this.source.last_activity || Date.now();
	get lastActivity(): number { return Number(this._lastActivity); }
	set lastActivity(value: number) { this._lastActivity = value; this.save({ last_activity: new Date(value) }); }

	private _status = this.source.status || 0;
	get status(): number { return Number(this._status); }
	set status(value: number) { this._status = value; this.save({ status: value }); }

	private _payload: T = this.initPayload();
	set payload(value: T) { this._payload = value; this.save({ payload: value }) }
	get payload(): T {
		return new Proxy(this._payload, {
			set: (target: T, property: string, value: any) => {
				//@ts-ignore
				target[property] = value;
				this.save({ payload: target });
				return true;
			},
			get: (target: T, property: string) => {
				const value = target[property];
				if (value && typeof value === 'object') {
					return new Proxy(value, {
						set: (obj: any, prop: string, val: any) => {
							obj[prop] = val;
							this.save({ payload: target });
							return true;
						},
					});
				}
				return value;
			},
		});
	}

	private initCreatedAt(): Date {
		return this.source.created_at ? new Date(this.source.created_at) : new Date();
	}

	private initPayload(): T {
		return (this.source?.payload as T) || this.structure(this.source as ChatEntity);
	}

	private saveTimeout: NodeJS.Timeout | null = null;
	private async save(data: Partial<ChatEntity>): Promise<void> {
		if (this.saveTimeout) clearTimeout(this.saveTimeout);

		this.saveTimeout = setTimeout(async () => {
			try {
				await this.saveToDatabase(data);
			} catch (error) {
				console.log(error);
			}
		}, 1000);
	}

	private async saveToDatabase(data: Partial<ChatEntity>): Promise<void> {
		const chatRepository = this.client.database.db.getRepository(ChatEntity);
		const isSaved = await chatRepository.countBy({ chat_id: this.id });

		if (!isSaved) await chatRepository.save({ chat_id: this.id, ...data });
		else await chatRepository.update({ chat_id: this.id }, data);
	}

	public structure(entity: ChatEntity): T {
		return {} as T;
	}
}
