import chalk from 'chalk';
import util from 'util';

export enum LogLevel {
	ERROR = 'error',
	WARN = 'warn',
	LOG = 'log',
	DEBUG = 'debug',
	VERBOSE = 'verbose',
}

export type LogLevelPriority = {
	[key in LogLevel]: number;
};

const logLevelPriority: LogLevelPriority = {
	[LogLevel.ERROR]: 0,
	[LogLevel.WARN]: 1,
	[LogLevel.LOG]: 2,
	[LogLevel.DEBUG]: 3,
	[LogLevel.VERBOSE]: 4,
};

export interface LoggerOptions {
	logLevel?: LogLevel;
	colors?: boolean;
}

export class Logger {
	private context: string;
	public logLevel: LogLevel;
	private colorsEnabled: boolean;

	constructor(context: string = 'Evogram', options: LoggerOptions = {}) {
		this.context = context;
		this.logLevel = options.logLevel || LogLevel.LOG;
		this.colorsEnabled = options.colors !== undefined ? options.colors : true;
	}

	private getLogLevelPriority(level: LogLevel): number {
		return logLevelPriority[level] || logLevelPriority[LogLevel.LOG];
	}

	private getTimestamp(): string {
		return new Date().toLocaleString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true,
		});
	}

	private formatMessage(level: LogLevel, message: string, context: string, stack?: string): string {
		const timestamp = this.getTimestamp();
		const pid = process.pid;
		const color = this.getColor(level);

		let logMessage = `${color(`[Evogram] ${pid.toString().padEnd(6)} -`)} ${timestamp} ${color(level.toUpperCase().padStart(7))} ${chalk.yellow(`[${context}]`)} ${color(message)}`;

		if (stack) {
			const coloredStack = this.colorsEnabled ? chalk.red(stack) : stack;
			logMessage += `\n${coloredStack}`;
		}

		return logMessage;
	}

	private getColor(level: LogLevel): (text: string) => string {
		if (!this.colorsEnabled) return (text: string) => text;

		switch (level) {
			case LogLevel.ERROR:
				return chalk.red;
			case LogLevel.WARN:
				return chalk.yellow;
			case LogLevel.LOG:
				return chalk.green;
			case LogLevel.DEBUG:
				return chalk.blue;
			case LogLevel.VERBOSE:
				return chalk.gray;
			default:
				return chalk.white;
		}
	}

	private printMessage(level: LogLevel, message: any, context: string, stack?: string): void {
		if (this.getLogLevelPriority(level) > this.getLogLevelPriority(this.logLevel)) return;

		if (typeof message !== 'string') {
			message = util.inspect(message, {
				colors: this.colorsEnabled,
				depth: null,
			});
		}

		const formattedMessage = this.formatMessage(level, message, context, stack);
		// prettier-ignore
		// @ts-ignore
		console[{ [LogLevel.DEBUG]: 'debug', [LogLevel.ERROR]: 'error', [LogLevel.WARN]: 'warn' }[level] || 'log'](formattedMessage);
	}

	public error(message: any, trace?: string, context?: string): void {
		this.printMessage(LogLevel.ERROR, message, context || this.context, trace);
	}

	public warn(message: any, context?: string): void {
		this.printMessage(LogLevel.WARN, message, context || this.context);
	}

	public log(message: any, context?: string): void {
		this.printMessage(LogLevel.LOG, message, context || this.context);
	}

	public debug(message: any, context?: string): void {
		this.printMessage(LogLevel.DEBUG, message, context || this.context);
	}

	public verbose(message: any, context?: string): void {
		this.printMessage(LogLevel.VERBOSE, message, context || this.context);
	}

	public child(context: string): Logger {
		return new Logger(context, {
			logLevel: this.logLevel,
			colors: this.colorsEnabled,
		});
	}

	public static create(context: string): Logger {
		return new Logger(context);
	}
}
