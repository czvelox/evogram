import { Evogram, TelegramSendMessageParams } from '..';
import { EvogramInlineKeyboardButton } from './keyboard.interface';
import { KeyboardConvert } from './KeyboardConvert';

export type RedirectHistory = { redirect: string; args?: Record<string, any> }[];
export type KeyboardEntry = {
	keyboard: EvogramInlineKeyboardButton[][];
	params?: Omit<TelegramSendMessageParams, 'chat_id'>;
};

export class KeyboardManager {
	public static keyboards: Map<string, KeyboardEntry> = new Map();
	public static redirectHistory: Map<number, RedirectHistory> = new Map();

	constructor(private client: Evogram) {}

	public async get(keyboardID: string, userID?: number, args?: Record<string, any>): Promise<KeyboardEntry> {
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

		const keyboardEntry = KeyboardManager.keyboards.get(keyboardID);
		if (!keyboardEntry) throw new Error(`Keyboard with ID "${keyboardID}" not found.`);

		// Clone the keyboard and add the back button if there's a navigation history
		const keyboardWithBack = [
			...keyboardEntry.keyboard,
			...(redirectHistory.length > 1 ? [[{ text: '← Back', redirect: redirectHistory[redirectHistory.length - 2].redirect }]] : []),
		];
		return { keyboard: await KeyboardConvert(this.client, keyboardWithBack), params: keyboardEntry.params };
	}
}
