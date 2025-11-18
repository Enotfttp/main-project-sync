import { ChartData, Service, TableData } from "@entities/admin";
import { adminService } from "@entities/admin/api/admin.service";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useServices = (
  options?: Omit<
    UseQueryOptions<Service[], Error, Service[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => adminService.getServicesList(),
    ...options,
  });
};

export const useDashboardData = (
  serviceId: string,
  options?: Omit<
    UseQueryOptions<ChartData[], Error, ChartData[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["dashboard", serviceId],
    queryFn: () => adminService.getDashboardData(serviceId),
    enabled: !!serviceId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useTableData = (
  serviceId: string,
  sectionId: string | null,
  filters?: FilterValue[],
  options?: Omit<
    UseQueryOptions<TableData[], Error, TableData[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["tableData", serviceId, sectionId, filters],
    queryFn: () => adminService.getTableData(serviceId!, sectionId, filters),
    enabled: !!serviceId && !!sectionId,
    ...options,
  });
};
