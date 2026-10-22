import { packageService } from "./api";
import { TFilterPaginationRequest } from "@shared/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPackages = (
  filters?: TFilterPaginationRequest<any>,
  options?: Omit<UseQueryOptions<any, Error, QueryKey>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["packages", filters],
    queryFn: () => packageService.getPackages(filters),
    ...options,
  });
};

export const useGetPackage = (
  id: UUID,
  options?: Omit<UseQueryOptions<any, Error, QueryKey>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: () => packageService.getPackage(id),
    ...options,
  });
};

export const useGetPackageOptions = (
  id: UUID,
  filters: TFilterPaginationRequest<any>,
  options?: Omit<UseQueryOptions<any, Error, QueryKey>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["options", id, filters],
    queryFn: () => packageService.getPackageOptions(id, filters),
    ...options,
  });
};
