import { Server } from "miragejs";

export function eventRoutes(this: Server) {
  this.post("/events-list/:id", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    const filters = requestBody?.filters || {};
    let events = schema.all("event").models.map((el) => el.attrs);

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        events = events.filter((item) => {
          const itemValue = item[key];
          return Array.isArray(value)
            ? value.includes(itemValue)
            : value === itemValue;
        });
      }
    });

    return events;
  });
}
