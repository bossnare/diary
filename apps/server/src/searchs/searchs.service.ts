import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto.js';
import { UpdateSearchDto } from './dto/update-search.dto.js';

@Injectable()
export class SearchsService {
  create(createSearchDto: CreateSearchDto) {
    return 'This action adds a new search';
  }

  findAll() {
    return `This action returns all searchs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
