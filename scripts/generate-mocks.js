/**
 * Генератор MSW-моков по сервисам из `src/entities/<name>/api/api.ts`.
 *
 *   node scripts/generate-mocks.js            — все сущности
 *   node scripts/generate-mocks.js package    — только указанные
 *   node scripts/generate-mocks.js --check    — ничего не писать, exit 1 при непокрытых эндпоинтах
 *
 * Для сущности без моков создаются `src/mocks/entities/<name>/{factory,handlers}.ts`.
 * Для существующих моков файлы не перезаписываются — выводятся заготовки
 * хендлеров для эндпоинтов, которых в `handlers.ts` ещё нет.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { dirname, join, relative } from "path";
import ts from "typescript";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENTITIES_DIR = join(ROOT, "src/entities");
const MOCKS_DIR = join(ROOT, "src/mocks/entities");
const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const only = args.filter((arg) => !arg.startsWith("--"));

const toCamel = (name) => name.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const toPascal = (name) => toCamel(name).replace(/^\w/, (c) => c.toUpperCase());

const paramName = (expression) => {
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  return "param";
};

/** `/documents/${id}/history?type=${type}` → { path: "/documents/:id/history", query: ["type"] } */
const parseUrl = (node) => {
  let raw;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    raw = node.text;
  } else if (ts.isTemplateExpression(node)) {
    raw =
      node.head.text +
      node.templateSpans
        .map((span) => `:${paramName(span.expression)}${span.literal.text}`)
        .join("");
  } else {
    return undefined;
  }

  const [path, search = ""] = raw.split("?");
  const query = search
    .split("&")
    .map((pair) => pair.split("=")[0])
    .filter(Boolean);

  return { path, query };
};

const findMethodName = (node) => {
  for (let current = node.parent; current; current = current.parent) {
    if (
      (ts.isMethodDeclaration(current) || ts.isFunctionDeclaration(current)) &&
      current.name
    ) {
      return current.name.getText();
    }
    if (ts.isVariableDeclaration(current)) return current.name.getText();
  }
  return "anonymous";
};

const parseEndpoints = (apiFile) => {
  const source = ts.createSourceFile(
    apiFile,
    readFileSync(apiFile, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const endpoints = [];

  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.expression.getText() === "axiosInstance" &&
      HTTP_METHODS.includes(node.expression.name.text) &&
      node.arguments.length > 0
    ) {
      const url = parseUrl(node.arguments[0]);
      if (url) {
        endpoints.push({
          method: node.expression.name.text,
          ...url,
          serviceMethod: findMethodName(node),
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);

  /** MSW не матчит query-параметры, поэтому одинаковые method+path объединяем. */
  const grouped = new Map();
  for (const endpoint of endpoints) {
    const key = `${endpoint.method} ${normalizePath(endpoint.path)}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.query = [...new Set([...existing.query, ...endpoint.query])];
      existing.serviceMethods.push(endpoint.serviceMethod);
    } else {
      grouped.set(key, {
        ...endpoint,
        key,
        serviceMethods: [endpoint.serviceMethod],
      });
    }
  }
  return [...grouped.values()];
};

const normalizePath = (path) => path.replace(/:\w+/g, ":param");

const parseMockedKeys = (handlersFile) => {
  if (!existsSync(handlersFile)) return new Set();
  const content = readFileSync(handlersFile, "utf8");
  const pattern = /http\.(\w+)\(\s*apiPath\(\s*["'`]([^"'`]+)["'`]/g;
  return new Set(
    [...content.matchAll(pattern)].map(
      ([, method, path]) => `${method} ${normalizePath(path)}`,
    ),
  );
};

const renderHandler = (endpoint, db) => {
  const { method, path, query, serviceMethods } = endpoint;
  const params = [...path.matchAll(/:(\w+)/g)].map(([, name]) => name);
  const id = params[params.length - 1];
  const isDetail = Boolean(id) && path.endsWith(`:${id}`);
  const doc = `  /** ${serviceMethods.join(", ")}${
    query.length ? ` (query: ${query.join(", ")})` : ""
  } */\n`;

  const hasBody = ["post", "put", "patch"].includes(method);
  const resolverArgs = [id && "params", hasBody && "request"]
    .filter(Boolean)
    .join(", ");
  const open = `${doc}  http.${method}(apiPath("${path}"), async (${
    resolverArgs ? `{ ${resolverArgs} }` : ""
  }) => {\n    await delay();\n`;
  const close = `  }),\n`;

  if (method === "get" && id) {
    return (
      open +
      `    const item = ${db}.find(params.${id});\n\n` +
      `    return item ? HttpResponse.json(item) : notFound();\n` +
      close
    );
  }

  if (method === "post" && !isDetail) {
    return (
      open +
      `    const { filters, page } = await readListRequest(request);\n\n` +
      `    return HttpResponse.json(paginate(filterItems(${db}.all(), filters), page));\n` +
      close
    );
  }

  if ((method === "patch" || method === "put") && id) {
    return (
      open +
      `    const body = await readJson<{ fields?: Parameters<typeof ${db}.update>[1] }>(request);\n` +
      `    const updated = ${db}.update(params.${id}, body?.fields ?? {});\n\n` +
      `    return updated ? noContent() : notFound();\n` +
      close
    );
  }

  if (method === "delete" && id) {
    return (
      open +
      `    return ${db}.remove(params.${id}) ? noContent() : notFound();\n` +
      close
    );
  }

  return open + `    return HttpResponse.json(${db}.create());\n` + close;
};

const renderFactory = (name) => {
  const pascal = toPascal(name);
  const camel = toCamel(name);
  return `import {
  createCollection,
  fakeFutureIsoDate,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

/** Контракт бэкенда ещё не описан в \`@entities/${name}/model/types\`. */
export interface I${pascal}Mock {
  id: UUID;
  name: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

export const create${pascal} = (): I${pascal}Mock => {
  const createdAt = fakeIsoDate();

  return {
    id: fakeUuid(),
    name: faker.lorem.words(2),
    createdAt,
    updatedAt: fakeFutureIsoDate(createdAt),
  };
};

export const ${camel}Db = createCollection("id", create${pascal}, 50);
`;
};

const renderHandlers = (name, endpoints) => {
  const db = `${toCamel(name)}Db`;
  const body = endpoints
    .map((endpoint) => renderHandler(endpoint, db))
    .join("\n");
  const helpers = [
    "apiPath",
    "filterItems",
    "noContent",
    "notFound",
    "paginate",
    "readJson",
    "readListRequest",
  ].filter((helper) => new RegExp(`\\b${helper}[(<]`).test(body));

  return `import { ${db} } from "./factory";
import { ${helpers.join(", ")} } from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
${body}];
`;
};

const entities = readdirSync(ENTITIES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => only.length === 0 || only.includes(name))
  .filter((name) => existsSync(join(ENTITIES_DIR, name, "api/api.ts")));

let uncovered = 0;

for (const name of entities) {
  const endpoints = parseEndpoints(join(ENTITIES_DIR, name, "api/api.ts"));
  if (endpoints.length === 0) continue;

  const mockDir = join(MOCKS_DIR, name);
  const handlersFile = join(mockDir, "handlers.ts");
  const factoryFile = join(mockDir, "factory.ts");

  if (!existsSync(handlersFile)) {
    uncovered += endpoints.length;
    if (checkOnly) {
      console.log(`✗ ${name}: нет моков (${endpoints.length} эндпоинтов)`);
      continue;
    }
    mkdirSync(mockDir, { recursive: true });
    if (!existsSync(factoryFile))
      writeFileSync(factoryFile, renderFactory(name));
    writeFileSync(handlersFile, renderHandlers(name, endpoints));
    console.log(`+ ${name}: создан ${relative(ROOT, mockDir)}`);
    endpoints.forEach(({ method, path }) =>
      console.log(`    ${method.toUpperCase()} ${path}`),
    );
    continue;
  }

  const mocked = parseMockedKeys(handlersFile);
  const missing = endpoints.filter((endpoint) => !mocked.has(endpoint.key));
  if (missing.length === 0) {
    console.log(`✓ ${name}`);
    continue;
  }

  uncovered += missing.length;
  console.log(`✗ ${name}: нет хендлеров в ${relative(ROOT, handlersFile)}`);
  missing.forEach(({ method, path }) =>
    console.log(`    ${method.toUpperCase()} ${path}`),
  );
  if (!checkOnly) {
    console.log("\n  Заготовка (добавьте в массив handlers):\n");
    console.log(
      missing
        .map((endpoint) => renderHandler(endpoint, `${toCamel(name)}Db`))
        .join("\n"),
    );
  }
}

if (checkOnly && uncovered > 0) process.exit(1);
