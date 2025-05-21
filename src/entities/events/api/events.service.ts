import { IEventsList } from '../index.ts';
import { axiosInstance } from '@shared/index.ts';

class EventsService {
  async getEventsList(id: string): Promise<IEventsList[]> {
    const response = await axiosInstance.get(`api/events-list/${id}`);
    return response.data;
  }
}

export const eventsService = new EventsService();
