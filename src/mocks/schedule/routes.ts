import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function scheduleRoutes(this: Server) {
  this.post("/schedules", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let schedules = schema.all("schedule").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.filters?.length > 0) {
      schedules = filterFunc(schedules, filters.filters);
    }

    return paginationFunc(schedules, filters.pagination);
  });

  this.get("/schedules/:id", (schema: any, request) => {
    const { id } = request.params;
    const schedules = schema.all("schedule").models.map((el) => el.attrs);

    return schedules.find((el) => el.id === id);
  });
}
