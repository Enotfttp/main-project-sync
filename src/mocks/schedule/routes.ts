import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function scheduleRoutes(this: Server) {
  this.post("/schedules", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let schedules = schema.all("schedule").models.map((el) => el.attrs);

    const { filters = {}, pagination } = requestBody?.filters || [];
    const filterSize = Object.keys(filters).length;

    if (filterSize > 0) {
      schedules = filterFunc(schedules, filters);
    }

    return paginationFunc(schedules, pagination);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.get("/schedules/:id", (schema: any, request) => {
    const { id } = request.params;
    const schedules = schema.all("schedule").models.map((el) => el.attrs);

    return schedules.find((el) => el.id === id);
  });
}
