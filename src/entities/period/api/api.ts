import { axiosInstance } from "@shared/api";

class PeriodService {
  async getPeriod(id?: UUID): Promise<any> {
    const response = await axiosInstance.get(`/periods/${id}`);
    return response.data;
  }
}

export const periodService = new PeriodService();
