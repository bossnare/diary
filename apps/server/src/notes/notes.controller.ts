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
  findOne(@User() user: UserEntity, @Param('id') id: string) {
    return this.notesService.findOne(id, user.id);
  }

  @Patch(':id/update')
  update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto, user.id);
  }

  @Patch('bulk/pinned')
  updatePinnedForNotes(
    @User() user: UserEntity,
    @Body() body: { ids: string[]; data: UpdateNoteDto },
  ) {
    return this.notesService.updatePinnedForNotes(body.ids, body.data, user.id);
  }

  @Patch(':id/soft-remove')
  softRemoveOne(@User() user: UserEntity, @Param('id') id: string) {
    return this.notesService.softRemoveOne(id, user.id);
  }

  @Patch('')
  softRemoveMany(
    @User() user: UserEntity,
    @Body() body: { idsToRemove: string[] },
  ) {
    return this.notesService.softRemoveMany(body.idsToRemove, user.id);
  }

  @Patch('restore')
  restoreMany(
    @User() user: UserEntity,
    @Body() body: { idsToRestore: string[] },
  ) {
    return this.notesService.restoreMany(body.idsToRestore, user.id);
  }

  @Delete(':id')
  removeOne(@User() user: UserEntity, @Param('id') id: string) {
    return this.notesService.removeOne(id, user.id);
  }

  @Delete('')
  removeMany(
    @User() user: UserEntity,
    @Body() body: { idsToRemove: string[] },
  ) {
    return this.notesService.removeMany(body.idsToRemove, user.id);
  }
}
