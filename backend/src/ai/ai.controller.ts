/// <reference types="multer" />
import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import pdfParse from 'pdf-parse';

interface RequestWithUser extends Request {
  user: { sub: string; email: string };
}

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('parse-job')
  async parseJob(@Body('url') url: string) {
    if (!url) {
      throw new BadRequestException('URL is required');
    }
    return this.aiService.parseJobListing(url);
  }

  @Post('analyze-cv')
  @UseInterceptors(FileInterceptor('cv'))
  async analyzeCv(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    if (!file) {
      throw new BadRequestException('CV file is required');
    }
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are supported');
    }

    const data: { text: string } = await pdfParse(file.buffer);
    const cvText = data.text.trim().slice(0, 12000);

    if (!cvText) {
      throw new BadRequestException('Could not extract text from the PDF');
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { userId: req.user.sub },
      include: { skills: { include: { skill: true } } },
    });

    if (!profile) {
      throw new BadRequestException('Complete your profile first');
    }

    const userSkills = profile.skills.map((s) => s.skill.name);

    return this.aiService.analyzeCv(
      cvText,
      profile.targetRole,
      userSkills,
      profile.experienceLevel,
      profile.yearsExperience ?? 0,
    );
  }
}
