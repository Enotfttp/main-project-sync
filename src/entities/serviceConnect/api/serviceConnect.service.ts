import { IServiceConnectionList } from "../index";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class ServiceConnectService {
  async getServiceConnectionList(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IServiceConnectionList>> {
    const response = await axiosInstance.post(`/api/service-connects`, {
      filters: filters,
    });
    return response.data;
  }
}

export const serviceConnectionService = new ServiceConnectService();
