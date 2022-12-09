import { Module } from '@nestjs/common';
import { MarketUsersService } from './market-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketUserEntity } from './market-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketUserEntity])],
  providers: [MarketUsersService],
})
export class MarketUsersModule {}
