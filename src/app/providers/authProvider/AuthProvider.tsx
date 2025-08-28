import {  useGetUser } from '@entities/user';
import { ReactNode, useEffect } from 'react'
import { useRefreshTokenMutation } from '@entities/auth';
import { setupInterceptors } from '@shared/api/interceptors';
import { storage } from '@shared/utils/storage';

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {  mutateAsync: refreshToken } = useRefreshTokenMutation()
  const { refetch: refetchUser  } = useGetUser()

  useEffect(() => {
    // Настраиваем интерцепторы
    setupInterceptors()

    // Автоматически обновляем токен каждые 10 минут
    let refreshInterval: number | null = null

    if (storage.getToken()) {
      refetchUser()

      refreshInterval = window.setInterval(async () => {
        try {
          await refreshToken()
        } catch (error) {
          console.error('Scheduled token refresh failed:', error)
        }
      }, 10 * 60 * 1000) // 10 минут
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [refetchUser, refreshToken])

  return <>{children}</>
}
