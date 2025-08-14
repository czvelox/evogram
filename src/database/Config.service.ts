import { DataSource } from 'typeorm';
import { ConfigEntity } from './entities/Config.entity';

export class ConfigService {
	constructor(private db: DataSource) {}

	public get(key: string) {
		return this.db.getRepository(ConfigEntity).findOne({ where: { key } });
	}

	public set(key: string, value: any) {
		this.db.getRepository(ConfigEntity).delete({ key });
		return this.db.getRepository(ConfigEntity).save({ key, value });
	}
}
