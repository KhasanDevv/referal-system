import { Module } from '@nestjs/common';
import { MarketUsersService } from './market-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketUserEntity } from './market-user.entity';
import { MarketUsersController } from './market-users.controller';
import { MarketEntity } from '../market/market.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarketUserEntity, MarketEntity, UserEntity]),
  ],
  providers: [MarketUsersService],
  controllers: [MarketUsersController],
})
export class MarketUsersModule {}
