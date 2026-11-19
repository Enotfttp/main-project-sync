import { optionService } from "./api";
import {
  IOptionInfoDetails,
  TOptionsPaginationResponse,
  TOptionsRequest,
} from "../model";
import {
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetOptions = (
  params: TOptionsRequest,
  options?: Omit<
    UseQueryOptions<TOptionsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["options", params],
    queryFn: () => optionService.getOptions(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetOption = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IOptionInfoDetails, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["option", id],
    queryFn: () => optionService.getOption(id),
    ...options,
  });
};
