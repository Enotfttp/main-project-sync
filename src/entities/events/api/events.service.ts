import { IEventsList, TFiltersEvents } from "../index";
import { axiosInstance } from "@shared/api";

class EventsService {
  async getEventsList(filters?: TFiltersEvents): Promise<IEventsList[]> {
    const response = await axiosInstance.post(
      `api/events-list/${filters?.serviceId}`,
      { filters: filters },
    );
    return response.data;
  }
}

export const eventsService = new EventsService();
