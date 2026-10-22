import { axiosInstance } from "@shared/api";
import { TFilterPaginationRequest } from "@shared/types";

class PackageService {
  async getPackages(filters?: TFilterPaginationRequest<any>): Promise<any> {
    const response = await axiosInstance.post(`/packages`, {
      filters: filters,
    });
    return response.data;
  }

  async getPackage(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/packages/${id}`);
    return response.data;
  }

  async getPackageOptions(
    id: UUID,
    filters?: TFilterPaginationRequest<any>,
  ): Promise<any> {
    const response = await axiosInstance.post(`/packages/${id}/options`, {
      filters,
    });
    return response.data;
  }
}

export const packageService = new PackageService();
