import { Evogram } from '../Client';
import { EvogramInlineKeyboardButton } from './keyboard.interface';

export const inlineKeyboardTypes = ['switch_inline_query', 'switch_inline_query_current_chat'];
export async function KeyboardConvert(client: Evogram, params: EvogramInlineKeyboardButton[][]): Promise<EvogramInlineKeyboardButton[][]> {
	const inline_keyboard = [];
	for (const row of params) {
		inline_keyboard.push([]);
		for (const button of row) {
			let id;

			//@ts-ignore
			if (['command', 'redirect', 'onlyForUser', 'isBackButton', 'payload'].find((x) => button[x])) {
				id = (
					await client.database.addCallbackData({
						keyboard: button.keyboard,
						payload: button.payload,
						onClick: button.onClick?.toString(),
						//@ts-ignore
						command: button.command?.name || button.command,
						onlyForUser: button.onlyForUser?.toString(),
						redirect: button.redirect,
						isBackButton: button.isBackButton,
					})
				).button_id;
			}

			//@ts-ignore
			if (inlineKeyboardTypes.find((x) => button[x])) {
				//@ts-ignore
				inline_keyboard[inline_keyboard.length - 1].push({
					...button,
					//@ts-ignore
					[inlineKeyboardTypes.find((x) => button[x])]: (id || '') + button[inlineKeyboardTypes.find((x) => button[x])] || '',
				});
			} else {
				//@ts-ignore
				inline_keyboard[inline_keyboard.length - 1].push({ ...button, callback_data: id ? `cdm ${id}` : button.callback_data });
			}
		}
	}
	return inline_keyboard;
}
