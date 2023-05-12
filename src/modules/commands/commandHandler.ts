import { MessageContext, UserMessageContext } from "../../contexts";
import { CommandManager } from "./CommandManager";
import { getCommandArguments } from "./getCommandAgruments";

export async function commandsHandler(event: MessageContext) {
	if(event.isAnswer || !event.user) return;
	const message = event as UserMessageContext;

	const command = CommandManager.getCommand(message);
	if(!command || !message.user?.id) return;

	try {
		if(command.params?.args) {
			const args = await getCommandArguments(message, command);
			await command.execute(message, { args })
		} else await command.execute(message, {});
	} catch (error: any) {
		command.onError(message, error);
	}
}