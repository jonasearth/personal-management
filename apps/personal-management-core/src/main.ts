import { NestFactory } from '@nestjs/core';
import { PersonalManagementCoreModule } from './personal-management-core.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PersonalManagementCoreModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
