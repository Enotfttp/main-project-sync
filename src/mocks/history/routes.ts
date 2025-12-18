import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function historyRoutes(this: Server) {
  this.post("/histories", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let histories = schema.all("history").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      histories = filterFunc(histories, filters.filters);
    }

    return paginationFunc(histories, filters.pagination);
  });
}
