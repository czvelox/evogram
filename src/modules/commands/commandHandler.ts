import { MessageContext } from "../../contexts";

export function commandsHandler(message: MessageContext) {
	const command = message.client.modules.commands.getCommand(message);
	if(!command || !message.user?.id) return;

	if(command.params?.args) {
		message.client.modules.commands.getCommandArguments(message.chat.id, message.user.id, command)
			.then(args => command.execute(message, args))
	} else command.execute(message);
}