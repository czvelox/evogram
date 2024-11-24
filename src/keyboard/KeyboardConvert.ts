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

			if (button.payload || button.keyboard || button.onClick) {
				const payload = JSON.stringify({
					...(typeof button.payload === 'object' ? button.payload : { payload: button.payload }),
					onClick: button.onClick?.toString(),
					keyboard: button.keyboard,
				});
				id = createHash('md5').update(payload).digest('hex');

				if (!(await client.database.getCallbackData(id))) await client.database.addCallbackData({ button_id: id, payload });
			}

			if (button.commandName || button.onlyForUser || button.redirect || button.isBackButton) {
				callback_data = `cdm ${button.commandName || ''};${button.onlyForUser || ''};${id || ''};${button.redirect || ''};${Number(button.isBackButton) || ''}`;
			}

			//@ts-ignore
			inline_keyboard[inline_keyboard.length - 1].push({ ...button, callback_data });
		}
	}
	return inline_keyboard;
}
