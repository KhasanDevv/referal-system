import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketEntity } from '../market/market.entity';
import { MarketUserEntity } from './market-user.entity';
import { UserEntity } from '../users/user.entity';
import { CreateMarketUserDto } from './dto/create-market-user.dto';

@Injectable()
export class MarketUsersService {
  constructor(
    @InjectRepository(MarketUserEntity)
    private marketUserRepo: Repository<MarketUserEntity>,
    @InjectRepository(MarketEntity)
    private marketRepo: Repository<MarketEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(credentials: CreateMarketUserDto) {
    const market = await this.marketRepo.findOne({
      where: { id: credentials.marketId },
    });
    if (!market) {
      throw new NotFoundException(
        `This ${credentials.marketId} market not found!`,
      );
    }

    const user = await this.userRepo.findOne({
      where: { id: credentials.userId },
    });
    if (!user) {
      throw new NotFoundException(`This ${credentials.userId} user not found!`);
    }

    let referralUser;
    if (credentials.referralId) {
      referralUser = await this.userRepo.findOne({
        where: { id: credentials.referralId },
      });
      if (!referralUser) {
        throw new NotFoundException(
          `This ${credentials.userId} referral user not found!`,
        );
      }
    }

    const marketUser = await this.marketUserRepo.create();
    marketUser.market = market;
    marketUser.user = user;
    marketUser.referral = referralUser;
    await this.marketUserRepo.save(marketUser);

    return {
      marketUser,
    };
  }
}
