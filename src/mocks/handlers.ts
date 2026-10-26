import type { RequestHandler } from "msw";

/**
 * Хендлеры подхватываются автоматически из `entities/<name>/handlers.ts`,
 * регистрировать новую сущность вручную не нужно.
 */
const modules = import.meta.glob<{ handlers: RequestHandler[] }>(
  "./entities/*/handlers.ts",
  { eager: true },
);

export const handlers = Object.values(modules).flatMap(
  (module) => module.handlers,
);
