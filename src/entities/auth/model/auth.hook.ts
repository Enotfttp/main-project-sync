import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAuthResponse, authService } from '../index';
import { storage } from '@shared/utils';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data: IAuthResponse) => {
      storage.setToken(data.token);
      queryClient.setQueryData(['user'], data.user);
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data: IAuthResponse) => {
      storage.setToken(data.token);
      queryClient.setQueryData(['user'], data.user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      storage.removeToken();
      queryClient.removeQueries({ queryKey: ['user'] });
    },
  });
};
