import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Kupi svoe')
    .setDescription('The Kupi svoe API description')
    .setVersion('1.0')
    .addServer(process.env.BASE_URL, 'default server')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
}
