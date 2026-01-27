import { Module } from '@nestjs/common';
import { SearchsService } from './searchs.service.js';
import { SearchsController } from './searchs.controller.js';

@Module({
  controllers: [SearchsController],
  providers: [SearchsService],
})
export class SearchsModule {}
