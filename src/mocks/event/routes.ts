import { filterFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function eventRoutes(this: Server) {
  this.post("/events-list", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let events = schema.all("event").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      events = filterFunc(events, filters);
    }

    return events;
  });
}
