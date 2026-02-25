import { userService } from "./api";
import { IUser } from "./types";
import { storage } from "@shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getProfile(),
    enabled: !!storage.getToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUser = (data: Partial<IUser>) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userService.updateProfile(data),
  });
};
