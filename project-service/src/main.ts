import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
  });
  await app.listen(8001);
}
bootstrap();
