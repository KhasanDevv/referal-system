export interface Admin {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

export interface LoginAdmin {
  username: string;
  password: string;
}

export class AdminResponse {
  id: number;
  username: string;
  createdAt: Date;
}

export class AdminAuthResponse extends AdminResponse {
  token: string;
}
