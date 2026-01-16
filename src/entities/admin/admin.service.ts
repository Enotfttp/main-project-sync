import { ChartData, ErrorsChart, Service, TableData } from "./admin.types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class AdminService {
  async getServicesList(): Promise<Service[]> {
    const response = await axiosInstance.get(`/api/services`);
    return response.data;
  }

  async updateServiceActiveChange(filter: {
    id?: string;
    active: boolean;
  }): Promise<Service> {
    const response = await axiosInstance.post(`/api/services-active`, {
      filters: filter,
    });
    return response.data;
  }

  async getDashboardData(serviceId: string): Promise<ChartData[]> {
    const response = await axiosInstance.get(`/api/dashboards/${serviceId}`);
    return response.data;
  }

  async getAdditionalErrorData(serviceId?: string): Promise<ErrorsChart[]> {
    const response = await axiosInstance.get(`/api/errors/${serviceId}`);
    return response.data;
  }

  async getTableData(
    serviceId: string,
    sectionId?: string,
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<TableData>> {
    const response = await axiosInstance.post(
      `/api/dashboards-info/${serviceId}/sections/${sectionId}`,
      { filters: filters },
    );
    return response.data;
  }
}

export const adminService = new AdminService();
