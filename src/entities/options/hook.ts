import { optionsService } from "./api";
import { IOption } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetOptions = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IOption>,
      Error,
      TableDataWithPagination<IOption>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["options", filters],
    queryFn: () => optionsService.getOptions(filters),
    ...options,
  });
};
