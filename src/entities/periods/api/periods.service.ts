import { IPeriodsList, TFiltersPeriods } from '../index.ts';
import { axiosInstance } from '@shared/index.ts';

class PeriodsService {
  async getPeriodsList(filters?: TFiltersPeriods): Promise<IPeriodsList[]> {
    const response = await axiosInstance.post(`api/periods-list/${filters?.serviceId}`, { filters: filters });
    return response.data;
  }
}

export const periodsService = new PeriodsService();
