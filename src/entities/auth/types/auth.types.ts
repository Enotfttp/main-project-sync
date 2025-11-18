import { IUser } from "@entities/user";

export interface ILoginCredentials {
  login: string;
  password: string;
}

export interface IRegisterData extends ILoginCredentials {
  firstname: string;
  lastname: string;
  email: string;
  confirmPassword?: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
