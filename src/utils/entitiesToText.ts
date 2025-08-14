import { TelegramMessageEntity, TelegramParseMode } from '../types';

export function entitiesToString(text: string, entities: TelegramMessageEntity[], parse_mode: TelegramParseMode) {
	let result = '';
	const openTags: TelegramMessageEntity[] = [];

	// Сортируем сущности по позиции начала
	const sortedEntities = [...entities].sort((a, b) => a.offset - b.offset);

	for (let i = 0; i < text.length; i++) {
		// Закрываем теги, которые заканчиваются на текущей позиции
		const endingEntities = sortedEntities.filter((entity) => entity.offset + entity.length === i);

		// Закрываем теги в обратном порядке (LIFO - последний открытый, первый закрытый)
		for (let j = openTags.length - 1; j >= 0; j--) {
			const openTag = openTags[j];
			if (openTag.offset + openTag.length === i) {
				openTags.splice(j, 1);
				result += getClosingTag(openTag, parse_mode);
			}
		}

		// Открываем теги, которые начинаются на текущей позиции
		const startingEntities = sortedEntities.filter((entity) => entity.offset === i);
		for (const entity of startingEntities) {
			openTags.push(entity);
			result += getOpeningTag(entity, parse_mode);
		}

		result += text[i];
	}

	// Закрываем все оставшиеся открытые теги в обратном порядке
	for (let i = openTags.length - 1; i >= 0; i--) {
		result += getClosingTag(openTags[i], parse_mode);
	}

	return result;
}

function getOpeningTag(entity: TelegramMessageEntity, parse_mode: TelegramParseMode): string {
	switch (parse_mode) {
		case 'HTML':
			switch (entity.type) {
				case 'bold':
					return '<b>';
				case 'italic':
					return '<i>';
				case 'underline':
					return '<u>';
				case 'strikethrough':
					return '<s>';
				case 'spoiler':
					return '<tg-spoiler>';
				case 'text_link':
					return `<a href="${entity.url}">`;
				case 'custom_emoji':
					return `<tg-emoji emoji-id="${entity.custom_emoji_id}">`;
				case 'mention':
					return entity.user ? `<a href="tg://user?id=${entity.user?.id}">` : '';
				default:
					return '';
			}
		default:
			return '';
	}
}

function getClosingTag(entity: TelegramMessageEntity, parse_mode: TelegramParseMode): string {
	switch (parse_mode) {
		case 'HTML':
			switch (entity.type) {
				case 'bold':
					return '</b>';
				case 'italic':
					return '</i>';
				case 'underline':
					return '</u>';
				case 'strikethrough':
					return '</s>';
				case 'spoiler':
					return '</tg-spoiler>';
				case 'text_link':
					return '</a>';
				case 'custom_emoji':
					return '</tg-emoji>';
				case 'mention':
					return '</a>';
				default:
					return '';
			}
		default:
			return '';
	}
}
