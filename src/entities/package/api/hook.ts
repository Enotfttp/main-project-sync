import { packageService } from "./api";
import {
  IPackageInfoDetails,
  TPackagesPaginationResponse,
  TPackagesRequest,
} from "@entities/package/model";
import {
  useQueryClient,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

const getPackagesQueryOptions = (request?: TPackagesRequest) => ({
  queryKey: ["packages", request],
  queryFn: () => packageService.getPackages(request),
});

export const useGetPackages = (
  request?: TPackagesRequest,
  options?: Omit<
    UseQueryOptions<TPackagesPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    ...getPackagesQueryOptions(request),
    ...options,
  });
};

/**
 * Загружает список заявок вне рендера и кладёт результат в кэш,
 * чтобы таблица с тем же запросом не ходила за данными повторно.
 */
export const useFetchPackages = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (request?: TPackagesRequest) =>
      queryClient.query(getPackagesQueryOptions(request)),
    [queryClient],
  );
};

export const useGetPackage = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IPackageInfoDetails, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["package", id],
    queryFn: () => packageService.getPackage(id),
    ...options,
  });
};
