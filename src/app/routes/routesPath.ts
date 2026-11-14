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
        period: {
          root: "/requests/:id/schedules/:idSchedule/periods",
          label: "Список периодов по графику №:idSchedule",
          document: {
            root: "/requests/:id/schedules/:idSchedule/periods/:idPeriod/documents",
            label: "Список документов по периоду №:idPeriod",
            detail: {
              root: "/requests/:id/schedules/:idSchedule/periods/:idPeriod/documents?id=:idDocument",
              label: "Подробная информация о документе",
            },
            documentUnion: {
              root: "/requests/:id/schedules/:idSchedule/periods/:idPeriod/documents/:idDocumentUnion/documentUnions",
              label: "Документы объединённого документа №:idDocumentUnion",
              detail: {
                root: "/requests/:id/schedules/:idSchedule/periods/:idPeriod/documents/:idDocumentUnion/documentUnions?id=:idDocument",
                label: "Подробная информация по объединённом документу",
              },
            },
          },
        },
        package: {
          root: "/requests/:id/schedules/:idSchedule/package/:idPackage",
          label: "Информация по пакету",
          document: {
            root: "/requests/:id/schedules/:idSchedule/package/:idPackage/documents",
            label: "Список документов по пакету №:idPackage",
            detail: {
              root: "/requests/:id/schedules/:idSchedule/package/:idPackage/documents?id=:idDocument",
              label: "Подробная информация о документ",
            },
            documentUnion: {
              root: "/requests/:id/schedules/:idSchedule/package/:idPackage/documents/:idDocumentUnion/documentUnions",
              label: "Документы объединённого документа №:idDocumentUnion",
              detail: {
                root: "/requests/:id/schedules/:idSchedule/package/:idPackage/documents/:idDocumentUnion/documentUnions?id=:idDocument",
                label: "Подробная информация по объединённом документу",
              },
            },
          },
        },
        option: {
          root: "/requests/:id/schedules/:idSchedule/option/:idOption",
          label: "Информация по опции",
          document: {
            root: "/requests/:id/schedules/:idSchedule/option/:idOption/documents",
            label: "Список документов по опции №:idOption",
            detail: {
              root: "/requests/:id/schedules/:idSchedule/option/:idOption/documents?id=:idDocument",
              label: "Подробная информация по документу",
            },
            documentUnion: {
              root: "/requests/:id/schedules/:idSchedule/option/:idOption/documents/:idDocumentUnion/documentUnions",
              label: "Документы объединённого документа №:idDocumentUnion",
              detail: {
                root: "/requests/:id/schedules/:idSchedule/option/:idOption/documents/:idDocumentUnion/documentUnions?id=:idDocument",
                label: "Подробная информация по объединённом документу",
              },
            },
          },
        },
      },
      package: {
        root: "/requests/:id/package/:idPackage",
        label: "Информация по пакету",
        option: {
          root: "/requests/:id/package/:idPackage/options",
          label: "Список опций по пакету №:idPackage",
          detail: {
            root: "/requests/:id/package/:idPackage/options?id=:idOption",
            label: "Подробная информация по опции",
            document: {
              root: "/requests/:id/package/:idPackage/options/:idOption/documents",
              label: "Список документов по опции №:idOption",
              detail: {
                root: "/requests/:id/package/:idPackage/options/:idOption/documents?id=:idDocument",
                label: "Подробная информация по документу",
              },
              documentUnion: {
                root: "/requests/:id/package/:idPackage/options/:idOption/documents/:idDocumentUnion/documentUnions",
                label: "Документы объединённого документа №:idDocumentUnion",
                detail: {
                  root: "/requests/:id/package/:idPackage/options/:idOption/documents/:idDocumentUnion/documentUnions?id=:idDocument",
                  label: "Подробная информация по объединённом документу",
                },
              },
            },
          },
        },
        document: {
          root: "/requests/:id/package/:idPackage/documents",
          label: "Список документов по пакету №:idPackage",
          detail: {
            root: "/requests/:id/package/:idPackage/documents?id=:idDocument",
            label: "Подробная информация по документу",
          },
          documentUnion: {
            root: "/requests/:id/package/:idPackage/documents/:idDocumentUnion/documentUnions",
            label: "Документы объединённого документа №:idDocumentUnion",
            detail: {
              root: "/requests/:id/package/:idPackage/documents/:idDocumentUnion/documentUnions?id=:idDocument",
              label: "Подробная информация по объединённом документу",
            },
          },
        },
      },
      option: {
        root: "/requests/:id/option/:idOption",
        label: "Информация по опции",
        document: {
          root: "/requests/:id/option/:idOption/documents",
          label: "Список документов по опции №:idOption",
          detail: {
            root: "/requests/:id/option/:idOption/documents?id=:idDocument",
            label: "Подробная информация по документу",
          },
          documentUnion: {
            root: "/requests/:id/option/:idOption/documents/:idDocumentUnion/documentUnions",
            label: "Документы объединённого документа №:idDocumentUnion",
            detail: {
              root: "/requests/:id/option/:idOption/documents/:idDocumentUnion/documentUnions?id=:idDocument",
              label: "Подробная информация по объединённом документу",
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
        option: {
          root: "/schedules/:id/package/:idPackage/options",
          label: "Список опций по пакету №:idPackage",
          document: {
            root: "/schedules/:id/package/:idPackage/options/:idOption/documents",
            label: "Список документов по опции №:idOption",
            detail: {
              root: "/schedules/:id/package/:idPackage/options/:idOption/documents/:idDocument",
              label: "Подробная информация по документу",
            },
            documentUnion: {
              root: "/schedules/:id/package/:idPackage/options/:idOption/documents/:idDocumentUnion/documentUnions",
              label: "Документы объединённого документа №:idDocumentUnion",
              detail: {
                root: "/schedules/:id/package/:idPackage/options/:idOption/documents/:idDocumentUnion/documentUnions?id=:idDocument",
                label: "Подробная информация по объединённом документу",
              },
            },
          },
        },
        document: {
          root: "/schedules/:id/package/:idPackage/documents",
          label: "Список документов по пакету №:idPackage",
          detail: {
            root: "/schedules/:id/package/:idPackage/documents/:idDocument",
            label: "Подробная информация по документу",
          },
          documentUnion: {
            root: "/schedules/:id/package/:idPackage/documents/:idDocumentUnion/documentUnions",
            label: "Документы объединённого документа №:idDocumentUnion",
            detail: {
              root: "/schedules/:id/package/:idPackage/documents/:idDocumentUnion/documentUnions?id=:idDocument",
              label: "Подробная информация по объединённом документу",
            },
          },
        },
      },
      option: {
        root: "/schedules/:id/option/:idOption",
        label: "Информация по опции",
        document: {
          root: "/schedules/:id/option/:idOption/documents",
          label: "Список документов по опции №:idOption",
          detail: {
            root: "/schedules/:id/option/:idOption/documents?id=:idDocument",
            label: "Подробная информация по документу",
          },
          documentUnion: {
            root: "/schedules/:id/option/:idOption/documents/:idDocumentUnion/documentUnions",
            label: "Документы объединённого документа №:idDocumentUnion",
            detail: {
              root: "/schedules/:id/option/:idOption/documents/:idDocumentUnion/documentUnions?id=:idDocument",
              label: "Подробная информация по объединённом документу",
            },
          },
        },
      },
      period: {
        root: "/schedules/:id/periods",
        label: "Список периодов по графику №:id",
        document: {
          root: "/schedules/:id/periods/:idPeriod/documents",
          label: "Список документов по периоду №:idPeriod",
          detail: {
            root: "/schedules/:id/periods/:idPeriod/documents?id=:idDocument",
            label: "Подробная информация по документу",
          },
          documentUnion: {
            root: "/schedules/:id/periods/:idPeriod/documents/:idDocumentUnion/documentUnions",
            label: "Документы объединённого документа №:idDocumentUnion",
            detail: {
              root: "/schedules/:id/periods/:idPeriod/documents/:idDocumentUnion/documentUnions?id=:idDocument",
              label: "Подробная информация по объединённом документу",
            },
          },
        },
      },
    },
  },
  package: {
    root: "/packages",
    label: "Пакеты",
    detail: {
      root: "/packages?id=:idPackage",
      label: "Подробная информация по пакету",
      option: {
        root: "/packages/:idPackage/options",
        label: "Список опций по пакету №:idPackage",
        detail: {
          root: "/packages/:idPackage/options?id=:idOption",
          label: "Подробная информация по опции",
          document: {
            root: "/packages/:idPackage/options/:idOption/documents",
            label: "Список документов по опции №:idOption",
            detail: {
              root: "/packages/:idPackage/options/:idOption/documents?id=:idDocument",
              label: "Подробная информация по документу",
            },
            documentUnion: {
              root: "/packages/:idPackage/options/:idOption/documents/:idDocumentUnion/documentUnions",
              label: "Документы объединённого документа №:idDocumentUnion",
              detail: {
                root: "/packages/:idPackage/options/:idOption/documents/:idDocumentUnion/documentUnions?id=:idDocument",
                label: "Подробная информация по объединённом документу",
              },
            },
          },
        },
      },
      document: {
        root: "/packages/:idPackage/documents",
        label: "Список документов по пакету №:idPackage",
        detail: {
          root: "/packages/:idPackage/documents?id=:idDocument",
          label: "Подробная информация по документу",
        },
        documentUnion: {
          root: "/packages/:idPackage/documents/:idDocumentUnion/documentUnions",
          label: "Документы объединённого документа №:idDocumentUnion",
          detail: {
            root: "/packages/:idPackage/documents/:idDocumentUnion/documentUnions?id=:idDocument",
            label: "Подробная информация по объединённом документу",
          },
        },
      },
    },
  },
};
