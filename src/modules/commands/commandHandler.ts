import { MessageContext } from "../../contexts";

export function commandsHandler(message: MessageContext) {
	const command = message.client.commandManager.getCommand(message);
	if(command) command.execute(message);
}