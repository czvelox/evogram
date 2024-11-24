import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('callback_data')
export class CallbackDataEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Column({ type: 'text' })
	button_id!: string;

	@Column({ type: 'text' })
	payload!: string;
}
