import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketEntity, MarketLevelsEntity } from './market.entity';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity, MarketLevelsEntity])],
  providers: [MarketService],
  controllers: [MarketController],
})
export class MarketModule {}
