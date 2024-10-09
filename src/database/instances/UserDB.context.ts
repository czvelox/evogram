import { Context, ContextD } from '../../contexts';

// @ContextD('UserDB')
export class UserDBContext extends Context<{ id: number; created_at?: number; is_owner?: number; json_data?: string }> {
	public id = this.source.id;
	public createdAt = new Date(this.source.created_at || Date.now());
	public isOwner = Boolean(this.source.is_owner);

	public data = JSON.parse(this.source.json_data || '{}');

	public save() {
		this.client.database.db.run(
			`
            INSERT INTO users (id, created_at, is_owner, json_data)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                id = excluded.id,
                created_at = excluded.created_at,
                is_owner = excluded.is_owner,
                json_data = excluded.json_data;
        `,
			[this.id, this.createdAt.getTime(), this.isOwner, JSON.stringify(this.data)]
		);
	}
}
