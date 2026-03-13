import { IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { SkillLevel } from '@prisma/client';

export class UpdateSkillDto {
  @IsOptional()
  @IsEnum(SkillLevel)
  level?: SkillLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  years?: number;
}
