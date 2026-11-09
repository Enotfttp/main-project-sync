import { optionService } from "./api";
import {
  IOptionInfoDetails,
  TOptionsPaginationResponse,
  TOptionsRequest,
} from "../model";
import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const useGetOptions = (
  params: TOptionsRequest,
  options?: Omit<
    UseQueryOptions<TOptionsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["options", params],
    queryFn: () => optionService.getOptions(params),
    ...options,
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
