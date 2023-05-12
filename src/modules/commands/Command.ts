import type { ICommandParams, ICommandExecuteData } from "../../interfaces";
import { UserMessageContext } from "../../contexts";

export abstract class Command {
	constructor(public params: ICommandParams) {}

	/**
	 * Checks if a command is executable based on an incoming message.
	 * @param message - The incoming message.
	 */
	public isExecutable(message: UserMessageContext): boolean {
		return message.hasCommand === this.params.name;
	}

	/**
	 * Executes a command based on an incoming message.
	 * @param message - The incoming message.
	 */
	public abstract execute(message: UserMessageContext, data: ICommandExecuteData): any;

	public onError(message: UserMessageContext, error: any): any {
		throw error;
	}
}
