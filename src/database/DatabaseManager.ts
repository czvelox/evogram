import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

import fs from 'fs';
import path from 'path';

export class DatabaseManager {
	public db!: Database;

	constructor(private id: string) {}

	async init() {
		if (this.db) return this;

		const dir = path.join(process.cwd(), '.evogram', this.id); // Путь к директории .evogram/id
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
	}
}
