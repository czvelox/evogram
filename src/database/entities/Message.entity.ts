import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TelegramMessage } from '../../types';
import { UserHistory } from '../instances';

@Entity('messages')
export class MessageEntity extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Column({ type: 'integer' })
	message_id!: string;

	@Column({ type: 'integer', nullable: true })
	chat_id!: number;

	@Column({ type: 'integer', nullable: true })
	user_id!: number;

	@Column({ type: 'boolean', default: false })
	deleted!: boolean;

	@Column({ type: 'json', array: true, default: '[]' })
	history!: (UserHistory & { command: string })[];

	@Column({ type: 'json', nullable: true })
	sended_data!: Record<string, any>;

	@Column({ type: 'json', nullable: true })
	telegram_data!: TelegramMessage;

	@Column({ type: 'json', nullable: true })
	payload!: Record<string, any>;

	@CreateDateColumn()
	created_at!: Date;
}
