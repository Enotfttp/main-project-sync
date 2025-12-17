import { IPaymentSchedule } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class ScheduleService {
  async getPackages(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IPaymentSchedule>> {
    const response = await axiosInstance.post(`/api/schedules`, {
      filters: filters,
    });
    return response.data;
  }
}

export const scheduleService = new ScheduleService();
