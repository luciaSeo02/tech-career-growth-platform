import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddSkillDto } from './dto/add-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.type';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateProfileDto) {
    return this.profileService.create(req.user.sub, dto);
  }

  @Get()
  getProfile(@Req() req: AuthRequest) {
    return this.profileService.findOne(req.user.sub);
  }

  @Patch()
  update(@Req() req: AuthRequest, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(req.user.sub, dto);
  }

  @Post('skills')
  addSkill(@Req() req: AuthRequest, @Body() dto: AddSkillDto) {
    return this.profileService.addSkill(req.user.sub, dto);
  }

  @Patch('skills/:skillId')
  updateSkill(
    @Req() req: AuthRequest,
    @Param('skillId') skillId: string,
    @Body() dto: UpdateSkillDto,
  ) {
    return this.profileService.updateSkill(req.user.sub, skillId, dto);
  }

  @Delete('skills/:skillId')
  removeSkill(@Req() req: AuthRequest, @Param('skillId') skillId: string) {
    return this.profileService.removeSkill(req.user.sub, skillId);
  }
}
