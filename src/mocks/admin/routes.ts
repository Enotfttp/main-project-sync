import { filterFunc } from "@mocks/utils";
import { Response, Server } from "miragejs";

export function adminRoutes(this: Server) {
  // GET /api/services
  this.get("/services", (schema) => {
    return schema.all("service").models;
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
        tableData = filterFunc(tableData, filters);
      }

      return tableData;
    },
  );
}
