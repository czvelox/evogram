import { DataSource } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { CallbackDataEntity, UserEntity } from './entities';
import { UserDBContext } from './instances';
import { ContextManager, Evogram } from '..';

export class DatabaseManager {
	public db!: DataSource;

	constructor(public client: Evogram) {}

	async init() {
		if (this.db) return this;

		const dir = path.join(process.cwd(), '.evogram', this.client.params.token.split(':')[0] || 'default');
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

		this.db = new DataSource({
			type: 'sqlite',
			database: path.join(dir, 'database.db'),
			entities: [UserEntity, CallbackDataEntity],
			synchronize: true, // Синхронизация создает таблицы, если их нет
		});

		await this.db.initialize();
		return this;
	}

	// Получаем данные пользователя с использованием репозитория TypeORM
	public async getUser(id: string | number): Promise<UserDBContext> {
		const userRepository = this.db.getRepository(UserEntity);
		const user = await userRepository.findOne({ where: { id: Number(id) } });
		return ContextManager.getContext('UserDB', { client: this.client, source: user });
	}

	// Пример метода для добавления пользователя
	public async addUser(userData: Partial<UserEntity>): Promise<UserEntity> {
		const repository = this.db.getRepository(UserEntity);
		return await repository.save(repository.create(userData));
	}

	public async addCallbackData(data: Partial<CallbackDataEntity>) {
		const repository = this.db.getRepository(CallbackDataEntity);
		return await repository.save(repository.create(data));
	}

	public async getCallbackData(id: string) {
		const repository = this.db.getRepository(CallbackDataEntity);
		return await repository.findOne({ where: { id } });
	}
}
