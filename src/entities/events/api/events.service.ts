import { IEventsList, TFiltersEvents } from '../index.ts';
import { axiosInstance } from '@shared/index.ts';

class EventsService {
  async getEventsList(filters?: TFiltersEvents): Promise<IEventsList[]> {
    const response = await axiosInstance.post(`api/events-list/${filters?.serviceId}`, { filters: filters });
    return response.data;
  }
}

export const eventsService = new EventsService();
