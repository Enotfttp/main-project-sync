import { periodService } from "./api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPeriod = (
  id: UUID,
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["period", id],
    queryFn: () => periodService.getPeriod(id),
    ...options,
  });
};
