import { TelegramBotCommand, TelegramDeleteMyCommandsParams, TelegramGetChatMenuButtonParams, TelegramGetMyCommandsParams, TelegramGetMyDefaultAdministratorRightsParams, TelegramSetChatMenuButtonParams, TelegramSetMyCommandsParams, TelegramSetMyDefaultAdministratorRightsParams } from '../../../types';
import { ContextD } from '../../core';
import { UserContext } from '../../migrated';

@ContextD('Bot')
export class BotContext extends UserContext {
	/** Indicates whether the user can join groups. */
	public canJoinGroups = this.source.can_join_groups;
	/** Indicates whether the user can read all group messages.*/
	public canReadAllGroupMessages = this.source.can_read_all_group_messages;
	/** * Indicates whether the user supports inline queries. */
	public supportsInlineQueries = this.source.supports_inline_queries;
	/** * Indicates whether the user can connect to business accounts. */
	public canConnectToBusiness = this.source.can_connect_to_business;
	/** * Indicates whether the user has access to the main web app. */
	public hasMainWebapp = this.source.has_main_web_app;

	/**
	 * Retrieves the current list of the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to the current list of the bot's commands.
	 */
	public getCommands(params?: TelegramGetMyCommandsParams) {
		return this.client.api.getMyCommands(params);
	}

	/**
	 * Sets the bot's commands.
	 * @param commands An array of IBotCommand objects representing the new list of the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setCommands(commands: TelegramBotCommand[], params?: Partial<TelegramSetMyCommandsParams>): Promise<true>;

	/**
	 * Sets the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setCommands(params: TelegramSetMyCommandsParams): Promise<true>;

	public setCommands(commands: any, params?: any): Promise<boolean> {
		if (params && !params.commands) params.commands = commands;
		else if (!params) params = { commands };

		return this.client.api.setMyCommands(params);
	}

	/**
	 * Deletes the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public deleteCommands(params?: TelegramDeleteMyCommandsParams) {
		return this.client.api.deleteMyCommands(params);
	}

	/**
	 * Sets the bot's menu button for a chat.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setChatMenuButton(params?: TelegramSetChatMenuButtonParams) {
		return this.client.api.setChatMenuButton(params);
	}

	/**
	 * Retrieves the bot's menu button for a chat.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to the bot's menu button for the specified chat.
	 */
	public getChatMenuButton(params?: TelegramGetChatMenuButtonParams) {
		return this.client.api.getChatMenuButton(params);
	}

	/**
	 * Sets the bot's default administrator rights.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setDefaultAdministratorRights(params?: TelegramSetMyDefaultAdministratorRightsParams) {
		return this.client.api.setMyDefaultAdministratorRights(params);
	}

	/**
	 * Retrieves the bot's default administrator rights.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to the bot's default administrator rights.
	 */
	public getDefaultAdministratorRights(params?: TelegramGetMyDefaultAdministratorRightsParams) {
		return this.client.api.getMyDefaultAdministratorRights(params);
	}
}
