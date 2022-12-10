import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AdminModule } from './admin/admin.module';
import { MarketModule } from './market/market.module';
import { MarketUsersModule } from './market-users/market-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AdminModule,
    UsersModule,
    MarketModule,
    MarketUsersModule,
  ],
})
export class AppModule {}
