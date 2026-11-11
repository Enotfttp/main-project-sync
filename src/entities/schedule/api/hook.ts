import { scheduleService } from "./api";
import {
  IScheduleInfoDetails,
  TPeriodsPaginationResponse,
  TPeriodsRequest,
  TSchedulesPaginationResponse,
  TSchedulesRequest,
} from "../model/types";
import {
  useQueryClient,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

const getSchedulesQueryOptions = (request?: TSchedulesRequest) => ({
  queryKey: ["schedules", request],
  queryFn: () => scheduleService.getSchedules(request),
});

export const useGetSchedules = (
  request?: TSchedulesRequest,
  options?: Omit<
    UseQueryOptions<TSchedulesPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    ...getSchedulesQueryOptions(request),
    ...options,
  });
};

/**
 * Загружает список заявок вне рендера и кладёт результат в кэш,
 * чтобы таблица с тем же запросом не ходила за данными повторно.
 */
export const useFetchSchedules = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (request?: TSchedulesRequest) =>
      queryClient.query(getSchedulesQueryOptions(request)),
    [queryClient],
  );
};

export const useGetSchedule = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IScheduleInfoDetails, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["schedule", id],
    queryFn: () => scheduleService.getSchedule(id),
    ...options,
  });
};

export const useGetSchedulePeriods = (
  params: TPeriodsRequest,
  options?: Omit<
    UseQueryOptions<TPeriodsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["schedule", "periods", params],
    queryFn: () => scheduleService.getSchedulePeriods(params),
    ...options,
  });
};
