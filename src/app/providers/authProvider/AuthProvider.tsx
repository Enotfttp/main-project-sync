import { useRefreshTokenMutation } from "@entities/auth/refresh-token.hook";
import { useGetUser } from "@entities/user/hook";
import { setupInterceptors } from "@shared/api";
import { storage } from "@shared/utils";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { mutateAsync: refreshToken } = useRefreshTokenMutation();
  const { refetch: refetchUser } = useGetUser();

  useEffect(() => {
    // Настраиваем интерцепторы
    setupInterceptors();

    // Автоматически обновляем токен каждые 10 минут
    let refreshInterval: number | null = null;

    if (storage.getToken()) {
      refetchUser();

      refreshInterval = window.setInterval(
        async () => {
          try {
            await refreshToken();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Scheduled token refresh failed:", error);
          }
        },
        10 * 60 * 1000,
      ); // 10 минут
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [refetchUser, refreshToken]);

  return <>{children}</>;
};
