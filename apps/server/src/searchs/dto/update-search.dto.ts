import { PartialType } from '@nestjs/swagger';
import { CreateSearchDto } from './create-search.dto.js';

export class UpdateSearchDto extends PartialType(CreateSearchDto) {}
