import { PrismaService } from './../prisma/prisma.service.js';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { NoteStatus } from '../generated/prisma/client.js';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto, userId: string) {
    try {
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
        message: 'note created',
        timestamps: Date.now(),
        data: createdNote,
      };
    } catch {
      throw new HttpException(
        'Failed to create note. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(
    userId: string,
    sort: 'createdAt' | 'updatedAt' | 'title',
    order: 'asc' | 'desc',
  ) {
    const sortField = sort ?? 'updatedAt';
    const sortOrder = order ?? 'desc';

    const orderBy = { [sortField]: sortOrder };

    const data = await this.prisma.note.findMany({
      where: {
        userId,
        status: { in: [NoteStatus.DRAFT, NoteStatus.PUBLISHED] },
      },
      orderBy,
    });

    return {
      success: true,
      timestamps: Date.now(),
      count: data.length,
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
    try {
      await this.prisma.note.update({
        where: { id },
        data: {
          ...updateNoteDto,
          edited: true,
          numberOfEdits: { increment: 1 },
        },
      });

      return {
        success: true,
        message: 'notes updated',
        timestamps: Date.now(),
      };
    } catch {
      throw new HttpException(
        'Failed to update note. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softRemoveOne(id: string) {
    await this.prisma.note.update({
      where: { id, status: { in: [NoteStatus.DRAFT, NoteStatus.PUBLISHED] } },
      data: { status: NoteStatus.TRASHED, deletedAt: new Date() },
    });

    return {
      success: true,
      message: 'Note moved to trash',
      timestamps: Date.now(),
    };
  }

  async softRemoveMany(idsToRemove: string[]) {
    const result = await this.prisma.note.updateMany({
      where: {
        id: { in: idsToRemove },
        status: { in: [NoteStatus.DRAFT, NoteStatus.PUBLISHED] },
      },
      data: { status: NoteStatus.TRASHED, deletedAt: new Date() },
    });

    return {
      success: true,
      message: `${result.count} Notes moved to trash`,
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async restoreOne(id: string) {
    await this.prisma.note.update({
      where: { id, status: NoteStatus.TRASHED },
      data: { status: NoteStatus.DRAFT, deletedAt: null },
    });

    return {
      success: true,
      message: 'Note restored',
      timestamps: Date.now(),
    };
  }

  async restoreMany(idsToRestore: string[]) {
    const result = await this.prisma.note.updateMany({
      where: { id: { in: idsToRestore }, status: NoteStatus.TRASHED },
      data: { status: NoteStatus.DRAFT, deletedAt: null },
    });

    return {
      success: true,
      message: `${result.count} Notes restored`,
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async removeOne(id: string) {
    await this.prisma.note.delete({
      where: { id, status: NoteStatus.TRASHED },
    });

    return {
      success: true,
      message: 'Note permanently deleted',
      timestamps: Date.now(),
    };
  }

  async removeMany(idsToRemove: string[]) {
    const result = await this.prisma.note.deleteMany({
      where: { id: { in: idsToRemove }, status: NoteStatus.TRASHED },
    });

    return {
      success: true,
      message: `${result.count} Note permanently deleted`,
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async getTrash(userId: string) {
    const trashed = await this.prisma.note.findMany({
      where: {
        userId,
        status: NoteStatus.TRASHED,
      },
      orderBy: { deletedAt: 'desc' },
    });

    return {
      success: true,
      count: trashed.length,
      data: trashed,
      timestamps: Date.now(),
    };
  }
}
