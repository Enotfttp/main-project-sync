import { axiosInstance } from '@shared/index.ts';
import { User } from '../index';

class UserService {
  async getProfile(): Promise<User> {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await axiosInstance.put('/auth/profile', data);
    return response.data;
  }
}

export const userService = new UserService();
