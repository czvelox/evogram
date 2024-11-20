import { Context, ContextD } from '../../contexts';
import { UserEntity } from '../entities';

@ContextD('UserDB')
export class UserDBContext<T extends Record<string, any> = any> extends Context<Partial<UserEntity> & { id: number }> {
	public id = this.source.id;
	public createdAt = this.source.created_at ? new Date(this.source.created_at) : new Date();
	public lastActivity = this.source.last_activity || Date.now();
	public accessLevel = this.source.access_level || 0;

	public payload: T = (this.source.payload as T) || this.structure(this.source as UserEntity);

	public async save() {
		const userRepository = this.client.database.db.getRepository(UserEntity);
		await userRepository
			.createQueryBuilder()
			.insert()
			.values({
				id: this.id,
				created_at: this.createdAt.getTime(),
				access_level: this.accessLevel,
				payload: this.payload,
				last_activity: this.lastActivity,
			})
			.orUpdate(['payload', 'access_level', 'last_activity'], ['id'])
			.execute();
	}

	structure(entity: UserEntity): T {
		return {} as T;
	}
}
