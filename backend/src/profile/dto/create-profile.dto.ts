import { IsString, IsArray, IsOptional, IsInt } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  targetRole!: string;

  @IsString()
  experienceLevel!: string;

  @IsOptional()
  @IsInt()
  yearsExperience?: number;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsArray()
  @IsString({ each: true })
  technologies!: string[];

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
}
