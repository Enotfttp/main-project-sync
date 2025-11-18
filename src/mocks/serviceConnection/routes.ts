import { Server } from "miragejs";

export function serviceConnectionRoutes(this: Server) {
  this.post("/service-connects/:idRKO", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    const filters = requestBody?.filters || {};
    let serviceConnections = schema
      .all("serviceConnection")
      .models.map((el) => el.attrs);

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        serviceConnections = serviceConnections.filter((item) => {
          const itemValue = item[key];
          return Array.isArray(value)
            ? value.includes(itemValue)
            : value === itemValue;
        });
      }
    });

    return serviceConnections;
  });
}
