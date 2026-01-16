import { authService } from "./auth.service";
import { IAuthResponse } from "./auth.types";
import { routesPath } from "@app/providers";
import { storage } from "@shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data: IAuthResponse) => {
      storage.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data: IAuthResponse) => {
      storage.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      storage.removeToken();
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate(routesPath.enter.root);
    },
  });
};
