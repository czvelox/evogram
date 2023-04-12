import { MessageContext, UserMessageContext } from "../../contexts";

export async function commandsHandler(message: MessageContext) {
	if(message.isAnswer || !message.user) return;
	
	const command = message.client.modules.commands.getCommand(message as UserMessageContext);
	if(!command) return;

	try {
		if(command.params?.args) {
			const args = await message.client.modules.commands.getCommandArguments(message.chat.id, message.user.id, command);
			await command.execute(message as UserMessageContext, args)
		} else await command.execute(message as UserMessageContext);
	} catch (error: any) {
		command.onError(message as UserMessageContext, error);
	}
}