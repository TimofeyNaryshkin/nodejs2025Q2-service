import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionRes = exception.getResponse();

      if (typeof exceptionRes === 'string') {
        message = exceptionRes;
      } else if (typeof exceptionRes === 'object' && exceptionRes !== null) {
        message = (exceptionRes as any).message || message;
      }
    }

    const errorMessage = `${req.method} ${req.url} | Status: ${status} | Message: ${Array.isArray(message) ? message.join(', ') : message}`;
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.loggingService.error(errorMessage, stack, 'ExceptionFilter');

    res.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: req.url,
      message,
    });
  }
}
