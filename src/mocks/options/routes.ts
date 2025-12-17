import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function optionRoutes(this: Server) {
  this.post("/options", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let periods = schema.all("option").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      periods = filterFunc(periods, filters.filters);
    }

    return paginationFunc(periods, filters.pagination);
  });
}
