import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8000);

  dotenv.config(); // Ensure .env is loaded
  console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
}
bootstrap();
