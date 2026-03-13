import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddSkillDto } from './dto/add-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    const { skills, ...profileData } = dto;

    try {
      return await this.prisma.userProfile.create({
        data: {
          ...profileData,
          userId,
          ...(skills?.length && {
            skills: {
              create: skills.map((s) => ({
                skillId: s.skillId,
                level: s.level,
                years: s.years,
              })),
            },
          }),
        },
        include: { skills: { include: { skill: true } } },
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
      include: { skills: { include: { skill: true } } },
    });
  }

  async update(userId: string, dto: UpdateProfileDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skills, ...profileData } = dto;

    return await this.prisma.userProfile.update({
      where: { userId },
      data: profileData,
      include: { skills: { include: { skill: true } } },
    });
  }

  async addSkill(userId: string, dto: AddSkillDto) {
    const profile = await this.getProfileOrThrow(userId);

    try {
      return await this.prisma.userProfileSkill.create({
        data: {
          profileId: profile.id,
          skillId: dto.skillId,
          level: dto.level,
          years: dto.years,
        },
        include: { skill: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Skill already added to profile');
      }
      throw error;
    }
  }

  async updateSkill(userId: string, skillId: string, dto: UpdateSkillDto) {
    const profile = await this.getProfileOrThrow(userId);

    const entry = await this.prisma.userProfileSkill.findUnique({
      where: { profileId_skillId: { profileId: profile.id, skillId } },
    });

    if (!entry) throw new NotFoundException('Skill not found in profile');

    return await this.prisma.userProfileSkill.update({
      where: { profileId_skillId: { profileId: profile.id, skillId } },
      data: dto,
      include: { skill: true },
    });
  }

  async removeSkill(userId: string, skillId: string) {
    const profile = await this.getProfileOrThrow(userId);

    const entry = await this.prisma.userProfileSkill.findUnique({
      where: { profileId_skillId: { profileId: profile.id, skillId } },
    });

    if (!entry) throw new NotFoundException('Skill not found in profile');

    await this.prisma.userProfileSkill.delete({
      where: { profileId_skillId: { profileId: profile.id, skillId } },
    });

    return { message: 'Skill removed successfully' };
  }

  private async getProfileOrThrow(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }
}
