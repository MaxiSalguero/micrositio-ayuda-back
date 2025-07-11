import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataService } from './scripts/DataService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const loadData = app.get(DataService);
  await loadData.loadDataByDefault();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
