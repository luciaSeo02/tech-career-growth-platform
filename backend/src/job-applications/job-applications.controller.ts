import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.type';

@UseGuards(JwtAuthGuard)
@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.jobApplicationsService.findAll(req.user.sub);
  }

  @Get('stats')
  getStats(@Req() req: AuthRequest) {
    return this.jobApplicationsService.getStats(req.user.sub);
  }

  @Get(':id')
  findOne(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.jobApplicationsService.findOne(req.user.sub, id);
  }

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(req.user.sub, dto);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationsService.update(req.user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.jobApplicationsService.remove(req.user.sub, id);
  }
}
