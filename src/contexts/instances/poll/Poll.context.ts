import { TelegramMessageEntity, TelegramPoll, TelegramPollOption } from '../../../types';
import { Context, ContextD } from '../../core';

@ContextD('Poll')
export class PollContext extends Context<TelegramPoll> {
	/** Gets the ID of the poll. */
	public id = this.source.id;
	/** Gets the question text of the poll. */
	public question = this.source.question;
	/** Gets the list of poll options. */
	public options = this.source.options;
	/** Gets the total number of users that voted in the poll. */
	public totalVoterCount = this.source.total_voter_count;
	/** Returns true if the poll is closed. */
	public isClosed = this.source.is_closed;
	/** Returns true if the poll is anonymous. */
	public isAnonymous = this.source.is_anonymous;
	/** Gets the type of the poll. */
	public type = this.source.type;
	/** Returns true if the poll allows multiple answers. */
	public allowsMultipleAnswers = this.source.allows_multiple_answers;
	/** Gets the ID of the correct answer option, if specified. */
	public correctOptionId = this.source.correct_option_id;
	/** Gets the text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, if specified. */
	public explanation = this.source.explanation;
	/** Gets the entities that appear in the explanation text, if specified. */
	public explanationEntities = this.getContext<TelegramMessageEntity | undefined>({ key: 'MessageEntity', source: this.source.explanation_entities });
	/** Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions */
	public questionEntities = this.getContext<TelegramMessageEntity | undefined>({ key: 'MessageEntity', source: this.source.question_entities });
	/** Gets the amount of time in seconds the poll will be active after creation, if specified. */
	public openPeriod = this.source.open_period;

	/**
	 * This method searches for a poll option with the given text among all the options in the poll.
	 * @param text Parameter specifies the text to search for.
	 * @returns The found poll option.
	 */
	public getPollOptionByText(text: string) {
		const findResult = this.source.options.find((option) => option.text === text);
		return findResult;
	}

	/**
	 * Returns the percentage of votes for the transmitted option
	 * @param option Poll option from which to calculate the percentage
	 * @returns Percentage of those who voted for option
	 */
	public getPollOptionPercentage(option: TelegramPollOption) {
		const totalVoters = this.source.total_voter_count;
		return (option.voter_count / totalVoters) * 100;
	}
}
