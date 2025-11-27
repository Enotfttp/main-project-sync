import { IRKOList } from "../index";
import { axiosInstance } from "@shared/api";
import { FilterValue } from "@shared/ui/Filter/Filter.types";

class RKOService {
  async getRKOList(filters?: FilterValue[]): Promise<IRKOList[]> {
    const response = await axiosInstance.post("api/rko-list", {
      filters: filters,
    });
    return response.data;
  }
}

export const rkoService = new RKOService();
