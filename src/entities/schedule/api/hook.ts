import { scheduleService } from "./api";
import {
  IScheduleInfoDetails,
  ISchedulePeriods,
  TSchedulesPaginationResponse,
  TSchedulesRequest,
} from "../model/types";
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
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
  return useQuery({
    ...getSchedulesQueryOptions(request),
    ...options,

    queryKey: ["schedules", request],
    queryFn: () => scheduleService.getSchedules(request),
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
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: () => scheduleService.getSchedule(id),
    ...options,
  });
};

export const useGetSchedulePeriods = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<ISchedulePeriods, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["schedule", "periods", id],
    queryFn: () => scheduleService.getSchedulePeriods(id),
    ...options,
  });
};
