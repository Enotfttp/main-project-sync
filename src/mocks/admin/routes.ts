import { filterFunc, paginationFunc } from "@mocks/utils";
import { Response, Server } from "miragejs";

export function adminRoutes(this: Server) {
  // GET /api/services
  this.get("/services", (schema) => {
    return schema.all("service").models;
  });

  // GET /api/services
  this.post("/services-active", (schema, request) => {
    // Применяем фильтры из тела запроса
    const requestBody = JSON.parse(request.requestBody);
    const filters = requestBody?.filters || [];

    const service = schema
      .where("service", { id: filters.id })
      .models.map((el) => el.attrs);

    return { service, active: !service?.active };
  });

  // GET /api/dashboards/:serviceId
  this.get("/dashboards/:serviceId", (schema, request) => {
    const { serviceId } = request.params;
    const chartData = schema.where("chartDatum", { serviceId }).models;

    if (chartData.length === 0) {
      return new Response(404, {}, { errors: ["Chart data not found"] });
    }

    return chartData[0].attrs.charts;
  });

  // GET /api/dashboards/:serviceId
  this.get("/errors/:serviceId", (schema, request) => {
    const { serviceId } = request.params;
    const errors = schema.all("error").models.map((el) => el.attrs)[0];

    return errors[serviceId];
  });

  // POST /api/dashboards-info/:serviceId/sections/:sectionId
  this.post(
    "/dashboards-info/:serviceId/sections/:sectionId",
    (schema, request) => {
      const { serviceId, sectionId } = request.params;

      if (!sectionId) {
        return new Response(400, {}, { errors: ["Section ID is required"] });
      }

      const tableModelData = schema
        .all("tableDatum")
        .models.map((el) => el.attrs)[0];

      let tableData = tableModelData[serviceId]?.[sectionId] || [];

      // Применяем фильтры из тела запроса
      const requestBody = JSON.parse(request.requestBody);
      const filters = requestBody?.filters || [];

      if (filters.length > 0) {
        tableData = filterFunc(tableData, filters.filters);
      }

      return paginationFunc(tableData, filters.pagination);
    },
  );
}
