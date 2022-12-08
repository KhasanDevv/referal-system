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
