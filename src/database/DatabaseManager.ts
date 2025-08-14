import { DataSource, LessThan } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { CallbackDataEntity, UserEntity } from '../migrated/';
import { UserDBContext } from '../migrated/';
import { ContextManager, Evogram } from '../';
import { createHash } from 'crypto';
import { ChatDBContext } from './instances/ChatDB.context';
import { ChatEntity } from './entities';
import { ConfigService } from './Config.service';
import { ConfigEntity } from './entities/Config.entity';
import { MessageEntity } from './entities/Message.entity';
import { MessageService } from './services/Message.service';

export class DatabaseManager {
	public db!: DataSource;
	public password = createHash('sha1')
		.update((Date.now() + Math.random()).toString())
		.digest('hex');

	public config!: ConfigService;
	public message!: MessageService;

	constructor(public client: Evogram) {}

	async init() {
		if (this.db) return this;
		console.log(`\x1b[34m❯\x1b[0m Send "${this.password}" to get the owner status`);

		if (!fs.existsSync(this.client.directory)) fs.mkdirSync(this.client.directory, { recursive: true });

		this.db = new DataSource( //@ts-ignore
			this.client.params.database
				? { ...this.client.params.database, entities: [MessageEntity, UserEntity, CallbackDataEntity, ConfigEntity] }
				: {
						type: 'sqlite',
						database: path.join(this.client.directory, 'database.db'),
						entities: [MessageEntity, UserEntity, CallbackDataEntity, ConfigEntity, ChatEntity],
						synchronize: true, // Синхронизация создает таблицы, если их нет
					}
		);

		await this.db.initialize();
		this.config = new ConfigService(this.db);
		this.message = new MessageService(this.client, this.db);

		if (this.client.params.dbConfig?.messageLifetime)
			this.db
				.getRepository(MessageEntity)
				.delete({ created_at: LessThan(new Date(Date.now() - this.client.params.dbConfig.messageLifetime)) });

		return this;
	}

	// Получаем данные пользователя с использованием репозитория TypeORM
	public async getUser(id: string | number): Promise<UserDBContext | null> {
		const userRepository = this.db.getRepository(UserEntity);
		const user = await userRepository.findOne({ where: { user_id: id as any } });

		if (!user) return null;
		return ContextManager.getContext('UserDB', { client: this.client, source: user });
	}

	// Пример метода для добавления пользователя
	public async addUser(userData: Partial<UserEntity>): Promise<UserEntity> {
		const repository = this.db.getRepository(UserEntity);
		return await repository.save(userData);
	}

	public async addCallbackData(data: Partial<CallbackDataEntity>) {
		const repository = this.db.getRepository(CallbackDataEntity);
		const button_id = createHash('sha1').update(JSON.stringify(data)).digest('hex').slice(0, 12);

		return (await this.getCallbackData(button_id)) || (await repository.save({ ...data, button_id }));
	}

	public async getCallbackData(button_id: string) {
		const repository = this.db.getRepository(CallbackDataEntity);
		return repository.findOne({
			where: { button_id },
			select: ['button_id', 'command', 'isBackButton', 'onClick', 'onlyForUser', 'payload'],
		});
	}

	// Получаем данные пользователя с использованием репозитория TypeORM
	public async getChat(id: string | number): Promise<ChatDBContext | null> {
		const repository = this.db.getRepository(ChatEntity);
		const chat = await repository.findOne({ where: { chat_id: id as any } });

		if (!chat) return null;
		return ContextManager.getContext('ChatDB', { client: this.client, source: chat });
	}

	// Пример метода для добавления пользователя
	public async addChat(userData: Partial<ChatEntity>): Promise<ChatEntity> {
		const repository = this.db.getRepository(ChatEntity);
		return await repository.save(userData);
	}
}
