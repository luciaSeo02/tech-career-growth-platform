import { Test, TestingModule } from '@nestjs/testing';
import { MarketInsightsController } from './market-insights.controller';

describe('MarketInsightsController', () => {
  let controller: MarketInsightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketInsightsController],
    }).compile();

    controller = module.get<MarketInsightsController>(MarketInsightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
