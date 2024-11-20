import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'integer' })
	created_at!: number;

	@Column({ type: 'tinyint', default: 0 })
	access_level!: number;

	@Column({ type: 'json', nullable: true })
	payload?: Record<string, any>;

	@Column({ type: 'integer' })
	last_activity!: number;
}
