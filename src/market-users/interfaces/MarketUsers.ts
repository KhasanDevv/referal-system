import { Market } from '../../market/interfaces/Market';
import { User } from '../../users/interfaces/User';

export interface MarketUsers {
  id: number;
  market: Market;
  user: User;
  referral: User;
  cashBack: number;
}
