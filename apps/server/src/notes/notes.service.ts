import { PrismaService } from './../prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto, userId: string) {
    const createdNote = await this.prisma.note.create({
      data: {
        ...createNoteDto,
        user: {
          connect: { id: userId }, // within relations
        },
      },
    });

    return {
      success: true,
      timestamps: Date.now(),
      data: createdNote,
    };
  }

  async findAll(
    userId: string,
    sort: 'createdAt' | 'updatedAt' | 'title',
    order: 'asc' | 'desc',
  ) {
    const sortField = sort ?? 'updatedAt';
    const sortOrder = order ?? 'desc';

    const data = await this.prisma.note.findMany({
      where: { userId },
      orderBy: { [sortField]: sortOrder },
    });

    const count = data.length;

    return {
      success: true,
      timestamps: Date.now(),
      count,
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.note.findUnique({
      where: { id },
    });

    return {
      success: true,
      timestamps: Date.now(),
      data,
    };
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });

    return {
      success: true,
      timestamps: Date.now(),
      data: updatedNote,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
