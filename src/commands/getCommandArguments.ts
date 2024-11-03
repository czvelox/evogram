import { CommandContext, MessageContext } from '../contexts/migrated';
import { KeyboardManager } from '../keyboard';
import { Command } from './Command';
import { CommandArguments } from './command.types';

export async function getCommandArguments(message: CommandContext, command: Command): Promise<any> {
	if (!command.params?.args || !message.text) return {};

	const args = command.params.args;
	const argsType = typeof args.method === 'string' ? [args.method] : args.method;
	const text = message.text.replace(/^\/(\S+)\s?/, '');

	// Получаем уже сохранённые аргументы из истории
	const savedArgs = Object.assign(
		KeyboardManager.redirectHistory.get(message.user.id)?.reduce((acc, item) => {
			return Object.assign(acc, item.args || {});
		}, {}) || {},
		(typeof message.state.callbackData === 'object' ? (message.state.callbackData as Record<string, any>) : {}) || {}
	);

	// Определяем, какие аргументы ещё не были запрошены
	//@ts-ignore
	const missingArgs = args.value.filter((arg) =>
		!savedArgs[typeof arg === 'string' ? arg : arg.name] && !(typeof arg === 'string' ? arg : arg.name).endsWith('?') && typeof arg === 'object' ? !arg.default : false
	);

	// Если все аргументы уже есть, возвращаем их
	if (missingArgs.length === 0) return savedArgs;

	// Запрашиваем только недостающие аргументы
	for (const type of argsType) {
		const splitSpace = text.split(' ');

		if (['parameterized', 'space', 'fulltext'].includes(type) && !message.text.match(/\/\S+(@\S+)?\s\S+/)) continue;
		else if (!message.callbackQuery) {
			if (type === 'space' && argsType.includes('parameterized') && text.split('--').length > 1) continue;
			else if (type === 'space' && missingArgs.length > splitSpace.length) continue;
			else if (type === 'stdin' && message.text.match(/\/\S+(@\S+)?\s\S+/)) continue;
			else if (type === 'parameterized' && text.split('--').length < 2) continue;
		}

		//@ts-ignore
		if (type === 'space') {
			const value = getBySpace(text, { ...args, value: missingArgs });
			if (value) return { ...savedArgs, ...value };
		} else if (type === 'fulltext') {
			const fulltextValue = { [typeof missingArgs[0] === 'string' ? missingArgs[0] : missingArgs[0].name]: text };
			return { ...savedArgs, ...fulltextValue };
		} else if (type === 'parameterized') {
			const value = getByParameterized(text);
			if (value) return { ...savedArgs, ...value };
		} else if (type === 'stdin') {
			const stdinValue = await getByQuestion(message, { ...args, value: missingArgs });
			return { ...savedArgs, ...stdinValue };
		}
	}

	return savedArgs;
}

function getBySpace(text: string, args: CommandArguments) {
	const splitSpace = text.split(' ');
	//@ts-ignore
	return Object.assign(...args.value.map((x, i) => ({ [typeof x === 'string' ? x : x.name]: splitSpace[i] })));
}

function getByParameterized(text: string) {
	const split = text.split('--');

	if (!split) return;
	else split.splice(0, 1);

	//@ts-ignore
	return Object.assign(...split.map((x) => ({ [x.split('=')[0]]: x.split('=')[1]?.trim() })));
}

async function getByQuestion(message: CommandContext, args: any) {
	try {
		let object: Record<string, any> = {};

		for (const value of args.value) {
			object[typeof value === 'object' ? value.name : value] = await new Promise(async (resolve, reject) => {
				let question =
					typeof value === 'object' ? (typeof value.question === 'object' ? value.question : typeof value.question === 'function' ? value.question() : null) : null;

				if (question === null)
					question = { text: value.question || `The "${value.name || value}" parameter is required for the command to work. Send the value in the following message` };
				else if (typeof question === 'string') question = { text: question };

				//@ts-ignore
				await message.send({
					chat_id: message.chat.id,
					// prettier-ignore
					//@ts-ignore
					...question,
				});
				message.client.question.addQuestion(message.user.id, (msg) => {
					if (message.client.params.keyboardMode) msg.delete();
					resolve(msg.text);
				});

				setTimeout(reject, 120000);
			});
		}

		return object;
	} catch {}
}
