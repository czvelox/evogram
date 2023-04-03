import { Evogram } from "../Client";
import { CommandManager } from "./commands";
import { ContextManager } from "./context";
import { QuestionManager } from "./questions";

export class Modules {
	constructor(private client: Evogram) {}

	public commands = new CommandManager(this.client);
	public contexts = new ContextManager(this.client);
	public questions = new QuestionManager(this.client);
}