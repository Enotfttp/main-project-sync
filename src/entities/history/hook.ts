import { historyService } from "./api";
import { IRequestHistory } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetHistories = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IRequestHistory>,
      Error,
      TableDataWithPagination<IRequestHistory>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["histories", filters],
    queryFn: () => historyService.getHistories(filters),
    ...options,
  });
};

export const useGetHistory = (
  id: string,
  options?: Omit<
    UseQueryOptions<IRequestHistory, Error, IRequestHistory, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => historyService.getHistory(id),
    ...options,
  });
};
