//@ts-nocheck
import { DataSource } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { CallbackDataEntity, UserEntity } from '../migrated/';
import { UserDBContext } from '../migrated/';
import { ContextManager, Evogram } from '../';

export class DatabaseManager {
	public db!: DataSource;
	public password = (Date.now() * 10000).toString(16);

	constructor(public client: Evogram) {}

	async init() {
		if (this.db) return this;
		console.log(`\x1b[34m❯\x1b[0m Send "${this.password}" to get the owner status`);

		if (!fs.existsSync(this.client.directory)) fs.mkdirSync(this.client.directory, { recursive: true });

		this.db = new DataSource( //@ts-ignore
			this.client.params.database
				? { ...this.client.params.database, entities: [...(this.client.params.database?.entities || []), UserEntity, CallbackDataEntity] }
				: {
						type: 'sqlite',
						database: path.join(this.client.directory, 'database.db'),
						entities: [UserEntity, CallbackDataEntity],
						synchronize: true, // Синхронизация создает таблицы, если их нет
					}
		);

		await this.db.initialize();
		return this;
	}

	// Получаем данные пользователя с использованием репозитория TypeORM
	public async getUser(id: string | number): Promise<UserDBContext> {
		const userRepository = this.db.getRepository(UserEntity);
		const user = await userRepository.findOne({ where: { user_id: Number(id) } });
		return ContextManager.getContext('UserDB', { client: this.client, source: user });
	}

	// Пример метода для добавления пользователя
	public async addUser(userData: Partial<UserEntity>): Promise<UserEntity> {
		const repository = this.db.getRepository(UserEntity);
		return await repository.save(new UserEntity(this.id));
	}

	public async addCallbackData(data: Partial<CallbackDataEntity>) {
		const repository = this.db.getRepository(CallbackDataEntity);
		return await repository.save(data).catch(() => {});
	}

	public async getCallbackData(id: string) {
		const repository = this.db.getRepository(CallbackDataEntity);
		return await repository.findOne({ where: { button_id: id } }).catch(() => {});
	}
}

console.log(new UserEntity(1));
