import { IEventsList } from "../index";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class EventsService {
  async getEventsList(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IEventsList>> {
    const response = await axiosInstance.post(`/api/events-list`, {
      filters: filters,
    });
    return response.data;
  }
}

export const eventsService = new EventsService();
