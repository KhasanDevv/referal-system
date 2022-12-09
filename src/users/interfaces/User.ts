export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
}

export interface RegisterUser {
  name: string;
  phoneNumber: string;
  password: string;
}

export interface LoginUser {
  phoneNumber: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  phoneNumber: string;
  createdAt: Date;
}

export interface AuthUserResponse extends UserResponse {
  token: string;
}

export class AuthPayload {
  id: number;
  type: string;
}
