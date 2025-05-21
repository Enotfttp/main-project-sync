import { IServicePackageList, TFiltersServicePackage } from '../index';
import { axiosInstance } from '@shared/index';

class ServicePackageService {
  async getServicePackagesList(filters?: TFiltersServicePackage): Promise<IServicePackageList[]> {
    const response = await axiosInstance.post(`/api/service-packages/${filters?.idRKO}`, { filters: filters });
    return response.data;
  }
}

export const servicePackagesService = new ServicePackageService();
