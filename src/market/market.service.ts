import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketEntity, MarketLevelsEntity } from './market.entity';
import { Repository } from 'typeorm';
import { MarketCreateDto } from './dto/market-create.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(MarketEntity)
    private marketRepo: Repository<MarketEntity>,
    @InjectRepository(MarketLevelsEntity)
    private marketLevelRepo: Repository<MarketLevelsEntity>,
  ) {}

  async createMarket(credentials: MarketCreateDto): Promise<any> {
    const marketEntity = this.marketRepo.create(credentials);
    const market = await this.marketRepo.save(marketEntity);
    let counter = 1;
    const levels = [];
    for (const level of credentials.levels) {
      const payload = {
        level: counter,
        percentage: level.percentage,
      };
      levels.push(payload);
      const marketLevel = await this.marketLevelRepo.create(payload);
      marketLevel.market = market;
      await this.marketLevelRepo.save(marketLevel);
      counter++;
    }
    return { ...marketEntity, levels };
  }
}
