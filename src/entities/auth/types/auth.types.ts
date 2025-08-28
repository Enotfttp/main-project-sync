import { IUser } from '@entities/user';

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  username: string
  confirmPassword?: string
}

export interface AuthResponse {
  token: string
  user: IUser
}

