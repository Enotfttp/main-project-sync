import { Server } from "miragejs";

export function rkoRoutes(this: Server) {
  this.post("/rko-list", (schema, request) => {
    const requestBody = JSON.parse(request.requestBody);
    const filters = requestBody?.filters || {};
    let rko = schema.all("rko").models.map((el) => el.attrs);

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        rko = rko.filter((item) => {
          const itemValue = item[key];
          return Array.isArray(value)
            ? value.includes(itemValue)
            : value === itemValue;
        });
      }
    });

    return rko;
  });
}
