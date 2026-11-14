import { IServiceGroupConfig } from "../model/types";
import { routesPath } from "@app/routes";

export const mainServiceGroups: IServiceGroupConfig[] = [
  {
    id: "search",
    title: "Поиск",
    services: [
      { id: "requests", label: "Запросы", to: routesPath.request.root },
      { id: "schedules", label: "Графики", to: routesPath.schedule.root },
      { id: "packages", label: "Пакеты", to: routesPath.package.root },
    ],
  },
  {
    id: "correctional-operations",
    title: "Исправительные операции",
    services: [{ id: "ssk-change", label: "Смена ССК" }],
  },
  {
    id: "reports",
    title: "Отчёты",
    services: [
      { id: "common-reports", label: "Общие" },
      { id: "ready-scenarios", label: "Готовые сценарии" },
    ],
  },
];

export const getVisibleServiceGroups = (
  searchText: string,
  actions: Partial<Record<string, () => void>> = {},
): IServiceGroupConfig[] => {
  const normalizeText = searchText.trim().toLowerCase();

  return mainServiceGroups
    .map(({ services, ...group }) => ({
      ...group,
      services: services
        .filter(({ label }) => label.toLowerCase().includes(normalizeText))
        .map((service) =>
          actions[service.id]
            ? { ...service, action: actions[service.id] }
            : service,
        ),
    }))
    .filter(({ services }) => services.length > 0);
};
