import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AdzunaService } from '../adzuna/adzuna.service';

@Injectable()
export class MarketSyncScheduler {
  private readonly logger = new Logger(MarketSyncScheduler.name);

  constructor(private readonly adzunaService: AdzunaService) {}

  @Cron('0 3 * * 1')
  async syncMarketData() {
    this.logger.log('Starting scheduled market sync...');
    try {
      const results = await this.adzunaService.syncAllRegions();
      await this.adzunaService.updateSkillDemand();
      this.logger.log(`Scheduled sync completed: ${JSON.stringify(results)}`);
    } catch (error) {
      this.logger.error(`Scheduled sync failed: ${error}`);
    }
  }
}
