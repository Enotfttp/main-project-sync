import { scheduleService } from "./api";
import { IPaymentSchedule } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetSchedule = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IPaymentSchedule>,
      Error,
      TableDataWithPagination<IPaymentSchedule>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["schedules", filters],
    queryFn: () => scheduleService.getPackages(filters),
    ...options,
  });
};
