import { Module } from '@nestjs/common';
import { MarketSyncScheduler } from './market-sync.scheduler';
import { AdzunaModule } from '../adzuna/adzuna.module';

@Module({
  imports: [AdzunaModule],
  providers: [MarketSyncScheduler],
})
export class SchedulerModule {}
