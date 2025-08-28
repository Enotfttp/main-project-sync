import { axiosInstance } from '@shared/index.ts';
import { AuthResponse, LoginCredentials, RegisterData } from '@entities/auth/types/auth.types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<void> {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await axiosInstance.post('/auth/refresh',{}, {
      skipAuthRefresh: true // Кастомный флаг чтобы избежать бесконечного цикла
    });
    return response.data;
  }

}

export const authService = new AuthService();
