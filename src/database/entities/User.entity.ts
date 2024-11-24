import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Column({ type: 'integer' })
	user_id!: number;

	@Column({ type: 'integer' })
	created_at: number = Date.now();

	@Column({ type: 'tinyint' })
	access_level: number = 0;

	@Column({ type: 'json', nullable: true })
	payload: Record<string, any> = {};

	@Column({ type: 'integer' })
	last_activity: number = Date.now();

	constructor(id: number) {
		this.user_id = id;
	}
}
