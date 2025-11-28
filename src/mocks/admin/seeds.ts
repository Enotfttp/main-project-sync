import { ChartData, Service, TableData } from "@entities/admin";

const mockServices: Service[] = [
  {
    id: "1",
    name: "Сервис А",
    description: "Основной сервис аналитики",
    active: true,
  },
  {
    id: "2",
    name: "Сервис Б",
    description: "Вспомогательный сервис данных",
    active: false,
  },
  {
    id: "3",
    name: "Сервис В",
    description: "Сервис мониторинга",
    active: false,
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

const mockErrors = {
  "1": [
    {
      id: "1",
      code: "401",
      count: 5,
    },
    {
      id: "2",
      code: "403",
      count: 5,
    },
    {
      id: "3",
      code: "405",
      count: 5,
    },
  ],
  "2": [
    {
      id: "4",
      code: "401",
      count: 10,
    },
    {
      id: "5",
      code: "403",
      count: 10,
    },
    {
      id: "6",
      code: "405",
      count: 5,
    },
  ],
  "3": [
    {
      id: "7",
      code: "401",
      count: 30,
    },
    {
      id: "8",
      code: "403",
      count: 50,
    },
    {
      id: "9",
      code: "405",
      count: 15,
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

export function adminSeeds(server) {
  mockServices.forEach((service) => {
    server.create("service", service);
  });

  Object.entries(mockChartData).forEach(([serviceId, charts]) => {
    server.create("chartDatum", { serviceId, charts });
  });

  server.create("tableDatum", mockTableData);

  server.create("error", mockErrors);
}
