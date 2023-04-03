import { Evogram } from "../Client";
import { CommandManager } from "./commands";
import { ContextManager } from "./context";

export class Modules {
	constructor(private client: Evogram) {}

	public commands = new CommandManager(this.client);
	public contexts = new ContextManager(this.client);
}