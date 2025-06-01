import { MessageContext } from '../migrated';

export class QuestionManager {
	/**
	 * The priority of the question manager.
	 * @default 'command'
	 */
	public priority: 'command' | 'question' = 'command';

	/**
	 * An object containing user IDs that are currently waiting for a response.
	 * Each key is a user ID, and each value is a callback function.
	 */
	private waiting: { [key: number]: (message: MessageContext) => any } = {};

	/**
	 * Adds a new question for a specified user ID.
	 * @param user_id - The ID of the user asking the question.
	 * @param callback - The callback function that will handle the user's response.
	 */
	public addQuestion(user_id: number, callback: (message: MessageContext) => any) {
		this.waiting[user_id] = callback;
	}

	/**
	 * Gets the callback function for a specified user ID and removes it from the waiting object.
	 * If no callback function exists for the specified user ID, returns undefined.
	 * @param user_id - The ID of the user whose callback function should be retrieved.
	 * @param deleteQuestion - Optional flag that indicates if the question should be removed from the waiting object. Defaults to true.
	 * @return The callback function associated with the user ID, or undefined if no such function exists.
	 */
	public getQuestion(user_id: number, deleteQuestion = true) {
		const question = this.waiting[user_id];
		if (!question) return undefined;

		if (deleteQuestion) delete this.waiting[user_id];
		return question;
	}
}
