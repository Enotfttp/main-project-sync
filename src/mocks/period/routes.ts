import { filterFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function periodRoutes(this: Server) {
  this.post("/periods-list", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let periods = schema.all("period").models.map((el) => el.attrs);

    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      periods = filterFunc(periods, filters);
    }

    return periods;
  });
}
