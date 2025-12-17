import { IOption } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class OptionsService {
  async getOptions(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IOption>> {
    const response = await axiosInstance.post(`/api/options`, {
      filters: filters,
    });
    return response.data;
  }
}

export const optionsService = new OptionsService();
