import { scheduleService } from "./api";
import {
  IScheduleDetails,
  IScheduleFilter,
  ISchedulePeriods,
  ISchedules,
} from "../model/types";
import { TPaginationFilter } from "@shared/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetSchedules = (
  filters?: TPaginationFilter<IScheduleFilter>,
  options?: Omit<
    UseQueryOptions<ISchedules, Error, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["schedules", filters],
    queryFn: () => scheduleService.getSchedules(filters),
    ...options,
  });
};

export const useGetSchedule = (
  id?: string,
  options?: Omit<
    UseQueryOptions<IScheduleDetails, Error, QueryKey>,
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
  id?: string,
  options?: Omit<
    UseQueryOptions<ISchedulePeriods, Error, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["schedule", "periods", id],
    queryFn: () => scheduleService.getSchedulePeriods(id),
    ...options,
  });
};
