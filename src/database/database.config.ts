import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/user.entity';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: config.get('database.host'),
      port: parseInt(config.get('database.port'), 10),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.name'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // entities: [UserEntity],
      synchronize: true,
    };
  },
};
