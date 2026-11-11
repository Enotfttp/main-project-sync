import {
  IScheduleInfoDetails,
  TPeriodsPaginationResponse,
  TPeriodsRequest,
  TSchedulesPaginationResponse,
  TSchedulesRequest,
} from "../model/types";
import { axiosInstance, toListParams } from "@shared/api";

class ScheduleService {
  async getSchedules({
    filters,
    ...listParams
  }: TSchedulesRequest = {}): Promise<TSchedulesPaginationResponse> {
    const response = await axiosInstance.post(
      `/schedules`,
      { ...filters },
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getSchedule(id: UUID): Promise<IScheduleInfoDetails> {
    const response = await axiosInstance.get(`/schedules/${id}`);
    return response.data;
  }

  async getSchedulePeriods({
    scheduleSourceGuid,
    ...listParams
  }: TPeriodsRequest): Promise<TPeriodsPaginationResponse> {
    const response = await axiosInstance.get(
      `/schedules/${scheduleSourceGuid}/periods`,
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }
}

export const scheduleService = new ScheduleService();
