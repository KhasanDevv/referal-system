import { Market } from '../../market/interfaces/Market';
import { User, UserResponse } from '../../users/interfaces/User';

export interface MarketUsers {
  id: number;
  market: Market;
  user: User;
  referral: User;
  cashBack: number;
}

export interface MarketUsersResponse {
  id: number;
  market: Market;
  user: UserResponse;
  referral: UserResponse;
}
