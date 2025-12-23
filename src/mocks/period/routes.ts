import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function periodRoutes(this: Server) {
  this.post("/periods", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let periods = schema.all("period").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      periods = filterFunc(periods, filters.filters);
    }

    return paginationFunc(periods, filters.pagination);
  });

  this.get("/periods/:id", (schema: any, request) => {
    const { id } = request.params;
    const periods = schema.all("period").models.map((el) => el.attrs);

    return periods.find((el) => el.id === id);
  });
}
