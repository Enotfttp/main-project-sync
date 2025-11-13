import { IPeriodsList, periodsService, TFiltersPeriods } from "../index.ts";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPeriodsList = (
  filters?: TFiltersPeriods,
  options?: Omit<
    UseQueryOptions<IPeriodsList[], Error, IPeriodsList[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["Periods-list", filters],
    queryFn: () => periodsService.getPeriodsList(filters),
    ...options,
  });
};
