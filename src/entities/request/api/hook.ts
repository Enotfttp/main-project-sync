import { requestService } from "./api";
import {
  TRequestHistoryPaginationResponse,
  TRequestHistoryRequest,
  TRequestsPaginationResponse,
  TRequestsRequest,
} from "../model/types";
import {
  useQueryClient,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

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
  return useSuspenseQuery({
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

export const useGetRequest = (id?: UUID) =>
  useSuspenseQuery({
    queryKey: ["request", id],
    queryFn: () => requestService.getRequest(id),
  });

export const useGetRequestContent = (id?: UUID) =>
  useSuspenseQuery({
    queryKey: ["request", "content", id],
    queryFn: () => requestService.getRequestContent(id),
  });

export const useGetRequestHistory = (
  params: TRequestHistoryRequest,
  options?: Omit<
    UseQueryOptions<TRequestHistoryPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["request", "history", params],
    queryFn: () => requestService.getRequestHistory(params),
    ...options,
  });
};
