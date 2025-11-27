import { IServiceConnectionList } from "../index";
import { axiosInstance } from "@shared/api";
import { FilterValue } from "@shared/ui/Filter/Filter.types";

class ServiceConnectService {
  async getServiceConnectionList(
    filters?: FilterValue[],
  ): Promise<IServiceConnectionList[]> {
    const response = await axiosInstance.post(`/api/service-connects`, {
      filters: filters,
    });
    return response.data;
  }
}

export const serviceConnectionService = new ServiceConnectService();
