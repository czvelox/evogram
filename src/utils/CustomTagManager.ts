import { Evogram } from '../Client';
// Тип для callback-функции, которая вызывается для обработки пользовательского тега
// client — экземпляр Evogram, attrs — атрибуты тега, content — содержимое между тегами (если есть)
type TagCallback = (client: Evogram, attrs: Record<string, string>, content?: string) => Promise<string>;

// Описание пользовательского тега
interface TagDefinition {
	callback: TagCallback; // Функция, вызываемая для обработки тега
	recursive?: boolean; // Если true (по умолчанию), содержимое также обрабатывается рекурсивно
}

export class CustomTagManager {
	// Хранилище зарегистрированных тегов: имя -> описание
	private static tags: Map<string, TagDefinition> = new Map();

	// Регистрация нового пользовательского тега
	static register(tag: string, callback: TagCallback) {
		this.tags.set(tag.toLowerCase(), { callback });
	}

	// Асинхронная обработка текста с пользовательскими тегами
	static async process(client: Evogram, text: string): Promise<string> {
		// Узел дерева: либо текст, либо тег
		type Node = { type: 'text'; value: string } | { type: 'tag'; name: string; attrs: Record<string, string>; children: Node[] };
		const self = this;

		// Универсальный парсер одиночных и парных тегов (без привязки к зарегистрированным)
		function parseNodes(input: string): Node[] {
			const nodes: Node[] = [];
			const tagOpenRe = /^<([a-zA-Z0-9_\-]+)(\s+[^>]*)?>/;
			const tagSelfCloseRe = /^<([a-zA-Z0-9_\-]+)(\s+[^>]*)?\s*\/?>/;
			const tagCloseRe = (name: string) => new RegExp(`^</${name}>`);

			let i = 0;
			const len = input.length;
			const stack: { name: string; attrs: Record<string, string>; children: Node[] }[] = [];
			let buffer = '';

			while (i < len) {
				if (input[i] === '<') {
					const rest = input.slice(i);
					let m: RegExpExecArray | null = null;
					// Одиночный тег (только если есть / перед >)
					if ((m = /^<([a-zA-Z0-9_\-]+)(\s+[^>]*)?\s*\/>/.exec(rest))) {
						if (buffer) {
							(stack.length ? stack[stack.length - 1].children : nodes).push({ type: 'text', value: buffer });
							buffer = '';
						}
						const tagName = m[1].toLowerCase();
						const attrs: Record<string, string> = {};
						const attrsStr = m[2] ? m[2].trim() : '';
						attrsStr.replace(/([a-zA-Z0-9_\-]+)="([^"]*)"/g, (_: string, k: string, v: string) => ((attrs[k] = v), ''));
						const node: Node = { type: 'tag', name: tagName, attrs, children: [] };
						(stack.length ? stack[stack.length - 1].children : nodes).push(node);
						i += m[0].length;
						continue;
					}
					// Открывающий тег (только если НЕТ / перед >)
					if ((m = /^<([a-zA-Z0-9_\-]+)(\s+[^>]*)?>/.exec(rest))) {
						// Проверяем, что это не одиночный тег (нет / перед >)
						const isSelfClosing = /\/>$/.test(m[0]);
						if (!isSelfClosing) {
							if (buffer) {
								(stack.length ? stack[stack.length - 1].children : nodes).push({ type: 'text', value: buffer });
								buffer = '';
							}
							const tagName = m[1].toLowerCase();
							const attrs: Record<string, string> = {};
							const attrsStr = m[2] ? m[2].trim() : '';
							attrsStr.replace(/([a-zA-Z0-9_\-]+)="([^"]*)"/g, (_: string, k: string, v: string) => ((attrs[k] = v), ''));
							stack.push({ name: tagName, attrs, children: [] });
							i += m[0].length;
							continue;
						}
					}
					// Закрывающий тег
					if (stack.length && tagCloseRe(stack[stack.length - 1].name).test(rest)) {
						if (buffer) {
							stack[stack.length - 1].children.push({ type: 'text', value: buffer });
							buffer = '';
						}
						const node = stack.pop()!;
						const tagNode: Node = { type: 'tag', name: node.name, attrs: node.attrs, children: node.children };
						if (stack.length) {
							stack[stack.length - 1].children.push(tagNode);
						} else {
							nodes.push(tagNode);
						}
						i += `</${node.name}>`.length;
						continue;
					}
				}
				// Просто текст
				buffer += input[i];
				i++;
			}
			if (buffer) {
				(stack.length ? stack[stack.length - 1].children : nodes).push({ type: 'text', value: buffer });
			}
			// Если остались незакрытые теги — считаем их текстом
			while (stack.length) {
				const node = stack.pop()!;
				const tagNode: Node = { type: 'tag', name: node.name, attrs: node.attrs, children: node.children };
				nodes.push(tagNode);
			}
			return nodes;
		}

		// Рекурсивная обработка дерева узлов
		const processNodes = async (nodes: Node[]): Promise<string> => {
			let out = '';
			for (const node of nodes) {
				if (node.type === 'text') {
					out += node.value;
				} else {
					const def = self.tags.get(node.name.toLowerCase());
					const inner = node.children.length ? await processNodes(node.children) : undefined;
					if (!def) {
						const attrsStr = Object.entries(node.attrs)
							.map(([k, v]) => `${k}="${v}"`)
							.join(' ');
						if (node.children.length) {
							out += `<${node.name}${attrsStr ? ' ' + attrsStr : ''}>${inner}</${node.name}>`;
						} else {
							out += `<${node.name}${attrsStr ? ' ' + attrsStr : ''} />`;
						}
					} else {
						let result = await def.callback(client, node.attrs, inner);
						// Если результат содержит кастомные теги — прогоняем через process ещё раз
						const tagNames = Array.from(self.tags.keys());
						if (tagNames.length > 0) {
							const tagGroup = tagNames.map((t) => String(t).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
							const customTagRe = new RegExp(`<(${tagGroup})([\s>])`, 'i');
							if (customTagRe.test(result)) {
								result = await self.process(client, result);
							}
						}
						out += result;
					}
				}
			}
			return out;
		};

		const nodes = parseNodes(text);
		return processNodes(nodes);
	}
}
