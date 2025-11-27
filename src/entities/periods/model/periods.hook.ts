import { IPeriodsList, periodsService } from "../index";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPeriodsList = (
  filters?: FilterValue[],
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
