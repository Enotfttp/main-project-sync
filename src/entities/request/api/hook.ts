import { requestService } from "./api";
import {
  IRequestContent,
  IRequestDetails,
  IRequestFilter,
  IRequestHistory,
  IRequestInfo,
  TRequestsPaginationResponse,
} from "../model/types";
import { TFilterPaginationRequest } from "@shared/types";
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useCallback } from "react";

type TRequestsRequest = TFilterPaginationRequest<IRequestFilter, IRequestInfo>;

const getRequestsQueryOptions = (request?: TRequestsRequest) => ({
  queryKey: ["requests", request],
  queryFn: () => requestService.getRequests(request),
});

export const useGetRequests = (
  request?: TRequestsRequest,
  options?: Omit<
    UseQueryOptions<TRequestsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...getRequestsQueryOptions(request),
    ...options,
  });
};

/**
 * Загружает список заявок вне рендера и кладёт результат в кэш,
 * чтобы таблица с тем же запросом не ходила за данными повторно.
 */
export const useFetchRequests = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (request?: TRequestsRequest) =>
      queryClient.query(getRequestsQueryOptions(request)),
    [queryClient],
  );
};

export const useGetRequest = (
  id?: UUID,
  options?: Omit<
    UseQueryOptions<IRequestDetails, Error>,
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
  id?: UUID,
  options?: Omit<
    UseQueryOptions<IRequestContent, Error>,
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
  id?: UUID,
  options?: Omit<
    UseQueryOptions<IRequestHistory, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["request", "history", id],
    queryFn: () => requestService.getRequestHistory(id),
    ...options,
  });
};
