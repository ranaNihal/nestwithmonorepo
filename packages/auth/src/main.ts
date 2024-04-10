import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, new ConfigService().get('natsService'));
  await app.listen();
}
bootstrap();
