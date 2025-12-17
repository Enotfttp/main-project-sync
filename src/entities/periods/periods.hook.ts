import { periodsService } from "./periods.service";
import { IPeriodsList } from "./periods.types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPeriodsList = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IPeriodsList>,
      Error,
      TableDataWithPagination<IPeriodsList>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["Periods-list", filters],
    queryFn: () => periodsService.getPeriodsList(filters),
    ...options,
  });
};
