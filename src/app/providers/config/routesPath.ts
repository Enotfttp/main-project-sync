export const routesPath = {
  root: "/",
  enter: {
    root: "/enter",
    label: "Вход",
  },
  package: {
    root: "/packages",
    label: "Пакеты",
    detail: {
      root: "packages/:id/*",
      label: "Подробная информация о пакете услуг",
      schedule: {
        root: "schedule",
        label: "Графики",
        fullPath: (id: string | number) => `/packages/${id}/schedule`,
        periods: {
          root: "packages/:id/schedule/:idSchedule/periods",
          label: "Периоды",
          fullPath: (id: string | number, idSchedule: string | number) =>
            `/packages/${id}/schedule/${idSchedule}/periods`,
          documents: {
            root: "packages/:id/schedule/:idSchedule/periods/:idPeriod/documents",
            label: "Документы",
            shortPath: (idPeriod: string | number) =>
              `periods/${idPeriod}/documents`,
            fullPath: (
              id: string | number,
              idSchedule: string | number,
              idPeriod: string | number,
            ) => `${id}/schedule/${idSchedule}/period/${idPeriod}/documents`,
          },
        },
      },
      options: {
        root: "options",
        label: "Опции пакета",
        fullPath: (id: string | number) => `/packages/${id}/options`,
      },
      history: {
        root: "history",
        label: "История изменений",
        fullPath: (id: string | number) => `/packages/${id}/history`,
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
