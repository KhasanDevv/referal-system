import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketEntity } from './market.entity';
import { Repository } from 'typeorm';
import { MarketCreateDto } from './dto/market-create.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(MarketEntity)
    private marketRepo: Repository<MarketEntity>,
  ) {}

  async createMarket(credentials: MarketCreateDto): Promise<any> {
    const marketEntity = this.marketRepo.create(credentials);
    const market = await this.marketRepo.save(marketEntity);
    return { market };
  }
}
