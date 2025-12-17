import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function documentRoutes(this: Server) {
  this.post("/documents", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let periods = schema.all("document").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      periods = filterFunc(periods, filters.filters);
    }

    return paginationFunc(periods, filters.pagination);
  });
}
