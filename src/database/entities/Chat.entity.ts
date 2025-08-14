import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chats')
export class ChatEntity extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Index()
	@Column({ type: 'integer' })
	chat_id!: number;

	@CreateDateColumn()
	created_at!: Date;

	@Column({ type: 'tinyint', default: 0 })
	status!: number;

	@Column({ type: 'json', nullable: true })
	payload!: Record<string, any>;

	@Column({ type: 'json', nullable: true })
	telegram_data!: Record<string, any>;

	@CreateDateColumn()
	last_activity!: Date;
}
