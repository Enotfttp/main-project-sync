import { IPeriods } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class Api {
  async getPeriods(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IPeriods>> {
    const response = await axiosInstance.post(`/api/periods`, {
      filters: filters,
    });
    return response.data;
  }

  async getPeriod(id?: string): Promise<IPeriods> {
    const response = await axiosInstance.get(`/api/periods/${Number(id)}`);
    return response.data;
  }
}

export const periodsService = new Api();
