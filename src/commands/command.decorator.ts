import { CommandParams } from './command.types';
import { CommandInstance, CommandManager } from './CommandManager';

export function CommandD(params: CommandParams): any;
export function CommandD(name: string): any;
export function CommandD(data: string | CommandParams): any {
	return function (ctor: CommandInstance) {
		CommandManager.commands.push({ instance: ctor, params: typeof data === 'object' ? { ...data, name: data.name.toLowerCase() } : { name: data.toLowerCase() } });
	};
}
