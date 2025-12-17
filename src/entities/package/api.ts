import { IPackage } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class PackageService {
  async getPackages(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IPackage>> {
    const response = await axiosInstance.post(`/api/packages`, {
      filters: filters,
    });
    return response.data;
  }

  async getPackage(id?: string): Promise<IPackage> {
    const response = await axiosInstance.get(`/api/packages/${Number(id)}`);
    return response.data;
  }
}

export const packageService = new PackageService();
