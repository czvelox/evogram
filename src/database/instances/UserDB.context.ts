import _ from 'lodash';
import { Context, ContextD, ContextManager } from '../../contexts';
import { Command, CommandManager, UserEntity, UserContext } from '../../migrated';
import { TelegramUser } from '../../types';
import { MessageEntity } from '../entities/Message.entity';

export type UserHistory = { command: any; arguments?: Record<string, any>; chat_id: number; isCurrent?: boolean };

@ContextD('UserDB')
export class UserDBContext<T extends Record<string, any> = any> extends Context<Partial<UserEntity> & { telegram_data: TelegramUser }> {
	public readonly id = this.source.telegram_data.id;
	public readonly telegramData: UserContext = ContextManager.getContext('User', {
		client: this.client,
		source: this.source.telegram_data,
		state: this.state,
	});

	private _createdAt = this.initCreatedAt();
	get createdAt(): Date { return this._createdAt; }
	set createdAt(value: Date) { this._createdAt = value; this.save({ created_at: value }); }

	private _lastActivity = this.source.last_activity || Date.now();
	get lastActivity(): number { return Number(this._lastActivity); }
	set lastActivity(value: number) { this._lastActivity = value; this.save({ last_activity: new Date(value) }); }

	private _accessLevel = this.source.access_level || 0;
	get accessLevel(): number { return Number(this._accessLevel); }
	set accessLevel(value: number) { this._accessLevel = value; this.save({ access_level: value }); }

	private _banned = this.source.banned || false;
	get banned(): boolean { return Boolean(this._banned); }
	set banned(value: boolean) { this._banned = value; this.save({ banned: value }); }

	private _language = this.source.language || this.source.telegram_data.language_code;
	get language(): string | undefined { return this._language; }
	set language(value: string) { this._language = value; this.save({ language: value }); }

	private _payload: T = this.initPayload();
	set payload(value: T) { this._payload = value; this.save({ payload: value }) }
	get payload(): T {
		// Создаем прокси для автоматического сохранения при изменении любого поля
		return new Proxy(this._payload, {
			set: (target: T, property: string, value: any) => {
				//@ts-ignore
				target[property] = value;
				this.save({ payload: target }); // Сохраняем при любом изменении
				return true;
			},
			get: (target: T, property: string) => {
				const value = target[property];
				// Если значение - объект, также оборачиваем его в прокси
				if (value && typeof value === 'object') {
					return new Proxy(value, {
						set: (obj: any, prop: string, val: any) => {
							obj[prop] = val;
							this.save({ payload: target }); // Сохраняем при изменении вложенного объекта
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
		return (this.source?.payload as T) || this.structure(this.source as UserEntity);
	}

	private initHistory(): UserHistory[] {
		return (
			this.source.history?.map((x) => ({
				//@ts-ignore
				command: CommandManager.commands.find((y) => y.params?.name === x.command),
				arguments: x.arguments,
				chat_id: x.chat_id,
			})) || []
		);
	}

	public getBotMessages() {
		return this.client.database.db.getRepository(MessageEntity).findBy({ chat_id: this.id });
	}

	private async save(data: Partial<UserEntity>): Promise<void> {
		try {
			await this.saveToDatabase(data);
		} catch (error) {
			console.log(error);
		}
	}

	public prepareHistory(history?: UserHistory[]) {
		const processedHistory = (history || this.history)
			.slice(-50)
			.filter((x) => x.command)
			.map((x) => ({
				arguments: x.arguments,
				//@ts-ignore
				command: typeof x.command === 'function' ? CommandManager.commands.find((y) => x.command.name === y.name)?.params?.name : x.command,
				chat_id: x.chat_id,
			}));

		// Удаляем последовательные дубликаты, оставляя только последний элемент
		return processedHistory.reduce((acc: UserHistory[], current: UserHistory, index: number) => {
			if (current.command !== processedHistory[index + 1]?.command)
				acc.push(current);
			
			return acc;
		}, []);
	}

	private async saveToDatabase(data: any): Promise<void> {
		const userRepository = this.client.database.db.getRepository(UserEntity);
		const isSaved = await userRepository.countBy({ user_id: this.id });

		if (!isSaved) await userRepository.save({ user_id: this.id, telegram_data: this.telegramData.source, ...data });
		else await userRepository.update({ user_id: this.id }, data);
	}

	public structure(entity: UserEntity): T {
		return {} as T;
	}

	public history: UserHistory[] = this.initHistory();
	public saveHistory() {
		return this.client.database.db.getRepository(UserEntity).update({ user_id: this.id }, { history: this.prepareHistory() });
	}
}
