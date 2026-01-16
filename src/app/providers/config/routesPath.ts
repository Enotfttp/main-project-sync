export const routesPath = {
  root: "/",
  enter: {
    root: "/enter",
    label: "Вход",
  },
  packages: {
    root: "/packages",
    label: "Пакеты",
    detail: {
      root: "packages/:id",
      label: "Подробная информация о пакете услуг",
      shortPath: (id: string | number) => `${id}`,
      periods: {
        root: "packages/:id/schedule/:idSchedule",
        label: "Периоды",
        shortPath: (idSchedule: string | number) => `schedule/${idSchedule}`,
        documents: {
          root: "packages/:id/schedule/:idSchedule/periods/:idPeriod",
          label: "Документы",
          shortPath: (idPeriod: string | number) => `periods/${idPeriod}`,
        },
      },
    },
  },
  documents: {
    root: "/documents",
    label: "Документы",
  },
  adminka: {
    root: "adminka/:serviceId",
    fullPath: (serviceId: string | number) => `/adminka/${serviceId}`,
  },
  testUIPage: {
    root: "testUIPage",
  },
};
