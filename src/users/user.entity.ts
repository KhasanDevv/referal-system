import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './interfaces/User';
import { MarketUserEntity } from '../market-users/market-user.entity';
import { MarketUsers } from '../market-users/interfaces/MarketUsers';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => MarketUserEntity, (marketUser) => marketUser.user)
  markets: MarketUsers[];

  @OneToMany((type) => MarketUserEntity, (marketUser) => marketUser.referral)
  referrals: MarketUsers[];
}
