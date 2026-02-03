import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { User } from '../auth/decorators/user.decorator.js';
import { Profile as UserEntity } from '../../generated/prisma/client.js';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@User() user: UserEntity, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto, user.id);
  }

  @Get()
  findAll(
    @User() user: UserEntity,
    @Query('sort') sort: 'createdAt' | 'updatedAt' | 'title',
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.notesService.findAll(user.id, sort, order);
  }

  @Get('trash')
  getTrash(@User() user: UserEntity) {
    return this.notesService.getTrash(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id/edit')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Patch(':id/soft-remove')
  softRemoveOne(@Param('id') id: string) {
    return this.notesService.softRemoveOne(id);
  }

  @Patch('')
  softRemoveMany(@Body() body: { idsToRemove: string[] }) {
    return this.notesService.softRemoveMany(body.idsToRemove);
  }

  @Patch('restore')
  restoreMany(@Body() body: { idsToRestore: string[] }) {
    return this.notesService.restoreMany(body.idsToRestore);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.notesService.removeOne(id);
  }

  @Delete('')
  removeMany(@Body() body: { idsToRemove: string[] }) {
    return this.notesService.removeMany(body.idsToRemove);
  }
}
