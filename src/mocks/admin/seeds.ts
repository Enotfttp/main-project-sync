import { generateMockData } from "./utils";
import { ErrorModel, ServiceModel, TableDatumModel } from "@mocks/admin/model";
import { Server } from "miragejs";

export function adminSeeds(server: Server) {
  const mockData = generateMockData();

  // Создаем сервисы
  mockData.services.forEach((service) => {
    server.create("service", service as ServiceModel);
  });

  // Создаем данные для графиков
  Object.entries(mockData.chartData).forEach(([serviceId, charts]) => {
    server.create("chartDatum", {
      serviceId: serviceId,
      charts,
    });
  });

  // Создаем табличные данные
  server.create("tableDatum", mockData.tableData as TableDatumModel);

  // Создаем ошибки
  server.create("error", mockData.errors as ErrorModel);
}
