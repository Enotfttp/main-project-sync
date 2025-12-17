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
      fullPath: (id: string | number) => `/packages/${id}`,
      schedule: {
        root: "schedule",
        label: "Графики",
        shortPath: (id: string | number) => `${id}/schedule`,
        fullPath: (id: string | number) => `/packages/${id}/schedule`,
        periods: {
          root: ":id/schedule/:idSchedule/periods",
          label: "Периоды",
          shortPath: (idSchedule: string | number) =>
            `schedule/${idSchedule}/periods`,
          fullPath: (id: string | number, idSchedule: string | number) =>
            `${id}/schedule/${idSchedule}/period`,
        },
        documents: {
          root: ":id/schedule/:idSchedule/periods/:idPeriod/documents",
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
