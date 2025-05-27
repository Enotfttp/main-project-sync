import { TFiltersRKO, IRKOList } from '../index.ts';
import { axiosInstance } from '@shared/index.ts';

class RKOService {
  async getRKOList(filters?: TFiltersRKO): Promise<IRKOList[]> {
    const response = await axiosInstance.post('api/rko-list', { filters: filters });
    return response.data;
  }
}

export const rkoService = new RKOService();
