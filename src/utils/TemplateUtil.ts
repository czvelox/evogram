import fs from 'fs';
import yaml from 'js-yaml';
import { TelegramSendMessageParams } from '../types';
import { EvogramInlineKeyboardButton } from '../keyboard';

export interface Template {
	text: string;
	[key: string]: any;
}

export class TemplateUtil {
	private static templates: Record<string, Template> = {};

	public static loadTemplates(path: string) {
		try {
			const fileContents = fs.readFileSync(path, 'utf8');
			const newTemplates = yaml.load(fileContents) as Record<string, Template>;
			this.templates = { ...this.templates, ...newTemplates };
		} catch (error) {
			console.error('Error loading templates:', error);
		}
	}

	public static getTemplate(path: string, params?: Record<string, any>): TelegramSendMessageParams {
		const template: any = this.findNestedTemplate(path);
		if (!template) throw new Error(`Passed template "${path}" does not exist`);

		// Интерполируем весь объект
		let interpolatedTemplate = this.interpolateObject(template, params);
		if (interpolatedTemplate.reply_markup?.inline_keyboard)
			interpolatedTemplate.reply_markup.inline_keyboard = interpolatedTemplate.reply_markup?.inline_keyboard
				.map((x: EvogramInlineKeyboardButton[]) => x.filter((x) => x.text))
				.filter((x: any) => x.length);
		return interpolatedTemplate as TelegramSendMessageParams;
	}

	private static findNestedTemplate(path: string): Template | undefined {
		const keys = path.split('.');
		let current: any = this.templates;

		for (const key of keys) {
			if (current[key]) current = current[key];
			else return undefined;
		}

		return typeof current === 'string' ? { text: current } : current;
	}

	public static interpolate(template: string, params?: Record<string, any>): string {
		// Обработка тернарных выражений и переменных с использованием eval
		return template.replace(/{{\s*([\s\S]*?)\s*}}/g, (_, expression) => {
			try {
				// Создаем функцию, в которую передаем параметры для подстановки значений
				const func = new Function(...Object.keys(params || {}), `return ${expression};`);
				return func(...Object.values(params || {}));
			} catch (error) {
				console.error(`Error evaluating expression "${expression}":`, error);
				return '';
			}
		});
	}

	private static interpolateObject(obj: any, params?: Record<string, any>): any {
		if (typeof obj === 'string') {
			// Интерполируем строки
			return this.interpolate(obj, params);
		} else if (Array.isArray(obj)) {
			// Для массивов применяем рекурсию для каждого элемента
			return obj.map((item) => this.interpolateObject(item, params));
		} else if (typeof obj === 'object' && obj !== null) {
			// Для объектов рекурсивно интерполируем каждое значение
			return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, this.interpolateObject(value, params)]));
		}
		// Если это не строка, массив или объект, возвращаем значение как есть
		return obj;
	}
}
