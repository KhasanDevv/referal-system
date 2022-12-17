import { marketMocks } from './mock/market.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';

describe('MarketController', () => {
  let controller: MarketController;
  let fakeService: Partial<MarketService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketController],
      providers: [
        {
          useValue: fakeService,
          provide: MarketService,
        },
      ],
    }).compile();
    controller = module.get<MarketController>(MarketController);
    fakeService = module.get<MarketService>(MarketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
