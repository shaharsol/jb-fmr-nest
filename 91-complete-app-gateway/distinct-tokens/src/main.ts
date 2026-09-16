import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config as loadEnv } from 'dotenv';
import { AppModule } from './app.module';

loadEnv({ path: `.env.${process.env.NODE_ENV || 'development'}` });

async function bootstrap() {
  const url =
    process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672';
  const queue = process.env.RABBITMQ_QUEUE ?? 'distinct_tokens';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
    },
  );

  await app.listen();
  Logger.log(`Distinct-tokens worker listening on queue "${queue}"`);
}
bootstrap();
