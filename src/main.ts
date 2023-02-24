import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Sell Car App')
    .setDescription('This is an api for sell car app')
    .setVersion('1.0')
    .addTag('sell-car')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('ui', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
