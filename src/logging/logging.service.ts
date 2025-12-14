import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
} from 'node:fs';
import { appendFile, rename, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logDir: string;
  private logFilePath: string;
  private errorLogFilePath: string;
  private maxFileSizeBytes: number;

  constructor() {
    super();
    this.setLogLevels(this.getLogLevelsFromEnv());

    this.logDir = join(process.cwd(), 'logs');
    this.logFilePath = join(this.logDir, 'app.log');
    this.errorLogFilePath = join(this.logDir, 'error.log');

    const maxFileSizeKB = parseInt(process.env.LOG_MAX_SIZE_KB || '1');
    this.maxFileSizeBytes = maxFileSizeKB * 1024;

    this.createLogDir();
  }

  private getLogLevelsFromEnv(): LogLevel[] {
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

  private createLogDir() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private async rotateLogFile(filePath: string) {
    try {
      const stats = await stat(filePath);

      if (stats.size >= this.maxFileSizeBytes) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = basename(filePath, '.log');
        const rotatedFilePath = join(
          this.logDir,
          `${fileName}-${timestamp}.log`,
        );
        await rename(filePath, rotatedFilePath);
      }
    } catch (error) {
      if ((error as any).code !== 'ENOENT') {
        console.error('Error rotating log file:', error);
      }
    }
  }

  private async writeToFileAsync(filePath: string, message: string) {
    try {
      await this.rotateLogFile(filePath);
      await appendFile(filePath, message + '\n', 'utf-8');
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  private writeToFileSync(filePath: string, message: string) {
    try {
      if (existsSync(filePath)) {
        const stats = statSync(filePath);

        if (stats.size >= this.maxFileSizeBytes) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const fileName = basename(filePath, '.log');
          const rotatedFilePath = join(
            this.logDir,
            `${fileName}-${timestamp}.log`,
          );
          renameSync(filePath, rotatedFilePath);
        }
      }

      appendFileSync(filePath, message + '\n', 'utf8');
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  private formatLogMessage(level: LogLevel, message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context ? `[${context}]` : '';
    return `${timestamp} [${level.toUpperCase()}] ${ctx} ${message}`;
  }

  fatal(message: any, context?: string): void {
    const formatedMessage = this.formatLogMessage('error', message, context);
    this.writeToFileSync(this.errorLogFilePath, formatedMessage);
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context)
    const formatedMessage = this.formatLogMessage('error', message, context);
    this.writeToFileSync(this.errorLogFilePath, formatedMessage);
  }

  warn(message: any, context?: string) {
    const formattedMessage = this.formatLogMessage('warn', message, context);
    this.writeToFileAsync(this.logFilePath, formattedMessage);
  }

  log(message: any, context?: string) {
    super.log(message, context)
    const formatedMessage = this.formatLogMessage('log', message, context);
    this.writeToFileAsync(this.logFilePath, formatedMessage);
  }

  debug(message: any, context?: string) {
    const formattedMessage = this.formatLogMessage('debug', message, context);
    this.writeToFileAsync(this.logFilePath, formattedMessage);
  }

  verbose(message: any, context?: string) {
    const formattedMessage = this.formatLogMessage('verbose', message, context);
    this.writeToFileAsync(this.logFilePath, formattedMessage);
  }
}
