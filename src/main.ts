import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { setupSwagger } from './lib/setup-swagger';
import { runMigrations } from './lib/run-migrations';

const logger = new Logger('bootstrap');

async function bootstrap() {
  initializeTransactionalContext();

  await runMigrations();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();

  setupSwagger(app);

  const PORT = configService.get('PORT');
  const HOST = configService.get('HOST');

  await app.listen(PORT, HOST);
  logger.log(`Server listening on http://${HOST}:${PORT}`);
}

bootstrap().catch(err => {
  console.error(err);
  Logger.error(err);
  process.exit(1);
});
