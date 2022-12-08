import { ConfigService } from '@nestjs/config';
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
      synchronize: true,
    };
  },
};
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'db.postgres',
  synchronize: false,
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/*{.ts,.js}'],
  logging: false,
  autoLoadEntities: true,
};
