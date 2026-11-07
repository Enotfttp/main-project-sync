import {
  IScheduleInfoDetails,
  ISchedulePeriods,
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

  async getSchedulePeriods(id: UUID): Promise<ISchedulePeriods> {
    const response = await axiosInstance.get(`/schedules/${id}/periods`);
    return response.data;
  }
}

export const scheduleService = new ScheduleService();
