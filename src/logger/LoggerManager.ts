import path from 'path';
import { createLogger, format, transports, Logger } from 'winston';
import { Evogram } from '../Client';

export class LoggerManager {
	public logger: Logger;
	private accountLoggers: Map<string, Logger>;

	constructor(
		public client: Evogram,
		public level: string = 'info'
	) {
		this.logger = createLogger({
			level,
			format: format.combine(
				format.timestamp(),
				format.printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level}]: ${message}`;
				})
			),
			transports: [new transports.Console(), new transports.File({ filename: 'logs/core.log' })],
		});

		this.accountLoggers = new Map();
	}

	getAccountLogger(accountId: string | number): Logger {
		if (!this.accountLoggers.has(accountId.toString())) {
			const accountLogger = createLogger({
				level: this.level,
				format: format.combine(
					format.timestamp({
						format: 'DD-MM-YYYY HH:mm:ss',
					}),
					format.printf(({ timestamp, level, message, stack, ...meta }) => {
						const sourceInfo = meta?.source ? `[${meta.source || 'unknown'}]` : '';
						delete meta.source;

						const jsonMeta = meta && Object.keys(meta).length ? JSON.stringify(meta) : '';

						// prettier-ignore
						if(!message) return ``;
						else return `${timestamp} ${level.toUpperCase()} ${['info', 'warn'].includes(level) ? ' ' : ''}${sourceInfo}: ${message}${jsonMeta ? ` | ${jsonMeta}` : ''}${stack ? `\n- ${stack}` : ''}`;
					})
				),
				transports: [new transports.File({ filename: path.join(this.client.directory, 'logs', `users`, `${accountId}.log`) })],
			});

			this.accountLoggers.set(accountId.toString(), accountLogger);
		}
		return this.accountLoggers.get(accountId.toString())!;
	}

	setLevel(level: string): void {
		this.logger.level = level;
		for (const logger of this.accountLoggers.entries()) logger[1].level = level;
	}
}
