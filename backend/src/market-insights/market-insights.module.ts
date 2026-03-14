import { Module } from '@nestjs/common';
import { MarketInsightsService } from './market-insights.service';
import { MarketInsightsController } from './market-insights.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MarketInsightsController],
  providers: [MarketInsightsService],
})
export class MarketInsightsModule {}
