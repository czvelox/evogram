import { Command } from './Command';
import { CommandParams } from './command.types';
import { CommandManager } from './CommandManager';

export function CommandD(params: CommandParams): any;
export function CommandD(name: string): any;
export function CommandD(data: string | CommandParams): any {
	return function (ctor: new (params: CommandParams) => Command) {
		CommandManager.commands.push(new ctor(typeof data === 'object' ? { ...data, name: data.name.toLowerCase() } : { name: data.toLowerCase() }));
	};
}
