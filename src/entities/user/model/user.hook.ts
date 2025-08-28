import { useQuery } from '@tanstack/react-query';
import { userService, IUser } from '../index';
import { storage } from '@shared/utils/storage.ts';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getProfile(),
    enabled: !!storage.getToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUser = (data: Partial<IUser>) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userService.updateProfile(data),
  });
};
