import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/'],
        queue: 'mail_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  // app.useGlobalPipes(new ValidationPipe());

  console.log('Firing up mail service!');
  await app.listen();
  console.log('Mail service is connected!');
}
bootstrap();
