import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setDescription('Testing App API')
    .setTitle('Testing App API')
    .setVersion('1.0');

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}