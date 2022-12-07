import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.get('database.host'),
        port: parseInt(config.get('database.port'), 10),
        username: config.get('database.user'),
        password: config.get('database.password'),
        database: config.get('database.name'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
