import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables automatic transformation of query params
      whitelist: true, // Removes unexpected properties
    }),
  );
  await app.listen(3000);
}
bootstrap();
