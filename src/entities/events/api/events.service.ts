import { IEventsList } from "../index";
import { axiosInstance } from "@shared/api";
import { FilterValue } from "@shared/ui/Filter/Filter.types";

class EventsService {
  async getEventsList(filters?: FilterValue[]): Promise<IEventsList[]> {
    const response = await axiosInstance.post(`/api/events-list`, {
      filters: filters,
    });
    return response.data;
  }
}

export const eventsService = new EventsService();
