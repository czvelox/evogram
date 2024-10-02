import { createHash } from 'crypto';
import { Evogram } from '../Client';
import { TelegramInlineKeyboardMarkup } from '../types';

export async function KeyboardConvert(client: Evogram, params: TelegramInlineKeyboardMarkup) {
	const inline_keyboard = [];
	for (const row of params.inline_keyboard) {
		inline_keyboard.push([]);
		for (const button of row) {
			let id,
				callback_data = button.callback_data;

			if (button.json) {
				const json = JSON.stringify({ ...button.json, onClick: button.onClick?.toString() });
				id = createHash('md5').update(json).digest('hex');

				client.database.db.run(`INSERT INTO callback_data (id, created_at, json_data) VALUES (?, ?, ?)`, [id, Date.now(), json]).catch(() => {});
			}

			if (button.commandName || button.json || button.onlyForUser || button.onClick) {
				callback_data = `cdm ${button.commandName || ''};${button.onlyForUser || ''};${id || ''}`;
			}

			delete button.commandName;
			delete button.json;
			delete button.onlyForUser;
			delete button.onClick;

			//@ts-ignore
			inline_keyboard[inline_keyboard.length - 1].push({ ...button, callback_data });
		}
	}
	return { inline_keyboard };
}
