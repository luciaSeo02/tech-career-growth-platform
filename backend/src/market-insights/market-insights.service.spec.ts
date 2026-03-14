import { Test, TestingModule } from '@nestjs/testing';
import { MarketInsightsService } from './market-insights.service';

describe('MarketInsightsService', () => {
  let service: MarketInsightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketInsightsService],
    }).compile();

    service = module.get<MarketInsightsService>(MarketInsightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
