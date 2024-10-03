import { createHash } from 'crypto';
import { Evogram } from '../Client';
import { EvogramInlineKeyboardButton } from './keyboard.interface';

export async function KeyboardConvert(client: Evogram, params: EvogramInlineKeyboardButton[][]): Promise<EvogramInlineKeyboardButton[][]> {
	const inline_keyboard = [];
	for (const row of params) {
		inline_keyboard.push([]);
		for (const button of row) {
			let id,
				callback_data = button.callback_data;

			if (button.json || button.keyboard || button.onClick) {
				const json = JSON.stringify({ ...button.json, onClick: button.onClick?.toString(), keyboard: button.keyboard });
				id = createHash('md5').update(json).digest('hex');

				client.database.db.run(`INSERT INTO callback_data (id, created_at, json_data) VALUES (?, ?, ?)`, [id, Date.now(), json]).catch(() => {});
			}

			if (button.commandName || button.json || button.onlyForUser || button.onClick || button.keyboard || button.redirect) {
				callback_data = `cdm ${button.commandName || ''};${button.onlyForUser || ''};${id || ''};${button.redirect || ''}`;
			}

			//@ts-ignore
			inline_keyboard[inline_keyboard.length - 1].push({ ...button, callback_data });
		}
	}
	return inline_keyboard;
}
