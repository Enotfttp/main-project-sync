import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function documentRoutes(this: Server) {
  this.post("/documents", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let documents = schema.all("document").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.filters?.length > 0) {
      documents = filterFunc(documents, filters.filters);
    }

    return paginationFunc(documents, filters.pagination);
  });
}
