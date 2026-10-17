export const routesPath = {
  root: "/",
  request: {
    root: "/requests",
    label: "Пакеты",
    detail: {
      root: "requests/:id",
      label: "Подробная информация о запросе",
      history: {
        root: "requests/:id/history",
        label: "История запроса",
      },
    },
  },
  schedule: {
    root: "/schedules",
    label: "Графки",
    detail: {
      root: "schedules/:id",
      label: "Подробная информация о графике",
    },
  },
  option: {
    root: "/options",
    label: "Опции",
    detail: {
      root: "options/:id",
      label: "Подробная информация об опции",
    },
  },
  period: {
    root: "/periods",
    label: "Периоды",
    detail: {
      root: "periods/:id",
      label: "Подробная информация о периоде",
    },
  },
  package: {
    root: "/packages",
    label: "Пакеты",
    detail: {
      root: "packages/:id",
      label: "Подробная информация о пакете услуг",
    },
  },
  document: {
    root: "/documents",
    label: "Документы",
    detail: {
      root: "documents/:id",
      label: "Подробная информация о документе",
    },
  },
};
