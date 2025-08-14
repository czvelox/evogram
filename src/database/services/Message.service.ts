import { DataSource, In, IsNull, Not } from 'typeorm';
import { Evogram } from '../../Client';
import { MessageEntity } from '../entities/Message.entity';

export class MessageService {
	constructor(
		private readonly client: Evogram,
		public dataSource: DataSource
	) {}

	async addMessage(message: Partial<MessageEntity>) {
		const messageRepository = this.dataSource.getRepository(MessageEntity);

		// Проверяем существование сообщения
		const existingMessage = await messageRepository.findOne({
			where: { message_id: message.message_id },
		});

		if (existingMessage) {
			// Если сообщение существует, обновляем его
			await messageRepository.update({ message_id: message.message_id }, message);
		} else {
			// Если сообщение новое, сохраняем его
			await messageRepository.save(message);
		}

		// Если у сообщения нет payload и есть chat_id, проверяем количество сообщений
		if (!message.payload && message.chat_id)
			// Получаем все сообщения без payload для данного чата, сортированные по дате создания (сначала новые)
			messageRepository
				.find({
					where: {
						chat_id: message.chat_id,
						payload: IsNull(),
						deleted: false,
					},
					order: {
						created_at: 'DESC',
					},
				})
				.then((messages) => {
					// Если сообщений больше 10, удаляем лишние
					if (messages.length > (this.client.params.dbConfig?.maxMessages || 10)) {
						const messagesToDelete = messages.slice(this.client.params.dbConfig?.maxMessages || 10);
						messageRepository.delete({ id: In(messagesToDelete.map((msg) => msg.id)) });
					}
				});
		else if (message.payload && message.chat_id)
			// Если сообщение имеет payload и chat_id, проверяем количество сообщений
			messageRepository
				.find({
					where: {
						chat_id: message.chat_id,
						payload: Not(IsNull()),
						deleted: false,
					},
					order: {
						created_at: 'DESC',
					},
				})
				.then((messages) => {
					// Если сообщений больше 10, удаляем лишние
					if (messages.length > (this.client.params.dbConfig?.maxMessagesPayload || 100)) {
						const messagesToDelete = messages.slice(this.client.params.dbConfig?.maxMessagesPayload || 100);
						messageRepository.delete({ id: In(messagesToDelete.map((msg) => msg.id)) });
					}
				});
	}

	async updateMessage(id: any, message: MessageEntity) {
		const messageRepository = this.dataSource.getRepository(MessageEntity);
		return messageRepository.update({ message_id: id }, message);
	}

	async getMessage(chat: number, id: number) {
		const messageRepository = this.dataSource.getRepository(MessageEntity);
		return messageRepository.findOne({ where: { chat_id: chat, message_id: id.toString() } });
	}

	async deleteMessages(ids: number[]) {
		const messageRepository = this.dataSource.getRepository(MessageEntity);
		await messageRepository.delete({ message_id: In(ids) });
	}
}
