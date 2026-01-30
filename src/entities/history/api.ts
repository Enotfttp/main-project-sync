import { IRequestHistory } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class HistoryService {
  async getHistories(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IRequestHistory>> {
    const response = await axiosInstance.post(`/api/histories`, {
      filters: filters,
    });

    return response.data;
  }

  async getHistory(id: string): Promise<IRequestHistory[]> {
    const response = await axiosInstance.get(`/api/histories/${id}`);

    return response.data;
  }
}

export const historyService = new HistoryService();
