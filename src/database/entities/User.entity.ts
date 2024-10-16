import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'integer' })
	created_at!: number;

	@Column({ type: 'integer', default: 0 })
	is_owner!: number;

	@Column({ type: 'text', nullable: true })
	json_data?: string;
}
