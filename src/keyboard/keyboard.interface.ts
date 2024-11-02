import { CallbackQueryContext, UserContext } from '../contexts/migrated';
import { TelegramInlineKeyboardButton } from '../types';
/**
 * Interface extending TelegramInlineKeyboardButton with additional properties.
 */
export interface EvogramInlineKeyboardButton extends TelegramInlineKeyboardButton {
	/** The specified command will be called when the button is pressed. */
	commandName?: string;
	redirect?: string;
	/** The button will only be available for the specified user context or user ID. */
	onlyForUser?: UserContext | number;

	json?: Record<string, any>;
	onClick?: (context: CallbackQueryContext) => any;

	keyboard?: EvogramInlineKeyboardButton[][];
	isBackButton?: boolean;
}
