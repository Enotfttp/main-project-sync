import { authService } from "../index";
import { IUser } from "@entities/user";
import { storage } from "@shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      storage.setToken(data.token);
      // Можно также обновить данные пользователя если нужно
      queryClient.setQueryData(["user"], (old: IUser) => ({
        ...old,
        // обновляем только токен, остальные данные пользователя остаются
      }));
    },
    onError: (error) => {
      // При ошибке refresh token делаем logout
      storage.removeToken();
      queryClient.removeQueries({ queryKey: ["user"] });
      // eslint-disable-next-line no-console
      console.error("Token refresh failed:", error);
    },
  });
};
