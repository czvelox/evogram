import { Context, ContextD } from '../../contexts';
import { UserEntity } from '../entities';

@ContextD('UserDB')
export class UserDBContext extends Context<{ id: number; created_at?: number; is_owner?: number; json_data?: string }> {
	public id = this.source.id;
	public createdAt = this.source.created_at ? new Date(this.source.created_at) : new Date();
	public isOwner = Boolean(this.source.is_owner);

	public data: any;

	constructor(params: any) {
		super(params);

		try {
			this.data = (typeof this.source.json_data === 'object' ? JSON.parse(this.source.json_data) : this.source.json_data?.toString()) || undefined;
		} catch {
			this.data = this.source.json_data;
		}
	}

	public async save() {
		const userRepository = this.client.database.db.getRepository(UserEntity);
		await userRepository
			.createQueryBuilder()
			.insert()
			.values({
				id: this.id,
				created_at: this.createdAt.getTime(),
				is_owner: Number(this.isOwner),
				json_data: typeof this.data === 'object' ? JSON.stringify(this.data) : this.data?.toString(),
			})
			.orUpdate(['json_data', 'is_owner'], ['id'])
			.execute();
	}
}
