import { requestTypesService } from "./api";
import { IRequestType } from "./types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetRequestTypes = (
  id: string,
  options?: Omit<
    UseQueryOptions<IRequestType[], Error, IRequestType[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["requestTypes", id],
    queryFn: () => requestTypesService.getRequestTypes(id),
    ...options,
  });
};

export const useGetRequestType = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IRequestType, Error, IRequestType, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["requestType", id],
    queryFn: () => requestTypesService.getRequestType(id),
    ...options,
  });
};
