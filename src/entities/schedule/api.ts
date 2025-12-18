import { IPaymentSchedule } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class ScheduleService {
  async getSchedules(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IPaymentSchedule>> {
    const response = await axiosInstance.post(`/api/schedules`, {
      filters: filters,
    });
    return response.data;
  }

  async getSchedule(id?: string): Promise<IPaymentSchedule> {
    const response = await axiosInstance.get(`/api/schedules/${Number(id)}`);
    return response.data;
  }
}

export const scheduleService = new ScheduleService();
