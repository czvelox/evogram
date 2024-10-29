import fs from 'fs';
import yaml from 'js-yaml';
import { TelegramSendMessageParams } from '../types';

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

		const text = template.text || template.caption ? this.interpolate(template.text || template.caption, params).replace(/ {2}/g, '') : undefined;
		return { ...template, [template.text ? 'text' : 'caption']: text } as TelegramSendMessageParams;
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

	private static interpolate(template: string, params?: Record<string, any>): string {
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
}
