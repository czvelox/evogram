import { Evogram } from '..';
import { Command, CommandManager } from '../commands';
import { EvogramInlineKeyboardButton } from './keyboard.interface';

export class SmartButton {
	public commandName: string;
	public onlyForUser: number;
	public id: string;
	public redirect: string;
	public isBackButton: boolean;

	constructor(
		private client: Evogram,
		public readonly callbackData: string
	) {
		const [commandName, userID, id, redirect, isBackButton] = callbackData.split('cdm ')[1].split(';');

		this.commandName = commandName;
		this.onlyForUser = Number(userID);
		this.id = id;
		this.redirect = redirect;
		this.isBackButton = Boolean(isBackButton);
	}

	public get isSmart() {
		return this.callbackData.startsWith('cdm');
	}

	public get command(): Command | undefined {
		return this.client.commands.commands.find((x) => x.params.name === this.commandName);
	}

	#buttonData: any;
	public async init() {
		this.#buttonData = await this.client.database.getCallbackData(this.id);
	}

	public get keyboard(): EvogramInlineKeyboardButton[][] {
		return this.#buttonData.keyboard;
	}

	public get onClick() {
		return this.#buttonData.onClick;
	}

	public get payload(): Record<string, any> {
		return this.#buttonData.payload || this.#buttonData;
	}
}
