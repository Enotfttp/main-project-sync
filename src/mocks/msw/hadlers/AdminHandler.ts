import {
  ChartData,
  Service,
  TableData,
} from "@entities/admin/types/admin.types";
import { createApiUrl } from "@mocks/msw/config";
import { TFiltersBodyMSW } from "@mocks/msw/types/filters.types";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { http, HttpResponse } from "msw";

const mockServices: Service[] = [
  {
    id: "1",
    name: "Сервис А",
    description: "Основной сервис аналитики",
  },
  {
    id: "2",
    name: "Сервис Б",
    description: "Вспомогательный сервис данных",
  },
  {
    id: "3",
    name: "Сервис В",
    description: "Сервис мониторинга",
  },
];

const mockChartData: Record<string, ChartData[]> = {
  "1": [
    {
      id: "1",
      label: "Успешные",
      value: 65,
      color: "#4CAF50",
    },
    {
      id: "2",
      label: "Ошибки",
      value: 15,
      color: "#F44336",
    },
    {
      id: "3",
      label: "В процессе",
      value: 20,
      color: "#FFC107",
    },
  ],
  "2": [
    {
      id: "1",
      label: "Успешные",
      value: 25,
      color: "#4CAF50",
    },
    {
      id: "2",
      label: "Ошибки",
      value: 25,
      color: "#F44336",
    },
    {
      id: "3",
      label: "В процессе",
      value: 25,
      color: "#FFC107",
    },
  ],
  "3": [
    {
      id: "1",
      label: "Успешные",
      value: 125,
      color: "#4CAF50",
    },
    {
      id: "2",
      label: "Ошибки",
      value: 95,
      color: "#F44336",
    },
    {
      id: "3",
      label: "В процессе",
      value: 40,
      color: "#FFC107",
    },
  ],
};

const mockTableData: Record<string, Record<string, TableData[]>> = {
  "1": {
    "1": [
      {
        id: "1",
        name: "Задача 1",
        value: 20,
        date: "2024-01-15",
        status: "completed",
      },
      {
        id: "2",
        name: "Задача 2",
        value: 20,
        date: "2024-01-16",
        status: "completed",
      },
      {
        id: "3",
        name: "Задача 3",
        value: 25,
        date: "2024-01-17",
        status: "completed",
      },
    ],
    "2": [
      {
        id: "4",
        name: "Ошибка 1",
        value: 10,
        date: "2024-01-15",
        status: "danger",
      },
      {
        id: "5",
        name: "Ошибка 2",
        value: 5,
        date: "2024-01-16",
        status: "danger",
      },
    ],
    "3": [
      {
        id: "6",
        name: "Процесс 1",
        value: 7,
        date: "2024-01-15",
        status: "pending",
      },
      {
        id: "7",
        name: "Процесс 2",
        value: 7,
        date: "2024-01-16",
        status: "pending",
      },
      {
        id: "8",
        name: "Процесс 3",
        value: 6,
        date: "2024-01-17",
        status: "pending",
      },
    ],
  },
  "2": {
    "1": [
      {
        id: "1",
        name: "Задача 1",
        value: 10,
        date: "2024-01-15",
        status: "completed",
      },
      {
        id: "2",
        name: "Задача 2",
        value: 10,
        date: "2024-01-16",
        status: "completed",
      },
      {
        id: "3",
        name: "Задача 3",
        value: 5,
        date: "2024-01-17",
        status: "completed",
      },
    ],
    "2": [
      {
        id: "4",
        name: "Ошибка 1",
        value: 10,
        date: "2024-01-15",
        status: "danger",
      },
      {
        id: "5",
        name: "Ошибка 2",
        value: 15,
        date: "2024-01-16",
        status: "danger",
      },
    ],
    "3": [
      {
        id: "6",
        name: "Процесс 1",
        value: 10,
        date: "2024-01-15",
        status: "pending",
      },
      {
        id: "7",
        name: "Процесс 2",
        value: 10,
        date: "2024-01-16",
        status: "pending",
      },
      {
        id: "8",
        name: "Процесс 3",
        value: 5,
        date: "2024-01-17",
        status: "pending",
      },
    ],
  },
  "3": {
    "1": [
      {
        id: "1",
        name: "Задача 1",
        value: 50,
        date: "2024-01-15",
        status: "completed",
      },
      {
        id: "2",
        name: "Задача 2",
        value: 50,
        date: "2024-01-16",
        status: "completed",
      },
      {
        id: "3",
        name: "Задача 3",
        value: 25,
        date: "2024-01-17",
        status: "completed",
      },
    ],
    "2": [
      {
        id: "4",
        name: "Ошибка 1",
        value: 50,
        date: "2024-01-15",
        status: "danger",
      },
      {
        id: "5",
        name: "Ошибка 2",
        value: 45,
        date: "2024-01-16",
        status: "danger",
      },
    ],
    "3": [
      {
        id: "6",
        name: "Процесс 1",
        value: 10,
        date: "2024-01-15",
        status: "pending",
      },
      {
        id: "7",
        name: "Процесс 2",
        value: 10,
        date: "2024-01-16",
        status: "pending",
      },
      {
        id: "8",
        name: "Процесс 3",
        value: 20,
        date: "2024-01-17",
        status: "pending",
      },
    ],
  },
};

export const adminHandlers = [
  http.get(createApiUrl("/api/services"), async () => {
    return HttpResponse.json<Service[]>(mockServices);
  }),

  http.get(createApiUrl("/api/dashboards/:serviceId"), async (req) => {
    const serviceId = req.params.serviceId as string;
    const chartData = mockChartData[serviceId] || [];

    return HttpResponse.json<ChartData[]>(chartData);
  }),

  http.post(
    createApiUrl("/api/dashboards-info/:serviceId/sections/:sectionId"),
    async (req) => {
      const serviceId = req.params.serviceId as string;
      const sectionId = req.params.sectionId as string;
      const body = (await req.request.json()) as TFiltersBodyMSW<FilterValue[]>;
      const filters = body?.filters || [];

      if (!sectionId) return HttpResponse.json([]);
      let tableData = mockTableData[serviceId]?.[sectionId] || [];

      if (filters.length > 0) {
        tableData = tableData.filter((item) => {
          return filters.every((filter) => {
            const itemValue = item[filter?.fieldId as keyof TableData];

            if (
              typeof filter?.value === "string" &&
              filter?.fieldId === "date"
            ) {
              const tableDate = itemValue;
              const filterDate = filter?.value.split(".").reverse().join("-");
              if (tableDate === filterDate) {
                return true;
              }
              return false;
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

      return HttpResponse.json(tableData);
    },
  ),
];
