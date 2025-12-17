import { IPeriodsList } from "./periods.types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class PeriodsService {
  async getPeriodsList(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IPeriodsList>> {
    const response = await axiosInstance.post(`/api/periods-list`, {
      filters: filters,
    });
    return response.data;
  }
}

export const periodsService = new PeriodsService();
