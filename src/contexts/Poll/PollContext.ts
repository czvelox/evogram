import type { IMessageEntity, IPoll, IPollOption } from "../../interfaces";
import { Context } from "../../modules/context";

export class PollContext extends Context<IPoll> {
	public client = this._client;

	/** Gets the ID of the poll. */
	public get id() { return this._source.id }
	/** Gets the question text of the poll. */
	public get question() { return this._source.question }
	/** Gets the list of poll options. */
	public get options() { return this._source.options.map(option => this.client.modules.contexts.getContext<IPollOption>("PollOption", option)) }
	/** Gets the total number of users that voted in the poll. */
	public get totalVoterCount() { return this._source.total_voter_count }
	/** Returns true if the poll is closed. */
	public get isClosed() { return this._source.is_closed }
	/** Returns true if the poll is anonymous. */
	public get isAnonymous() { return this._source.is_anonymous }
	/** Gets the type of the poll. */
	public get type() { return this._source.type }
	/** Returns true if the poll allows multiple answers. */
	public get allowsMultipleAnswers() { return this._source.allows_multiple_answers }
	/** Gets the ID of the correct answer option, if specified. */
	public get correctOptionId() { return this._source.correct_option_id }
	/** Gets the text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, if specified. */
	public get explanation() { return this._source.explanation }
	/** Gets the entities that appear in the explanation text, if specified. */
	public get explanationEntities() { return this._source.explanation_entities && this.client.modules.contexts.getContext<IMessageEntity>("MessageEntity", this._source.explanation_entities) }
	/** Gets the amount of time in seconds the poll will be active after creation, if specified. */
	public get openPeriod() { return this._source.open_period }


	/**
	 * This method searches for a poll option with the given text among all the options in the poll.
	 * @param text Parameter specifies the text to search for.
	 * @returns The found poll option.
	 */
	public getPollOptionByText<T extends Context<IPollOption> = any>(text: string) {
		const findResult = this._source.options.find((option) => option.text === text);
		return findResult ? this.client.modules.contexts.getContext<T>("PollOption", findResult) : undefined;
	}

	/**
	 * Returns the percentage of votes for the transmitted option
	 * @param option Poll option from which to calculate the percentage
	 * @returns Percentage of those who voted for option
	 */
	public getPollOptionPercentage(option: IPollOption) {
		const totalVoters = this._source.total_voter_count;
		return (option.voter_count / totalVoters) * 100;
	}
}