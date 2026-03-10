import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.type';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateProfileDto) {
    return this.profileService.create(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req: AuthRequest) {
    return this.profileService.findOne(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: AuthRequest, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(req.user.sub, dto);
  }
}
