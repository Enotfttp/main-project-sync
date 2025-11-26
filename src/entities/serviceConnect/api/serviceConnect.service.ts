import { IServiceConnectionList, TFiltersServiceConnection } from "../index";
import { axiosInstance } from "@shared/api";

class ServiceConnectService {
  async getServiceConnectionList(
    filters?: TFiltersServiceConnection,
  ): Promise<IServiceConnectionList[]> {
    const response = await axiosInstance.post(`/api/service-connects`, {
      filters: filters,
    });
    return response.data;
  }
}

export const serviceConnectionService = new ServiceConnectService();
