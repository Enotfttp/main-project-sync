export const routesPath = {
  root: "/",
  request: {
    root: "/requests",
    label: "Пакеты",
    detail: {
      label: "Подробная информация о запросе",
      history: {
        root: "/requests/:id/history",
        label: "История запроса",
      },
    },
  },
  schedule: {
    root: "/schedules",
    label: "Графки",
    detail: {
      label: "Подробная информация о графике",
    },
  },
  option: {
    root: "/options",
    label: "Опции",
    detail: {
      label: "Подробная информация об опции",
    },
  },
  period: {
    root: "/periods",
    label: "Периоды",
    detail: {
      label: "Подробная информация о периоде",
    },
  },
  package: {
    root: "/packages",
    label: "Пакеты",
    detail: {
      label: "Подробная информация о пакете услуг",
    },
  },
  document: {
    root: "/documents",
    label: "Документы",
    detail: {
      label: "Подробная информация о документе",
    },
  },
};
