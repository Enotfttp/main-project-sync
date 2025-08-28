import { useMutation, useQueryClient } from '@tanstack/react-query'
import { storage } from '@shared/utils/storage'
import { authService } from '../index';

export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      storage.setToken(data.token)
      // Можно также обновить данные пользователя если нужно
      queryClient.setQueryData(['user'], (old: any) => ({
        ...old,
        // обновляем только токен, остальные данные пользователя остаются
      }))
    },
    onError: (error) => {
      // При ошибке refresh token делаем logout
      storage.removeToken()
      queryClient.removeQueries({ queryKey: ['user'] })
      console.error('Token refresh failed:', error)
    }
  })
}
