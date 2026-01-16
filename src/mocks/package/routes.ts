import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function packageRoutes(this: Server) {
  this.post("/packages", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let packages = schema.all("package").models.map((el) => el.attrs);

    const { filters = {}, pagination } = requestBody?.filters || [];
    const filterSize = Object.keys(filters).length;

    if (filterSize > 0) {
      packages = filterFunc(packages, filters);
    }

    return paginationFunc(packages, pagination);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.get("/packages/:id", (schema: any, request) => {
    const { id } = request.params;
    const packages = schema.all("package").models.map((el) => el.attrs);

    return packages.find((el) => el.id === id);
  });
}
