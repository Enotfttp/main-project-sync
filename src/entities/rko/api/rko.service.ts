import { IRKOList } from "../index";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class RKOService {
  async getRKOList(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IRKOList>> {
    const response = await axiosInstance.post("api/rko-list", {
      filters: filters,
    });
    return response.data;
  }
}

export const rkoService = new RKOService();
