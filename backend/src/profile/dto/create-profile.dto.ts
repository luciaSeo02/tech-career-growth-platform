import {
  IsString,
  IsArray,
  IsOptional,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  targetRole!: string;

  @IsString()
  @IsNotEmpty()
  experienceLevel!: string;

  @IsOptional()
  @IsInt()
  yearsExperience?: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  skills!: string[];

  @IsArray()
  @IsNotEmpty()
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
