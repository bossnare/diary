import { NoteStatus } from './../generated/prisma/client.js';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service.js';
import { subDays } from 'date-fns';

@Injectable()
export class CleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron('0 3 * * *')
  async cleanupTrashedNotes() {
    await this.prisma.note.deleteMany({
      where: {
        status: NoteStatus.TRASHED,
        deletedAt: {
          lt: subDays(new Date(), 30),
        },
      },
    });
  }
}
