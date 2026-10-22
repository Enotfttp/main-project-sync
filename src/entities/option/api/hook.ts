import { optionService } from "./api";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetOption = (
  id: UUID,
  options?: Omit<UseQueryOptions<any, Error, QueryKey>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["option", id],
    queryFn: () => optionService.getOption(id),
    ...options,
  });
};
