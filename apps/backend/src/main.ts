/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from "@nestjs/platform-fastify";

import { AppModule } from './app/app.module';

import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const globalPrefix = 'graphiql';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}`
  );
}

bootstrap();
