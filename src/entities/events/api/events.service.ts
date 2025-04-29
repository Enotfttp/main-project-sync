import {IEventsList} from "../index.ts";
import {axiosInstance} from "@shared/index.ts";

class EventsService {

  async getEventsList ():Promise<IEventsList[]>{
    const response =  await axiosInstance.get("api/events-list");
    return response.data;
  }
}


export const eventsService = new EventsService();
