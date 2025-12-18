import { periodsService } from "./periods.service";
import { IPeriods } from "./periods.types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPeriodsList = (
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
    queryFn: () => periodsService.getPeriodsList(filters),
    ...options,
  });
};
