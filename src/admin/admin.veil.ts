import { Admin, AdminResponse } from './interfaces/Admin';

export class AdminVeil implements AdminResponse {
  id: number;
  username: string;
  createdAt: Date;

  constructor(admin: Admin) {
    this.id = admin.id;
    this.username = admin.username;
    this.createdAt = admin.createdAt;
  }
}
