import { optionService } from "./api";
import { IOptionInfoDetails } from "../model";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetOption = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IOptionInfoDetails, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["option", id],
    queryFn: () => optionService.getOption(id),
    ...options,
  });
};
