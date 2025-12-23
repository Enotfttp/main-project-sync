import { periodsService } from "./api";
import { IPeriods } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPeriods = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IPeriods>,
      Error,
      TableDataWithPagination<IPeriods>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["periods", filters],
    queryFn: () => periodsService.getPeriods(filters),
    ...options,
  });
};

export const useGetPeriod = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IPeriods, Error, IPeriods, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["period", id],
    queryFn: () => periodsService.getPeriod(id),
    ...options,
  });
};
