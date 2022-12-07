export interface User {
  id: number;
  name: string;
  phoneNumber: number;
  password: string;
  createdAt: Date;
}

export interface RegisterUser {
  name: string;
  phoneNumber: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  phoneNumber: number;
  createdAt: number;
}

export interface AuthUserResponse extends UserResponse {
  token: string;
}