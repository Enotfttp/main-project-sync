import {
  ChartData,
  ErrorsChart,
  Service,
  TableData,
} from "@entities/admin/admin.types";
import { fakerRU as faker } from "@faker-js/faker"; // Функция для генерации сервисов

// Функция для генерации сервисов
const generateServices = (count: number = 5): Service[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    name: `${faker.company.name()} ${faker.word.adjective()}`,
    description: faker.company.catchPhrase(),
    active: faker.datatype.boolean(),
  }));
};

const generateChartData = (
  serviceIds: string[],
): Record<string, ChartData[]> => {
  const chartLabels = ["Успешные", "Ошибки", "В процессе"];
  const chartColors = ["#4CAF50", "#F44336", "#FFC107"];

  return serviceIds.reduce(
    (acc, serviceId) => {
      acc[serviceId] = chartLabels.map((label, index) => ({
        id: String(index + 1),
        label,
        value: faker.number.int({ min: 10, max: 150 }),
        color: chartColors[index],
      }));
      return acc;
    },
    {} as Record<string, ChartData[]>,
  );
};

// Функция для генерации ошибок
const generateErrors = (
  serviceIds: string[],
): Record<string, ErrorsChart[]> => {
  const errorCodes = ["401", "403", "404", "405", "500", "502", "503"];

  return serviceIds.reduce(
    (acc, serviceId) => {
      const errorCount = faker.number.int({ min: 2, max: 6 });
      acc[serviceId] = Array.from({ length: errorCount }, (_, index) => ({
        id: String(index + 1),
        code: faker.helpers.arrayElement(errorCodes),
        count: faker.number.int({ min: 1, max: 100 }),
      }));
      return acc;
    },
    {} as Record<string, ErrorsChart[]>,
  );
};

// Генерация табличных данных с правильными статусами
const generateTableData = (
  serviceIds: string[],
): Record<string, Record<string, TableData[]>> => {
  // Определяем статусы по секциям
  const sectionStatuses: Record<string, TableData["status"][]> = {
    "1": ["completed"], // Секция 1: только completed
    "2": ["danger"], // Секция 2: только danger
    "3": ["pending"], // Секция 3: только pending
  };

  return serviceIds.reduce(
    (acc, serviceId) => {
      acc[serviceId] = Object.entries(sectionStatuses).reduce(
        (sectionAcc, [sectionId, statuses]) => {
          const itemCount = faker.number.int({ min: 10, max: 30 });
          sectionAcc[sectionId] = Array.from(
            { length: itemCount },
            (_, index) => ({
              id: `${serviceId}-${sectionId}-${index + 1}`,
              name: `${faker.commerce.productName()}`,
              value: faker.number.int({ min: 1, max: 30 }),
              date: faker.date
                .between({ from: "2024-01-01", to: "2024-12-31" })
                .toISOString()
                .split("T")[0],
              status: statuses[0], // Все записи в секции имеют одинаковый статус
            }),
          );
          return sectionAcc;
        },
        {} as Record<string, TableData[]>,
      );
      return acc;
    },
    {} as Record<string, Record<string, TableData[]>>,
  );
};

// Генерация моковых данных
export const generateMockData = () => {
  const services = generateServices(5);
  const serviceIds = services.map((service) => service.id);

  return {
    services,
    chartData: generateChartData(serviceIds),
    errors: generateErrors(serviceIds),
    tableData: generateTableData(serviceIds),
  };
};
