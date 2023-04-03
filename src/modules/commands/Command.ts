import { Evogram } from "../../Client";
import { MessageContext } from "../../contexts";

/** Defines the parameters of a command. */
export interface ICommandParams {
	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	name: string,
	args?: {
		/** Argument name */
		name: string,
		/** Text sent to request an argument */
		text: string,
		/** Deletes the message requesting arguments when a reply is received */
		deleteQuestionMessage?: boolean,
		/** Deletes a reply message when it is received */
		deleteAnswerMessage?: boolean
	}[]
	commandParams?: {
		/** Description of the command; 1-256 characters. */
		description: string,
		/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
		language_code?: string
	}[]
}

export abstract class Command {
	constructor(private client: Evogram) {}

	/** Returns an object with the parameters of a command. */
	public params?: ICommandParams;

	/**
	 * Checks if a command is executable based on an incoming message.
	 * @param {MessageContext} message - The incoming message.
	 * @param {()=>void} next - Function call to execute the next action.
	 * @returns {any}
	 */
	public isExecutable(message: MessageContext, next: () => void): any {
		if (this.params && message.text) {
			if([`/${this.params.name}`, `/${this.params.name}@${this.client.bot?.username}`].includes(message.text))
					return next();
		}
	}

	/**
	 * Executes a command based on an incoming message.
	 * @param {MessageContext} message - The incoming message.
	 * @returns {any}
	 * @abstract
	 */
	public abstract execute(message: MessageContext, args?: { [x: string]: MessageContext }): any;
}
