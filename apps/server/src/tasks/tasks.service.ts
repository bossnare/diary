import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
// import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { TaskStatus } from '../generated/prisma/client.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    await this.prisma.task.create({
      data: {
        ...createTaskDto,
        user: {
          connect: { id: userId }, // within relations
        },
      },
    });

    return {
      success: true,
      message: 'Task created',
      timestamps: Date.now(),
    };
  }

  async findAll(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
    });

    return {
      success: true,
      count: tasks.length,
      data: tasks,
      timestamps: Date.now(),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async updateComplete(id: string) {
    await this.prisma.task.update({
      where: { id },
      data: { status: TaskStatus.COMPLETED },
    });

    return {
      success: true,
      message: 'Task updated',
      timestamps: Date.now(),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
