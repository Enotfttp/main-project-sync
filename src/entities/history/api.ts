import { IRequestHistory } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class HistoriesService {
  async getHistory(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IRequestHistory>> {
    const response = await axiosInstance.post(`/api/histories`, {
      filters: filters,
    });
    return response.data;
  }
}

export const historiesService = new HistoriesService();
