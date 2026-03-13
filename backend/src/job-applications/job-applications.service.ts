import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@Injectable()
export class JobApplicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.jobApplication.findMany({
      where: { userId },
      include: { skills: { include: { skill: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: { skills: { include: { skill: true } } },
    });

    if (!application) throw new NotFoundException('Application not found');
    if (application.userId !== userId) throw new ForbiddenException();

    return application;
  }

  async create(userId: string, dto: CreateJobApplicationDto) {
    const { skillIds, ...data } = dto;

    return this.prisma.jobApplication.create({
      data: {
        ...data,
        userId,
        ...(skillIds?.length && {
          skills: {
            create: skillIds.map((skillId) => ({ skillId })),
          },
        }),
      },
      include: { skills: { include: { skill: true } } },
    });
  }

  async update(userId: string, id: string, dto: UpdateJobApplicationDto) {
    await this.findOne(userId, id); // verifica ownership

    const { skillIds, ...data } = dto;

    return this.prisma.jobApplication.update({
      where: { id },
      data: {
        ...data,
        ...(skillIds && {
          skills: {
            deleteMany: {},
            create: skillIds.map((skillId) => ({ skillId })),
          },
        }),
      },
      include: { skills: { include: { skill: true } } },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // verifica ownership

    await this.prisma.jobApplication.delete({ where: { id } });

    return { message: 'Application deleted successfully' };
  }

  async getStats(userId: string) {
    const applications = await this.prisma.jobApplication.findMany({
      where: { userId },
      select: { status: true, source: true, companyType: true },
    });

    const total = applications.length;

    const byStatus = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const bySource = applications.reduce(
      (acc, app) => {
        if (app.source) acc[app.source] = (acc[app.source] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const byCompanyType = applications.reduce(
      (acc, app) => {
        if (app.companyType)
          acc[app.companyType] = (acc[app.companyType] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return { total, byStatus, bySource, byCompanyType };
  }
}
