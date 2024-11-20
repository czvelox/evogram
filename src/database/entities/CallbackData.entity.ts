import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('callback_data')
export class CallbackDataEntity {
	@PrimaryColumn()
	id!: string;

	@Column({ type: 'integer' })
	created_at!: number;

	@Column({ type: 'text' })
	payload!: string;
}
