import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function documentRoutes(this: Server) {
  this.post("/documents", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let documents = schema.all("document").models.map((el) => el.attrs);

    const { filters = {}, pagination } = requestBody?.filters || [];
    const filterSize = Object.keys(filters).length;

    if (filterSize > 0) {
      documents = filterFunc(documents, filters);
    }

    return paginationFunc(documents, pagination);
  });
}
