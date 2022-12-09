import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
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

  @ManyToOne((type) => UserEntity, (user) => user.markets)
  user: User;

  @ManyToOne((type) => UserEntity, (user) => user.referrals)
  referral: User;

  @Column({ default: 0 })
  cashBack: number;
}
