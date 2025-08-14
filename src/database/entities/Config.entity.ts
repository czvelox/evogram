import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class ConfigEntity extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id!: any;

	@Column({ type: 'text' })
	key!: string;

	@Column({ type: 'json' })
	value: any;
}
