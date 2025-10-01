import { IUser } from '../index';
import { axiosInstance } from '@shared/api';

class UserService {
  async getProfile(): Promise<IUser> {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  }

  async updateProfile(data: Partial<IUser>): Promise<IUser> {
    const response = await axiosInstance.put('/auth/profile', data);
    return response.data;
  }
}

export const userService = new UserService();
