import { filterFunc, paginationFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function historyRoutes(this: Server) {
  this.post("/histories", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let histories = schema.all("history").models.map((el) => el.attrs);

    const { filters = {}, pagination } = requestBody?.filters || [];
    const filterSize = Object.keys(filters).length;

    if (filterSize > 0) {
      histories = filterFunc(histories, filters);
    }

    return paginationFunc(histories, pagination);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.get("/histories/:id", (schema: any, request) => {
    const { id } = request.params;
    const requestTypes = schema.all("requestType").models.map((el) => el.attrs);
    const currentRequesttType = requestTypes.find((el) => el.id === id);
    const histories = schema.all("history").models.map((el) => el.attrs);

    return histories.find((el) => el.status === currentRequesttType.status);
  });
}
