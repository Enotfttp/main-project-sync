import { Server } from "miragejs";

export function periodRoutes(this: Server) {
  this.post("/periods-list/:id", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    const filters = requestBody?.filters || {};
    let periods = schema.all("period").models.map((el) => el.attrs);

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        periods = periods.filter((item) => {
          const itemValue = item[key];
          return Array.isArray(value)
            ? value.includes(itemValue)
            : value === itemValue;
        });
      }
    });

    return periods;
  });
}
