import {
  IAuthResponse,
  ILoginCredentials,
  IRegisterData,
} from "@entities/auth";
import { axiosInstance } from "@shared/api";

class AuthService {
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  }

  async register(userData: IRegisterData): Promise<IAuthResponse> {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  }

  async logout(): Promise<void> {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await axiosInstance.post(
      "/auth/refresh",
      {},
      {
        skipAuthRefresh: true, // Кастомный флаг чтобы избежать бесконечного цикла
      },
    );
    return response.data;
  }
}

export const authService = new AuthService();
