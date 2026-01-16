import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function optionRoutes(this: Server) {
  this.post("/options", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let options = schema.all("option").models.map((el) => el.attrs);

    const { filters = {}, pagination } = requestBody?.filters || [];
    const filterSize = Object.keys(filters).length;

    if (filterSize > 0) {
      options = filterFunc(options, filters);
    }

    return paginationFunc(options, pagination);
  });
}
