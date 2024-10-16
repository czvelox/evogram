import { Evogram } from '..';
import { EvogramInlineKeyboardButton } from './keyboard.interface';
import { KeyboardConvert } from './KeyboardConvert';

export class KeyboardBuilder {
	constructor(private client: Evogram) {}

	public keyboard: EvogramInlineKeyboardButton[][] = [];

	build() {
		return KeyboardConvert(this.client, this.keyboard);
	}
}
