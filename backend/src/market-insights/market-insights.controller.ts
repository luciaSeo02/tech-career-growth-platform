import { Controller, Get, Post, Query, UseGuards, Req } from '@nestjs/common';
import { MarketInsightsService } from './market-insights.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.type';
import { AdzunaService } from 'src/adzuna/adzuna.service';

@UseGuards(JwtAuthGuard)
@Controller('market-insights')
export class MarketInsightsController {
  constructor(
    private readonly marketInsightsService: MarketInsightsService,
    private readonly adzunaService: AdzunaService,
  ) {}

  @Get()
  getOverview(@Query('region') region?: string) {
    return this.marketInsightsService.getMarketOverview(region);
  }

  @Get('top-skills')
  getTopSkills(
    @Query('region') region?: string,
    @Query('limit') limit?: string,
  ) {
    return this.marketInsightsService.getTopSkills(
      region,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('regions')
  getRegions() {
    return this.marketInsightsService.getRegions();
  }

  @Get('by-category')
  getByCategory(@Query('region') region?: string) {
    return this.marketInsightsService.getTopSkillsByCategory(region);
  }

  @Get('skill-gap')
  getSkillGap(@Req() req: AuthRequest) {
    return this.marketInsightsService.getSkillGap(req.user.sub);
  }

  @Post('sync')
  async syncMarketData() {
    const results = await this.adzunaService.syncAllRegions();
    await this.adzunaService.updateSkillDemand();
    return { message: 'Sync completed', results };
  }

  @Post('update-demand')
  async updateDemand() {
    await this.adzunaService.updateSkillDemand();
    return { message: 'SkillDemand updated' };
  }
}
