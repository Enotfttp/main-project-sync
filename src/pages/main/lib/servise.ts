import { IServiceGroupConfig } from "../model/types.ts";
import { routesPath } from "@app/providers";

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
    title: "Исправительные сценарии",
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
): IServiceGroupConfig[] => {
  const normalizeText = searchText.trim().toLowerCase();
  if (!normalizeText) return mainServiceGroups;

  return mainServiceGroups
    .map(({ services, ...group }) => ({
      ...group,
      services: services.filter(({ label }) =>
        label.toLowerCase().includes(normalizeText),
      ),
    }))
    .filter(({ services }) => services.length > 0);
};
