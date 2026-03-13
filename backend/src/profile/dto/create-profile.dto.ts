import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsOptional,
  IsInt,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { ExperienceLevel, SkillLevel } from '@prisma/client';

export class SkillDto {
  @IsString()
  skillId: string;

  @IsOptional()
  @IsEnum(SkillLevel)
  level?: SkillLevel;

  @IsOptional()
  @IsInt()
  years?: number;
}

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  targetRole: string;

  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @IsOptional()
  @IsInt()
  yearsExperience?: number;

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  portfolioUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills?: SkillDto[];
}
