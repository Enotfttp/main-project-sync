import { routesPath } from "@app/routes";
import { generatePath, matchPath, type Params } from "react-router-dom";

export type TPageNavigation = {
  to: string;
  backLabel: string;
  title: string;
};

type TRouteNode = {
  pattern: string;
  label: string;
  parent: TRouteNode | null;
  children: Record<string, TRouteNode>;
};

type TMatchedRoute = {
  route: TRouteNode;
  params: Params;
};

const paramPattern = () => /:([A-Za-z0-9_]+)/g;

const readRoute = (value: unknown) => {
  if (typeof value !== "object" || value === null) return null;
  if (!("root" in value) || !("label" in value)) return null;

  const { root, label } = value as { root: unknown; label: unknown };
  if (typeof root !== "string" || typeof label !== "string") return null;

  return { root, label };
};

const attachRoutes = (source: object, parent: TRouteNode) => {
  for (const [key, value] of Object.entries(source)) {
    const route = readRoute(value);
    if (!route) continue;

    const node: TRouteNode = {
      pattern: route.root.startsWith("/") ? route.root : `/${route.root}`,
      label: route.label,
      parent,
      children: {},
    };

    parent.children[key] = node;
    attachRoutes(value as object, node);
  }
};

const createRouteTree = (): TRouteNode | null => {
  const home = readRoute(routesPath);
  if (!home) return null;

  const root: TRouteNode = {
    pattern: home.root.startsWith("/") ? home.root : `/${home.root}`,
    label: home.label,
    parent: null,
    children: {},
  };

  attachRoutes(routesPath, root);
  return root;
};

let routeTree: TRouteNode | null | undefined;

const getRouteTree = () => {
  if (routeTree === undefined) routeTree = createRouteTree();
  return routeTree;
};

const splitPattern = (pattern: string) => {
  const queryIndex = pattern.indexOf("?");
  if (queryIndex === -1) return { pathname: pattern, search: "" };

  return {
    pathname: pattern.slice(0, queryIndex),
    search: pattern.slice(queryIndex + 1),
  };
};

const matchCurrentRoute = (pathname: string): TMatchedRoute | null => {
  const visit = (node: TRouteNode): TMatchedRoute | null => {
    const { pathname: patternPath, search } = splitPattern(node.pattern);
    // Query-адрес — модалка поверх страницы, а не отдельная страница.
    if (!search) {
      const match = matchPath({ path: patternPath, end: true }, pathname);
      if (match) return { route: node, params: match.params };
    }

    for (const child of Object.values(node.children)) {
      const found = visit(child);
      if (found) return found;
    }

    return null;
  };

  const tree = getRouteTree();
  return tree ? visit(tree) : null;
};

/** Подставляет параметры URL в шаблон: "История по запросу №:id". */
const formatRouteLabel = (template: string, params: Params) =>
  template
    .replace(paramPattern(), (_, name: string) => params[name] ?? "")
    .trim();

const compilePath = (pattern: string, params: Params) => {
  const { pathname, search } = splitPattern(pattern);
  const names = [...pathname.matchAll(paramPattern())].map(([, name]) => name);
  // Одинаковые имена в одном пути нельзя различить, например `:id` дважды.
  if (new Set(names).size !== names.length) return null;

  const used: Record<string, string> = {};
  for (const name of names) {
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

const findChildRoute = (route: TRouteNode, childKey: string) => {
  const direct = route.children[childKey];
  if (direct) return direct;

  // Карточка — модалка, текущий адрес остаётся списком. Следующая страница лежит в detail.
  return route.children.detail?.children[childKey] ?? null;
};
export const resolvePageNavigation = (
  pathname: string,
): TPageNavigation | null => {
  const matched = matchCurrentRoute(pathname);
  if (!matched?.route.parent) return null;

  const parentParams = { ...matched.params };
  // В пути объединения лежит текущий документ, а карточка-родитель ждёт :idDocument.
  if (!parentParams.idDocument && parentParams.idDocumentUnion) {
    parentParams.idDocument = parentParams.idDocumentUnion;
  }

  const to = compilePath(matched.route.parent.pattern, parentParams);
  if (!to) return null;

  return {
    to,
    backLabel: formatRouteLabel(matched.route.parent.label, matched.params),
    title: formatRouteLabel(matched.route.label, matched.params),
  };
};

/**
 * Путь дочернего экрана текущей ветки.
 * Ключ — имя узла в дереве маршрутов (`option`, `document`), не конкретный URL.
 * params — значения, которых ещё нет в pathname, например id из query модалки.
 */
export const resolveChildPath = (
  pathname: string,
  childKey: string,
  params?: Record<string, string>,
): string | null => {
  const matched = matchCurrentRoute(pathname);
  if (!matched) return null;

  const child = findChildRoute(matched.route, childKey);
  if (!child) return null;

  return compilePath(child.pattern, { ...matched.params, ...params });
};

/** Тот же маршрут с другими параметрами, без перехода на дочерний экран. */
export const compileMatchedPath = (pathname: string, params?: Params) => {
  const matched = matchCurrentRoute(pathname);
  if (!matched) return null;

  return compilePath(matched.route.pattern, { ...matched.params, ...params });
};
