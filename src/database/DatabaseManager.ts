import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

import fs from 'fs';
import path from 'path';
import { UserDBContext } from './instances';
import { ContextManager, Evogram } from '..';

export class DatabaseManager {
	public db!: Database;

	constructor(public client: Evogram) {}

	async init() {
		if (this.db) return this;

		const dir = path.join(process.cwd(), '.evogram', this.client.params.token.split(':')[0] || 'default'); // Путь к директории .evogram/id
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

		this.db = await open({ filename: path.join(dir, 'database.db'), driver: sqlite3.cached.Database });
		await this.createTable();

		return this;
	}

	private async createTable(): Promise<void> {
		await this.db.exec(`
            CREATE TABLE IF NOT EXISTS callback_data (
                id TEXT PRIMARY KEY,
                created_at INTEGER,
                json_data TEXT
            )
        `);

		await this.db.exec(`
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY,
				created_at INTEGER,
				is_owner INTEGER DEFAULT 0,
				json_data TEXT
			)
		`);
	}

	public async getUser(id: string | number): Promise<UserDBContext> {
		return ContextManager.getContext('UserDB', { client: this.client, source: await this.db.get('SELECT * FROM users WHERE id = ?', Number(id)) });
	}
}
