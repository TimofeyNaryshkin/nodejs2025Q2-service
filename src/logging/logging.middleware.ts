import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    this.loggingService.log(
      `Request: ${method} ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
      'LoggingService',
    );

    res.on('finish', () => {
      const { statusCode } = res;
      this.loggingService.log(
        `Response: ${method} ${originalUrl} | Status: ${statusCode}`,
        'LoggingService',
      );
    });

    next();
  }
}
