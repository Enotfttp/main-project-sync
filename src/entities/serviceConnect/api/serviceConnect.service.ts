import { IServiceConnectionList, TFiltersServiceConnection } from '../index';
import { axiosInstance } from '@shared/index.ts';

class ServiceConnectService {
  async getServiceConnectionList(filters?: TFiltersServiceConnection): Promise<IServiceConnectionList[]> {
    const response = await axiosInstance.post(`/api/service-connects/${filters?.idRKO}`, { filters: filters });
    return response.data;
  }
}

export const serviceConnectionService = new ServiceConnectService();
