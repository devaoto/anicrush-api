import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/filters/not-found.filter';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global filters
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  
  // Global prefix
  app.setGlobalPrefix('api/v1');
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap(); 