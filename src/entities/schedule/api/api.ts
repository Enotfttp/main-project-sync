import {
  IScheduleDetails,
  IScheduleFilter,
  ISchedulePeriods,
  TSchedulesPaginationResponse,
} from "../model/types";
import { axiosInstance } from "@shared/api";
import { TFilterPaginationRequest } from "@shared/types";

class ScheduleService {
  async getSchedules(
    filters?: TFilterPaginationRequest<IScheduleFilter>,
  ): Promise<TSchedulesPaginationResponse> {
    const response = await axiosInstance.post(`/schedules`, {
      filters: filters,
    });
    return response.data;
  }

  async getSchedule(id: UUID): Promise<IScheduleDetails> {
    const response = await axiosInstance.get(`/schedules/${id}`);
    return response.data;
  }

  async getSchedulePeriods(id: UUID): Promise<ISchedulePeriods> {
    const response = await axiosInstance.get(`/schedules/${id}/periods`);
    return response.data;
  }
}

export const scheduleService = new ScheduleService();
