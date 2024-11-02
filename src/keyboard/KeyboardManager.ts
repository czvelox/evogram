import { CommandContext, CommandExecuteData, Evogram, TelegramSendMessageParams } from '..';
import { EvogramInlineKeyboardButton } from './keyboard.interface';
import { KeyboardConvert } from './KeyboardConvert';

export type RedirectHistory = { redirect: string; args?: Record<string, any>; commandName?: string }[];
export type KeyboardEntry = {
	keyboard:
		| EvogramInlineKeyboardButton[][]
		| ((context: CommandContext, data?: CommandExecuteData) => EvogramInlineKeyboardButton[][] | Promise<EvogramInlineKeyboardButton[][]>);
	params?:
		| Omit<TelegramSendMessageParams, 'chat_id'>
		| ((context: CommandContext, data?: CommandExecuteData) => Omit<TelegramSendMessageParams, 'chat_id'> | Promise<Omit<TelegramSendMessageParams, 'chat_id'>>);
};

export class KeyboardManager {
	public static keyboards: Map<string, KeyboardEntry> = new Map();
	public static redirectHistory: Map<number, RedirectHistory> = new Map();

	public static backButtonText = '← Back';

	constructor(private client: Evogram) {}

	public async get(
		context: CommandContext,
		keyboardID: string,
		args?: Record<string, any>,
		commandName?: string,
		noBack?: boolean
	): Promise<{ keyboard: EvogramInlineKeyboardButton[][]; params?: Omit<TelegramSendMessageParams, 'chat_id'> }> {
		const userID = context.user.id;

		if (typeof args === 'string') args = undefined;
		let redirectHistory: RedirectHistory = KeyboardManager.redirectHistory.get(userID!) || [{ redirect: this.client.params.keyboardMode!.menuKeyboard, args }];

		if (userID && redirectHistory[redirectHistory.length - 1]?.redirect !== keyboardID && !noBack) {
			if (redirectHistory[redirectHistory.length - 2]?.redirect !== keyboardID) {
				KeyboardManager.redirectHistory.set(userID, [...redirectHistory, { redirect: keyboardID, args, commandName }]);
			} else if (redirectHistory.length > 1) {
				redirectHistory.pop();
				KeyboardManager.redirectHistory.set(userID, redirectHistory);
			}

			if (this.client.params.keyboardMode!.menuKeyboard === keyboardID)
				KeyboardManager.redirectHistory.set(userID, [{ redirect: this.client.params.keyboardMode!.menuKeyboard, args, commandName }]);
			redirectHistory = KeyboardManager.redirectHistory.get(userID)!;
		}

		const keyboardEntry = KeyboardManager.keyboards.get(keyboardID);
		if (!keyboardEntry) throw new Error(`Keyboard with ID "${keyboardID}" not found.`);

		// Clone the keyboard and add the back button if there's a navigation history
		// prettier-ignore
		const keyboardWithBack = [
			...(typeof keyboardEntry.keyboard === 'function' ? await keyboardEntry.keyboard(context, args && { args }) : keyboardEntry.keyboard),
			...(redirectHistory.length > 1 && !noBack ? [[{ text: KeyboardManager.backButtonText, isBackButton: true }]] : []),
		];

		return {
			keyboard: await KeyboardConvert(this.client, keyboardWithBack),
			params: typeof keyboardEntry.params === 'function' ? await keyboardEntry.params(context, args && { args }) : keyboardEntry.params,
		};
	}

	public getBack(context: CommandContext) {
		const redirectHistory = KeyboardManager.redirectHistory.get(context.user.id);
		const data = (redirectHistory || [])[redirectHistory && redirectHistory?.length > 1 ? redirectHistory.length - 2 : 0];
		return this.get(context, data?.redirect || this.client.params.keyboardMode!.menuKeyboard, data?.args, data?.commandName);
	}
}
