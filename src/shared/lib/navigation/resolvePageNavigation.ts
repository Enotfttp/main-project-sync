import { generatePath, matchPath } from "react-router-dom";

export type TPageRoutes = {
  root: string;
  label: string;
};

export type TPageNavigation = {
  to: string;
  backLabel: string;
  title: string;
};

type TRouteNode = {
  pattern: string;
  label: string;
  parent: TRouteNode | null;
};

type TRouteSource = {
  root: string;
  label: string;
};

const paramPattern = () => /:([A-Za-z0-9_]+)/g;

const readRoute = (value: unknown): TRouteSource | null => {
  if (typeof value !== "object" || value === null) return null;
  if (!("root" in value) || !("label" in value)) return null;

  const { root, label } = value as {
    root: unknown;
    label: unknown;
  };

  if (typeof root !== "string" || typeof label !== "string") return null;

  return {
    root,
    label,
  };
};

const normalizePattern = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

const collectRoutes = (
  source: object,
  parent: TRouteNode,
  acc: TRouteNode[],
) => {
  for (const value of Object.values(source)) {
    const route = readRoute(value);
    if (!route) continue;

    const node: TRouteNode = {
      pattern: normalizePattern(route.root),
      label: route.label,
      parent,
    };

    acc.push(node);
    collectRoutes(value as object, node, acc);
  }
};

const splitPattern = (pattern: string) => {
  const queryIndex = pattern.indexOf("?");
  if (queryIndex === -1) return { pathname: pattern, search: "" };

  return {
    pathname: pattern.slice(0, queryIndex),
    search: pattern.slice(queryIndex + 1),
  };
};

const matchRoute = (pattern: string, pathname: string) => {
  const { pathname: patternPath, search } = splitPattern(pattern);
  // Query-адрес — модалка поверх страницы, а не отдельная страница в шапке.
  if (search) return null;

  return matchPath({ path: patternPath, end: true }, pathname);
};

/** Подставляет параметры URL в шаблон: "История по запросу №:requestId". */
const formatRouteLabel = (
  template: string,
  params: Record<string, string | undefined>,
) =>
  template
    .replace(paramPattern(), (_, name: string) => params[name] ?? "")
    .trim();

const compilePath = (
  pattern: string,
  params: Record<string, string | undefined>,
) => {
  const { pathname, search } = splitPattern(pattern);
  const used: Record<string, string> = {};

  for (const [, name] of pathname.matchAll(paramPattern())) {
    const value = params[name];
    if (!value) return null;
    used[name] = value;
  }

  const path = generatePath(pathname, used);
  if (!search) return path;

  const query = new URLSearchParams();
  for (const [key, raw] of new URLSearchParams(search)) {
    const token = raw.startsWith(":") ? raw.slice(1) : "";
    const value = token ? params[token] : raw;
    if (!value) return null;
    query.set(key, value);
  }

  return `${path}?${query.toString()}`;
};

export const resolvePageNavigation = (
  pathname: string,
  routes: TPageRoutes,
): TPageNavigation | null => {
  const home = readRoute(routes);
  if (!home) return null;

  const homeRoute: TRouteNode = {
    pattern: normalizePattern(home.root),
    label: home.label,
    parent: null,
  };
  const flatRoutes = [homeRoute];
  collectRoutes(routes, homeRoute, flatRoutes);

  const matched = flatRoutes
    .map((route) => ({ route, match: matchRoute(route.pattern, pathname) }))
    .find((item) => item.match);

  if (!matched?.match || !matched.route.parent) return null;

  const params = matched.match.params ?? {};
  const to = compilePath(matched.route.parent.pattern, params);
  if (!to) return null;

  return {
    to,
    backLabel: formatRouteLabel(matched.route.parent.label, params),
    title: formatRouteLabel(matched.route.label, params),
  };
};
