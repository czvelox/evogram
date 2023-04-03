import { MessageContext } from "../../contexts";

export async function commandsHandler(message: MessageContext) {
	const command = message.client.modules.commands.getCommand(message);
	if(!command || !message.user?.id) return;

	try {
		if(command.params?.args) {
			const args = await message.client.modules.commands.getCommandArguments(message.chat.id, message.user.id, command);
			await command.execute(message, args)
		} else await command.execute(message);
	} catch (error: any) {
		command.onError(message, error);
	}
}