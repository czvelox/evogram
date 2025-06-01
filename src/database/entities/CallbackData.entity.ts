import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { EvogramInlineKeyboardButton } from '../../keyboard';

@Entity('callback_data')
export class CallbackDataEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Column({ type: 'text', nullable: true })
	command?: string;

	@Column({ type: 'text', nullable: true })
	redirect?: string;

	@Column({ type: 'text' })
	@Index()
	button_id!: string;

	@Column({ type: 'bigint', nullable: true })
	onlyForUser?: string;

	@Column({ type: 'boolean', nullable: true })
	isBackButton?: boolean;

	@Column({ type: 'json', nullable: true })
	payload!: Record<string, any>;

	@Column({ type: 'text', nullable: true })
	onClick?: string;

	@Column({ type: 'json', nullable: true })
	keyboard?: EvogramInlineKeyboardButton[][];
}
