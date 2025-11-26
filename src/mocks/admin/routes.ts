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
        tableData = tableData.filter((item) => {
          return filters.every((filter) => {
            const itemValue = item[filter?.fieldId];

            if (
              typeof filter?.value === "string" &&
              filter?.fieldId === "date"
            ) {
              const tableDate = itemValue;
              const filterDate = filter?.value.split(".").reverse().join("-");
              return tableDate === filterDate;
            }

            // Пропускаем пустые фильтры
            if (filter?.value === null || filter?.value === undefined) {
              return true;
            }

            // Фильтр по диапазону
            if (
              typeof filter.value === "object" &&
              "min" in filter.value &&
              "max" in filter.value
            ) {
              if (typeof itemValue === "number") {
                return (
                  itemValue >= filter.value.min && itemValue <= filter.value.max
                );
              }
              return false;
            }

            // Фильтр по массиву значений
            if (Array.isArray(filter.value) && typeof itemValue === "string") {
              return filter.value.includes(itemValue);
            }

            // Простое сравнение для строк и чисел
            return itemValue === filter.value;
          });
        });
      }

      return tableData;
    },
  );
}
