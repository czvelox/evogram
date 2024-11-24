import { Context, ContextD } from '../../contexts';
import { UserEntity } from '../../migrated';

@ContextD('UserDB')
export class UserDBContext<T extends Record<string, any> = any> extends Context<Partial<UserEntity> & { user_id: number }> {
	public id = this.source.user_id;
	public createdAt = this.source.created_at ? new Date(this.source.created_at) : new Date();
	public lastActivity = this.source.last_activity || Date.now();
	public accessLevel = this.source.access_level || 0;

	public payload: T = (this.source.payload as T) || this.structure(this.source as UserEntity);

	public async save() {
		try {
			const userRepository = this.client.database.db.getRepository(UserEntity);
			const isSaved = await userRepository.countBy({ user_id: this.id });

			if (!isSaved)
				//@ts-ignore
				await userRepository.save(new UserEntity(this.id));
			else {
				await userRepository.update(
					{ user_id: this.id },
					{
						...this.source,
						last_activity: this.lastActivity,
						access_level: this.accessLevel,
						payload: this.payload,
					}
				);
			}
		} catch {}
	}

	structure(entity: UserEntity): T {
		return {} as T;
	}
}
