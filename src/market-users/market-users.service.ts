import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketEntity } from '../market/market.entity';
import { MarketUserEntity } from './market-user.entity';
import { UserEntity } from '../users/user.entity';
import { CreateMarketUserDto } from './dto/create-market-user.dto';
import { CreateUserWithMarketDto } from './dto/create-user-with-market.dto';
import { PasswordService } from '../users/services/password.service';
import { UserPostgresErrors } from '../users/user.postgres-errors';
import { MarketUserVeil } from './market-user.veil';

@Injectable()
export class MarketUsersService {
  constructor(
    @InjectRepository(MarketUserEntity)
    private marketUserRepo: Repository<MarketUserEntity>,
    @InjectRepository(MarketEntity)
    private marketRepo: Repository<MarketEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private passwordService: PasswordService,
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
    const marketUserVeil = new MarketUserVeil(marketUser);
    return {
      marketUser: marketUserVeil,
    };
  }

  async createUserWithUser(credentials: CreateUserWithMarketDto) {
    const user = await this.userRepo.create({
      name: credentials.name,
      phoneNumber: credentials.phoneNumber,
      password: await this.passwordService.hashPassword(credentials.password),
    });

    await this.userRepo
      .save(user)
      .catch(UserPostgresErrors.phoneNumberAlreadyExist);

    const market = await this.marketRepo.findOne({
      where: { id: credentials.marketId },
    });
    if (!market) {
      throw new NotFoundException(
        `This ${credentials.marketId} market not found!`,
      );
    }

    const marketUser = await this.marketUserRepo.create();
    marketUser.market = market;
    marketUser.user = user;

    await this.marketUserRepo.save(marketUser);
    const marketUserVeil = new MarketUserVeil(marketUser);
    return { marketUser: marketUserVeil };
  }
}
