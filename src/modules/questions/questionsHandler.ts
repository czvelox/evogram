import { MessageContext } from "../../contexts";

export function questionsHandler(message: MessageContext) {
	if(!message.source.from?.id) return;

	const question = message.client.modules.questions.getQuestion(message.source.from?.id);
	if(question) return question(message);
}