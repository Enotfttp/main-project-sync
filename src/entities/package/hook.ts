import { packageService } from "./api";
import { IPackage } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPackages = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IPackage>,
      Error,
      TableDataWithPagination<IPackage>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["packages", filters],
    queryFn: () => packageService.getPackages(filters),
    ...options,
  });
};

export const useGetPackage = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IPackage, Error, IPackage, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: () => packageService.getPackage(id),
    ...options,
  });
};
