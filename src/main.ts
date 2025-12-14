import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingService } from './logging/logging.service';
import { CatchEverythingFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);

  app.useGlobalFilters(new CatchEverythingFilter(loggingService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  process.on('uncaughtExceptionMonitor', (error) => {
    loggingService.error(`Captured error: ${error.message}`);
    process.exit(1)
  });

  process.on('unhandledRejection', (reason) => {
    const message = `Unhandled rejection detected: ${
      reason instanceof Error ? reason.message : reason
    }`;
    loggingService.error(message);
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();
  const documnetFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documnetFactory);

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
