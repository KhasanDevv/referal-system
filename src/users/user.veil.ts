import { User } from './interfaces/User';

export class UserVeil {
  id: number;
  name: string;
  phoneNumber: string;
  createdAt: Date;
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.createdAt = user.createdAt;
  }
}
