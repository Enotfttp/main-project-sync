import { ChartData, Service, TableData } from "@entities/admin";
import { axiosInstance } from "@shared/api";
import { FilterValue } from "@shared/ui/Filter/Filter.types";

class AdminService {
  async getServicesList(): Promise<Service[]> {
    const response = await axiosInstance.get(`/api/services`);
    return response.data;
  }

  async getDashboardData(serviceId: string): Promise<ChartData[]> {
    const response = await axiosInstance.get(`/api/dashboards/${serviceId}`);
    return response.data;
  }

  async getTableData(
    serviceId: string,
    sectionId: string | null,
    filters?: FilterValue[],
  ): Promise<TableData[]> {
    const response = await axiosInstance.post(
      `/api/dashboards-info/${serviceId}/sections/${sectionId}`,
      { filters: filters },
    );
    return response.data;
  }
}

export const adminService = new AdminService();
