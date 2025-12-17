import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function scheduleRoutes(this: Server) {
  this.post("/schedules", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let periods = schema.all("schedule").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      periods = filterFunc(periods, filters.filters);
    }

    return paginationFunc(periods, filters.pagination);
  });
}
