import { PrismaService } from './prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World! Welecome to DIARY API';
  }

  async getHealthz() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        db: 'up',
      };
    } catch {
      return {
        status: 'error',
        db: 'down',
      };
    }
  }
}
