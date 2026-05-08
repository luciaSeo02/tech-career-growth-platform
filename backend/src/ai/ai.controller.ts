import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('parse-job')
  async parseJob(@Body('url') url: string) {
    if (!url) {
      throw new Error('URL is required');
    }
    return this.aiService.parseJobListing(url);
  }
}
