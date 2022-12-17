import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Market, MarketLevels } from './interfaces/Market';
import { MarketUsers } from '../market-users/interfaces/MarketUsers';
import { MarketUserEntity } from '../market-users/market-user.entity';

@Entity('markets')
export class MarketEntity implements Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => MarketLevelsEntity, (level) => level.market)
  levels: MarketLevels[];

  @OneToMany((type) => MarketUserEntity, (marketUser) => marketUser.market)
  users: MarketUsers[];
}

@Entity('market_levels')
export class MarketLevelsEntity implements MarketLevels {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => MarketEntity, (market) => market.levels)
  market: Market;

  @Column({ type: 'smallint' })
  level: number;

  @Column({ type: 'smallint' })
  percentage: number;
}
