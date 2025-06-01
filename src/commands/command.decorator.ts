import { CommandParams } from './command.types';
import { CommandInstance, CommandManager } from './CommandManager';

export function CommandD(params: CommandParams): any;
export function CommandD(name: string): any;
export function CommandD(): any;
export function CommandD(data?: string | CommandParams): any {
	return function (ctor: CommandInstance) {
		const name = typeof data === 'object' ? data?.name?.toLowerCase() : data?.toLowerCase();

		//@ts-ignore
		ctor.params = Object.assign(typeof data === 'object' ? { ...data, name } : { name }, !name ? { onlyFromKeyboard: true } : {});
		CommandManager.commands.push(ctor);
	};
}
