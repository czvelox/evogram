import { Evogram } from '..';
import { EvogramInlineKeyboardButton } from './keyboard.interface';
import { KeyboardConvert } from './KeyboardConvert';

export type RedirectHistory = { redirect: string; args?: Record<string, any> }[];

export class KeyboardManager {
	public static keyboards: Map<string, EvogramInlineKeyboardButton[][]> = new Map();
	public static redirectHistory: Map<number, RedirectHistory> = new Map();

	constructor(private client: Evogram) {}

	public async get(keyboardID: string, userID?: number, args?: Record<string, any>): Promise<EvogramInlineKeyboardButton[][]> {
		if (typeof args === 'string') args = undefined;
		let redirectHistory: RedirectHistory = KeyboardManager.redirectHistory.get(userID!) || [{ redirect: this.client.params.keyboardMode!.menuKeyboard, args }];

		if (userID) {
			if (redirectHistory[redirectHistory.length - 2]?.redirect !== keyboardID) {
				KeyboardManager.redirectHistory.set(userID, [...redirectHistory, { redirect: keyboardID, args }]);
			} else if (redirectHistory.length > 1) {
				redirectHistory.pop();
				KeyboardManager.redirectHistory.set(userID, redirectHistory);
			}

			if (this.client.params.keyboardMode!.menuKeyboard === keyboardID)
				KeyboardManager.redirectHistory.set(userID, [{ redirect: this.client.params.keyboardMode!.menuKeyboard, args }]);
			redirectHistory = KeyboardManager.redirectHistory.get(userID)!;
		}

		const keyboard = KeyboardManager.keyboards.get(keyboardID);
		if (!keyboard) throw new Error(`Keyboard with ID "${keyboardID}" not found.`);

		// Clone the keyboard and add the back button if there's a navigation history
		const keyboardWithBack = [...keyboard, ...(redirectHistory.length > 1 ? [[{ text: '← Back', redirect: redirectHistory[redirectHistory.length - 2].redirect }]] : [])];
		return KeyboardConvert(this.client, keyboardWithBack);
	}
}
