import { MarketUsers, MarketUsersResponse } from './interfaces/MarketUsers';
import { Market } from '../market/interfaces/Market';
import { UserResponse } from '../users/interfaces/User';
import { UserVeil } from '../users/user.veil';

export class MarketUserVeil implements MarketUsersResponse {
  id: number;
  market: Market;
  user: UserResponse;
  referral: UserResponse;

  constructor(marketUser: MarketUsers) {
    this.id = marketUser.id;
    this.market = marketUser.market;
    this.user = new UserVeil(marketUser.user);
    this.referral = new UserVeil(marketUser.referral);
  }
}
