import { IPeriodsList } from '../index.ts';
import { axiosInstance } from '@shared/index.ts';

class PeriodsService {
  async getPeriodsList(id: string): Promise<IPeriodsList[]> {
    const response = await axiosInstance.get(`api/periods-list/${id}`);
    return response.data;
  }
}

export const periodsService = new PeriodsService();
