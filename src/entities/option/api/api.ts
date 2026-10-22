import { axiosInstance } from "@shared/api";

class OptionService {
  async getOption(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/options/${id}`);
    return response.data;
  }
}

export const optionService = new OptionService();
