import { scheduleService } from "./api";
import {
  IScheduleDetails,
  IScheduleFilter,
  IScheduleInfo,
  ISchedulePeriods,
  TSchedulesPaginationResponse,
} from "../model/types";
import { TFilterPaginationRequest } from "@shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetSchedules = (
  request?: TFilterPaginationRequest<IScheduleFilter, IScheduleInfo>,
  options?: Omit<
    UseQueryOptions<TSchedulesPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["schedules", request],
    queryFn: () => scheduleService.getSchedules(request),
    ...options,
  });
};

export const useGetSchedule = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IScheduleDetails, Error>,
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
