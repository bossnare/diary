import { PrismaService } from './../prisma/prisma.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { NoteStatus } from '../generated/prisma/client.js';

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
      message: 'note created',
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
      where: {
        userId,
        status: { in: [NoteStatus.DRAFT, NoteStatus.PUBLISHED] },
      },
      orderBy: [{ pinned: 'desc' }, { [sortField]: sortOrder }],
    });

    return {
      success: true,
      timestamps: Date.now(),
      count: data.length,
      data,
    };
  }

  async findOne(id: string, userId: string) {
    const data = await this.prisma.note.findUnique({
      where: { id, userId },
    });

    return {
      success: true,
      timestamps: Date.now(),
      data,
    };
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
    await this.prisma.note.update({
      where: { id, userId },
      data: {
        ...updateNoteDto,
        edited: true,
        numberOfEdits: { increment: 1 },
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'note updated',
      timestamps: Date.now(),
    };
  }

  async updatePinnedForNotes(
    idsToUpdate: string[],
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ) {
    await this.prisma.note.updateMany({
      where: { id: { in: idsToUpdate }, userId },
      data: {
        ...updateNoteDto,
      },
    });

    return {
      success: true,
      message: 'note updated',
      timestamps: Date.now(),
    };
  }

  async softRemoveOne(id: string, userId: string) {
    await this.prisma.note.update({
      where: {
        id,
        status: { in: [NoteStatus.DRAFT, NoteStatus.PUBLISHED] },
        userId,
      },
      data: { status: NoteStatus.TRASHED, deletedAt: new Date() },
    });

    return {
      success: true,
      message: 'Note moved to trash',
      timestamps: Date.now(),
    };
  }

  async softRemoveMany(idsToRemove: string[], userId: string) {
    const result = await this.prisma.note.updateMany({
      where: {
        id: { in: idsToRemove },
        status: { in: [NoteStatus.DRAFT, NoteStatus.PUBLISHED] },
        userId,
      },
      data: { status: NoteStatus.TRASHED, deletedAt: new Date() },
    });

    if (!result.count) throw new NotFoundException('Notes not found');

    return {
      success: true,
      message: `${result.count} Notes moved to trash`,
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async restoreOne(id: string, userId: string) {
    await this.prisma.note.update({
      where: { id, status: NoteStatus.TRASHED, userId },
      data: { status: NoteStatus.DRAFT, deletedAt: null },
    });

    return {
      success: true,
      message: 'Note restored',
      timestamps: Date.now(),
    };
  }

  async restoreMany(idsToRestore: string[], userId: string) {
    const result = await this.prisma.note.updateMany({
      where: { id: { in: idsToRestore }, status: NoteStatus.TRASHED, userId },
      data: { status: NoteStatus.DRAFT, deletedAt: null },
    });

    if (!result.count) throw new NotFoundException('Notes not found');

    return {
      success: true,
      message: `${result.count} Notes restored`,
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async removeOne(id: string, userId: string) {
    await this.prisma.note.delete({
      where: { id, status: NoteStatus.TRASHED, userId },
    });

    return {
      success: true,
      message: 'Note permanently deleted',
      timestamps: Date.now(),
    };
  }

  async removeMany(idsToRemove: string[], userId: string) {
    const result = await this.prisma.note.deleteMany({
      where: { id: { in: idsToRemove }, status: NoteStatus.TRASHED, userId },
    });

    if (!result.count) throw new NotFoundException('Notes not found');

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
