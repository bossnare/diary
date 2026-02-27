import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import {
  TaskStatus,
  Profile as UserEntity,
} from '../generated/prisma/client.js';
import { User } from '../auth/decorators/user.decorator.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@User() user: UserEntity, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  updateToggle(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() body: { status: TaskStatus },
  ) {
    return this.tasksService.updateToggle(id, user.id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
