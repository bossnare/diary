import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Diary API')
  .setDescription('The Diary REST API documentation')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export default swaggerConfig;
