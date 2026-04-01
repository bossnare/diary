import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Talor API')
  .setDescription('The Talor REST API documentation')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export default swaggerConfig;
