import { IPeriodsList } from "../index";
import { axiosInstance } from "@shared/api";
import { FilterValue } from "@shared/ui/Filter/Filter.types";

class PeriodsService {
  async getPeriodsList(filters?: FilterValue[]): Promise<IPeriodsList[]> {
    const response = await axiosInstance.post(`/api/periods-list`, {
      filters: filters,
    });
    return response.data;
  }
}

export const periodsService = new PeriodsService();
