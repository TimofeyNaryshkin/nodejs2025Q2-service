import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(this.getLogLevelsFromEnv());
  }

  getLogLevelsFromEnv(): LogLevel[] {
    const logLevel = process.env.LOG_LEVEL.toLowerCase() || 'log';

    const levelHierarchy: Record<LogLevel, LogLevel[]> = {
      fatal: ['fatal'],
      error: ['fatal', 'error'],
      warn: ['fatal', 'error', 'warn'],
      log: ['fatal', 'error', 'warn', 'log'],
      debug: ['fatal', 'error', 'warn', 'log', 'debug'],
      verbose: ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'],
    };

    return levelHierarchy[logLevel] || levelHierarchy['log'];
  }
}
