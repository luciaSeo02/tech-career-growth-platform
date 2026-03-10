import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';
import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    try {
      return await this.prisma.userProfile.create({
        data: {
          ...dto,
          userId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Profile already exists');
      }

      throw error;
    }
  }

  async findOne(userId: string) {
    return await this.prisma.userProfile.findUnique({
      where: { userId },
    });
  }

  async update(userId: string, dto: UpdateProfileDto) {
    return await this.prisma.userProfile.update({
      where: { userId },
      data: dto,
    });
  }
}
