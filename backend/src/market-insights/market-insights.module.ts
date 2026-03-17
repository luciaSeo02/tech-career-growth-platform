import { Module } from '@nestjs/common';
import { MarketInsightsService } from './market-insights.service';
import { MarketInsightsController } from './market-insights.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdzunaModule } from 'src/adzuna/adzuna.module';

@Module({
  imports: [PrismaModule, AdzunaModule],
  controllers: [MarketInsightsController],
  providers: [MarketInsightsService],
})
export class MarketInsightsModule {}
