import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profiles`;
  }

  async findById(userId: string) {
    const data = await this.prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!data) throw new NotFoundException('User not found!');

    return {
      success: true,
      timestamps: Date.now(),
      data,
    };
  }

  async findByUsername(username: string) {
    const data = await this.prisma.profile.findUnique({
      where: { username },
    });

    if (!data) throw new NotFoundException('User not found!');

    return {
      success: true,
      timestamps: Date.now(),
      data,
    };
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
