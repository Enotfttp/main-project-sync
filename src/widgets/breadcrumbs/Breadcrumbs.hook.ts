import { BreadcrumbsProps } from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers";
import { Link, useLocation } from "react-router-dom";

type BreadcrumbItem = BreadcrumbsProps["items"][number];
type RouteNode = {
  root: string;
  label?: string | ((params: Record<string, string>) => string);
  [key: string]: any;
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();

  if (location.pathname === "/") return [];

  // Функция для извлечения параметров из пути по паттерну
  const extractParams = (
    pattern: string,
    path: string,
  ): Record<string, string> | null => {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length && !patternParts.includes("*"))
      return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart.startsWith(":")) {
        const paramName = patternPart.slice(1);
        params[paramName] = pathPart;
      } else if (patternPart !== pathPart) {
        return null;
      }
    }

    return params;
  };

  // Функция поиска маршрута в структуре
  const findRoute = (
    node,
    currentPath: string,
  ): { node: RouteNode; params: Record<string, string> } | null => {
    for (const key in node) {
      if (typeof node[key] === "object" && node[key] !== null) {
        const child = node[key];
        if (child.root) {
          const params = extractParams(child.root, currentPath);
          if (params !== null) {
            return { node: child, params };
          }

          // Рекурсивный поиск во вложенных
          const found = findRoute(child, currentPath);
          if (found) return found;
        } else {
          // Продолжаем поиск в глубину
          const found = findRoute(child, currentPath);
          if (found) return found;
        }
      }
    }
    return null;
  };

  // Строим хлебные крошки от общего к частному
  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const result: BreadcrumbItem[] = [];
    const pathParts = location.pathname.split("/").filter(Boolean);

    // Собираем все префиксы пути
    for (let i = 1; i <= pathParts.length; i++) {
      const currentPath = "/" + pathParts.slice(0, i).join("/");
      const found = findRoute(routesPath, currentPath);

      if (found) {
        const { node, params } = found;
        const label =
          typeof node.label === "function" ? node.label(params) : node.label;

        if (label) {
          result.push({
            text: label,
            linkAs: i < pathParts.length ? Link : undefined,
            linkProps: i < pathParts.length ? { to: currentPath } : undefined,
          });
        }
      }
    }

    return result;
  };

  return buildBreadcrumbs();
};
