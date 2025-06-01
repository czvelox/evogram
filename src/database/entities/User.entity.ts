import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, OneToMany, Index } from 'typeorm';
import { UserHistory } from '../instances';
import { TelegramUser } from '../../types';
import { MessageEntity } from './Message.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Index()
	@Column({ type: 'integer' })
	user_id!: number;

	@Column({ type: 'boolean', default: false })
	banned!: boolean;

	@Column({ type: 'json' })
	telegram_data!: TelegramUser;

	@Column({ type: 'varchar', length: 5, nullable: true })
	language!: string;

	@CreateDateColumn()
	created_at!: Date;

	@Column({ type: 'tinyint', default: 0 })
	access_level!: number;

	@Column({ type: 'json', nullable: true })
	payload!: Record<string, any>;

	@CreateDateColumn()
	last_activity!: Date;

	@Column({ type: 'json', array: true, default: '[]' })
	history!: (UserHistory & { command: string })[];
}
