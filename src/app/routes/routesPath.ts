export const routesPath = {
  root: "/",
  label: "Главная страница",
  request: {
    root: "/requests",
    label: "Запросы",
    detail: {
      root: "/requests?id=:id",
      label: "Подробная информация о запросе",
      history: {
        root: "/requests/:id/history",
        label: "История по запросу №:id",
      },
      schedule: {
        root: "/requests/:id/schedules/:idSchedule",
        label: "Информация по графику",
        package: {
          root: "/requests/:id/schedules/:id/package/:idPackage",
          label: "Информация по пакету",
          document: {
            root: "/requests/:id/schedules/:id/package/:idPackage/documents",
            label: "Список документов по пакету №:idPackage",
            detail: {
              root: "/requests/:id/schedules/:id/package/:idPackage/documents/:idDocument",
              label: "Подробная информация по документу",
            },
          },
        },
        option: {
          root: "/requests/:id/schedules/:id/option/:idPackage",
          label: "Информация по опции",
          document: {
            root: "/requests/:id/schedules/:id/package/:idOption/documents",
            label: "Список документов по опции №:idOption",
            detail: {
              root: "/requests/:id/schedules/:id/package/:idOption/documents/:idDocument",
              label: "Подробная информация по документу",
            },
          },
        },
      },
    },
  },
  schedule: {
    root: "/schedules",
    label: "Графики",
    detail: {
      root: "/schedules?id=:id",
      label: "Подробная информация по графику",
      package: {
        root: "/schedules/:id/package/:idPackage",
        label: "Информация по пакету",
        document: {
          root: "/schedules/:id/package/:idPackage/documents",
          label: "Список документов по пакету №:idPackage",
          detail: {
            root: "/schedules/:id/package/:idPackage/documents/:idDocument",
            label: "Подробная информация по документу",
          },
        },
      },
      option: {
        root: "/schedules/:id/option/:idPackage",
        label: "Информация по опции",
        document: {
          root: "/schedules/:id/package/:idOption/documents",
          label: "Список документов по опции №:idOption",
          detail: {
            root: "/schedules/:id/package/:idOption/documents/:idDocument",
            label: "Подробная информация по документу",
          },
        },
      },
      period: {
        root: "/schedules/:id/periods",
        label: "Список периодов по графику №:id",
        detail: {
          root: "/schedules/:id/periods?idPeriod=:idPeriod",
          label: "Подробная информация по периоду",
        },
      },
    },
  },
  package: {
    root: "/packages",
    label: "Пакеты",
    detail: {
      root: "/packages?id=:id",
      label: "Подробная информация по пакету",
      option: {
        root: "/packages/:id/options",
        label: "Список опций по пакету №:id",
        detail: {
          root: "/packages/:id/options?id=:idOption",
          label: "Подробная информация по опции",
          document: {
            root: "/packages/:id/options/:id/documents",
            label: "Список документов по опции №:id",
            detail: {
              root: "/packages/:id/options/:id/documents?id=:idDocument",
              label: "Подробная информация по документу",
            },
          },
        },
      },
      document: {
        root: "/packages/:id/documents",
        label: "Список документов по пакету №:id",
        detail: {
          root: "/packages/:id/documents?id=:idDocument",
          label: "Подробная информация по документу",
        },
      },
    },
  },
};
