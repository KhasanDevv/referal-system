import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { MarketUsers } from './interfaces/MarketUsers';
import { MarketEntity } from '../market/market.entity';
import { Market } from '../market/interfaces/Market';
import { UserEntity } from '../users/user.entity';
import { User } from '../users/interfaces/User';

@Entity()
export class MarketUserEntity implements MarketUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => MarketEntity, (market) => market.users)
  market: Market;

  @OneToOne((type) => UserEntity, (user) => user.id)
  user: User;

  @OneToOne((type) => UserEntity, (user) => user.id)
  referral: User;

  @Column({ default: 0 })
  cashBack: number;
}
