import { CommandContext, MessageContext } from '../contexts/migrated';
import { Command } from './Command';
import { CommandArguments } from './command.types';

export async function getCommandArguments(message: CommandContext, command: Command): Promise<any> {
	if (!command.params?.args || !message.text) return {};
	const args = command.params.args,
		argsType = typeof args.method === 'string' ? [args.method] : args.method,
		text = message.text.replace(/^\/(\S+)\s?/, '');

	for (const type of argsType) {
		const splitSpace = text.split(' ');

		if (['parameterized', 'space', 'fulltext'].includes(type) && !message.text.match(/\/\S+(@\S+)?\s\S+/)) continue;
		else if (type === 'space' && argsType.includes('parameterized') && text.split('--').length > 1) continue;
		else if (type === 'space' && args.value.length > splitSpace.length) continue;
		else if (type === 'stdin' && message.text.match(/\/\S+(@\S+)?\s\S+/)) continue;
		else if (type === 'parameterized' && text.split('--').length < 2) continue;

		//@ts-ignore
		if (type === 'space') {
			const value = getBySpace(text, args);
			if (value) return value;
		} else if (type === 'fulltext') return { [typeof args.value[0] === 'string' ? args.value[0] : args.value[0].name]: text };
		else if (type === 'parameterized') {
			const value = getByParameterized(text);
			if (value) return value;
		} else if (type === 'stdin') {
			return getByQuestion(message, args);
		}
	}
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

async function getByQuestion(message: CommandContext, args: CommandArguments) {
	console.log(args);

	try {
		return Object(
			//@ts-ignore
			...(await Promise.all(
				args.value.map(
					(arg) =>
						new Promise(async (resolve, reject) => {
							//@ts-ignore
							await message.client.api.sendMessage({ chat_id: message.chat.id, text: arg.question || `The "${arg.name || arg}" parameter is required for the command to work. Send the value in the following message` });
							message.client.question.addQuestion(message.user.id, (msg) => {
								resolve({ [typeof arg === 'string' ? arg : arg.name]: msg.text });
							});

							setTimeout(reject, 120000);
						})
				)
			))
		);
	} catch {}
}
