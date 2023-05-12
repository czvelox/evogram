import type { ICommandParams } from "../../interfaces";
import type { Command } from "./Command"
import { CommandManager } from "./CommandManager"

export function CommandHandler(params: ICommandParams): any
export function CommandHandler(name: string): any
export function CommandHandler(data: string | ICommandParams): any {
	return function(ctor: new (params: ICommandParams) => Command) {
        CommandManager.commands.push(new ctor(typeof data === "object" ? data : { name: data }));
    }
}
  