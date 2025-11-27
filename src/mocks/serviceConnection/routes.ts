import { filterFunc } from "@mocks/utils";
import { Server } from "miragejs";

export function serviceConnectionRoutes(this: Server) {
  this.post("/service-connects", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    let serviceConnections = schema
      .all("serviceConnection")
      .models.map((el) => el.attrs);
    const filters = requestBody?.filters || [];

    if (filters.length > 0) {
      serviceConnections = filterFunc(serviceConnections, filters);
    }

    return serviceConnections;
  });
}
