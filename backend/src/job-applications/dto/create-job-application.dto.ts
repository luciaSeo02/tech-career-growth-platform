import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsUrl,
  IsDateString,
  Min,
  IsArray,
} from 'class-validator';
import {
  ApplicationStatus,
  ApplicationSource,
  CompanyType,
  WorkMode,
} from '@prisma/client';

export class CreateJobApplicationDto {
  @IsString()
  company: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsEnum(ApplicationSource)
  source?: ApplicationSource;

  @IsOptional()
  @IsEnum(CompanyType)
  companyType?: CompanyType;

  @IsOptional()
  @IsEnum(WorkMode)
  workMode?: WorkMode;

  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMin?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMax?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  appliedAt?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skillIds?: string[];
}
