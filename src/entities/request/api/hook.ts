import { requestService } from "./api";
import {
  IRequestDetails,
  IRequestFilter,
  IRequestHistory,
  IRequests,
} from "../model/types";
import { TPaginationFilter } from "@shared/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetRequests = (
  filters?: TPaginationFilter<IRequestFilter>,
  options?: Omit<
    UseQueryOptions<IRequests, Error, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["requests", filters],
    queryFn: () => requestService.getRequests(filters),
    ...options,
  });
};

export const useGetRequest = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IRequestDetails, Error, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["request", id],
    queryFn: () => requestService.getRequest(id),
    ...options,
  });
};

export const useGetRequestHistory = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IRequestHistory, Error, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["request", "history", id],
    queryFn: () => requestService.getRequestHistory(id),
    ...options,
  });
};
