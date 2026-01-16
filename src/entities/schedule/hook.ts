import { scheduleService } from "./api";
import { IPaymentSchedule } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetSchedules = (
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
    queryFn: () => scheduleService.getSchedules(filters),
    ...options,
  });
};

export const useGetSchedule = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IPaymentSchedule, Error, IPaymentSchedule, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: () => scheduleService.getSchedule(id),
    ...options,
  });
};
