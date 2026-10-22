import { requestService } from "./api";
import {
  IRequestContent,
  IRequestDetails,
  IRequestFilter,
  IRequestHistory,
  TRequestsPaginationResponse,
} from "../model/types";
import { TFilterPaginationRequest } from "@shared/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetRequests = (
  filters?: TFilterPaginationRequest<IRequestFilter>,
  options?: Omit<
    UseQueryOptions<TRequestsPaginationResponse, Error, QueryKey>,
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

export const useGetRequestContent = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IRequestContent, Error, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["request", "content", id],
    queryFn: () => requestService.getRequestContent(id),
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
