import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config as loadEnv } from 'dotenv';
import { AppModule } from './app.module';

loadEnv({ path: `.env.${process.env.NODE_ENV || 'development'}` });

async function bootstrap() {
  const host = process.env.MS_HOST ?? '0.0.0.0';
  const port = Number(process.env.MS_PORT ?? 4001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host, port },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen();
  Logger.log(`Auth microservice listening on TCP ${host}:${port}`);
}
bootstrap();
