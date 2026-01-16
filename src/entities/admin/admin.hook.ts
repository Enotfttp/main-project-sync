import { adminService } from "./admin.service";
import { ChartData, ErrorsChart, Service, TableData } from "./admin.types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

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

export const useMutationServiceActiveChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (filter: { id?: string; active: boolean }) =>
      adminService.updateServiceActiveChange(filter),
    onSuccess: (data: Service, variables: { id?: string; active: boolean }) => {
      // Правильно обновляем кеш
      queryClient.setQueryData(
        ["services"],
        (oldData: Service[] | undefined) => {
          if (!oldData) return [data];

          return oldData.map((service) =>
            service.id === variables.id
              ? { ...service, active: variables.active }
              : service,
          );
        },
      );
    },
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

export const useAdditionalErrorData = (
  serviceId?: string,
  options?: Omit<
    UseQueryOptions<ErrorsChart[], Error, ErrorsChart[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["errors", serviceId],
    queryFn: () => adminService.getAdditionalErrorData(serviceId),
    enabled: !!serviceId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useTableData = (
  serviceId: string,
  sectionId?: string,
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<TableData>,
      Error,
      TableDataWithPagination<TableData>,
      QueryKey
    >,
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
