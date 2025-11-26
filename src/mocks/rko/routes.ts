import { filterFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function rkoRoutes(this: Server) {
  this.post("/rko-list", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let rko = schema.all("rko").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      rko = filterFunc(rko, filters);
    }

    return rko;
  });
}
