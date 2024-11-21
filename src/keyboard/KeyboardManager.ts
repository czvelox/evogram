import { CommandContext } from '../contexts/migrated';
import { CommandExecuteData, Evogram, TelegramSendMessageParams } from '..';
import { EvogramInlineKeyboardButton } from './keyboard.interface';

export interface GetKeyboardParams {
	context: CommandContext;
	keyboardID: string;
	args?: Record<string, any>;
	commandName?: string;
	noBack?: boolean;
	clearHistory?: boolean;
}

export type RedirectHistory = { redirect: string; args?: Record<string, any>; commandName?: string }[];
export type KeyboardEntry = {
	keyboard: EvogramInlineKeyboardButton[][] | ((context: CommandContext, data?: CommandExecuteData) => EvogramInlineKeyboardButton[][]);
	params?: Omit<TelegramSendMessageParams, 'chat_id'> | ((context: CommandContext, data?: CommandExecuteData) => Omit<TelegramSendMessageParams, 'chat_id'>);
};

export class KeyboardManager {
	public static keyboards: Map<string, KeyboardEntry> = new Map();
	public static redirectHistory: Map<number, RedirectHistory> = new Map();
	public static backButtonText = '← Back';

	constructor(private client: Evogram) {}

	/**
	 * Обновляет историю перенаправлений пользователя.
	 */
	private static updateRedirectHistory(userID: number, keyboardID: string, args?: Record<string, any>, commandName?: string, menuKeyboard?: string): RedirectHistory {
		let currentHistory = KeyboardManager.redirectHistory.get(userID) || [];
		let lastRedirect = currentHistory.at(-1)?.redirect;
		let secondLastRedirect = currentHistory.at(-2)?.redirect;

		if (lastRedirect !== keyboardID) {
			if (secondLastRedirect === keyboardID) currentHistory.pop();
			else currentHistory.push({ redirect: keyboardID, args, commandName });

			if (menuKeyboard === keyboardID) currentHistory = [{ redirect: menuKeyboard, args, commandName }];
			KeyboardManager.redirectHistory.set(userID, currentHistory);
		}

		return currentHistory;
	}

	/**
	 * Получает запись клавиатуры по её идентификатору.
	 */
	private static getKeyboardEntry(keyboardID: string): KeyboardEntry {
		const keyboardEntry = KeyboardManager.keyboards.get(keyboardID);
		if (!keyboardEntry) {
			throw new Error(`Keyboard with ID "${keyboardID}" not found.`);
		}
		return keyboardEntry;
	}

	/**
	 * Генерирует клавиатуру с добавлением кнопки "Назад", если это необходимо.
	 */
	private static generateKeyboardWithBackButton(
		keyboardEntry: KeyboardEntry,
		context: CommandContext,
		data?: CommandExecuteData,
		addBackButton?: boolean
	): EvogramInlineKeyboardButton[][] {
		const baseKeyboard = typeof keyboardEntry.keyboard === 'function' ? keyboardEntry.keyboard(context, data) : keyboardEntry.keyboard;

		return addBackButton ? [...baseKeyboard, [{ text: KeyboardManager.backButtonText, isBackButton: true }]] : baseKeyboard;
	}

	/**
	 * Основной метод получения клавиатуры.
	 */
	public get({ context, keyboardID, args, commandName, noBack = false, clearHistory = false }: GetKeyboardParams): {
		keyboard: EvogramInlineKeyboardButton[][];
		params?: Omit<TelegramSendMessageParams, 'chat_id'>;
	} {
		const userID = context.user.id;
		if (clearHistory) KeyboardManager.redirectHistory.delete(userID);

		const menuKeyboard = this.client.params.keyboardMode?.menuKeyboard;
		const redirectHistory = KeyboardManager.updateRedirectHistory(userID, keyboardID, args, commandName, menuKeyboard);
		const keyboardEntry = KeyboardManager.getKeyboardEntry(keyboardID);
		const keyboardWithBack = KeyboardManager.generateKeyboardWithBackButton(keyboardEntry, context, args && { args }, redirectHistory.length > 1 && !noBack);

		return {
			keyboard: keyboardWithBack,
			params: typeof keyboardEntry.params === 'function' ? keyboardEntry.params(context, args && { args }) : keyboardEntry.params,
		};
	}

	/**
	 * Возвращает клавиатуру для предыдущего состояния.
	 */
	public getBack(context: CommandContext) {
		const userID = context.user.id;
		const redirectHistory = KeyboardManager.redirectHistory.get(userID) || [];
		const previousRedirect = redirectHistory.at(-2);
		const menuKeyboard = this.client.params.keyboardMode?.menuKeyboard;

		return this.get({
			context,
			keyboardID: previousRedirect?.redirect || menuKeyboard!,
			args: previousRedirect?.args,
			commandName: previousRedirect?.commandName,
		});
	}
}
