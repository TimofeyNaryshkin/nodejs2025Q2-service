import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {}
