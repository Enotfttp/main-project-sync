import { TValue } from "@features/dynamic-filters";

export const keysOf = <T extends object>(record: T) =>
  Object.keys(record) as Array<keyof T & string>;

export const valuesOf = <T extends object>(record: T) =>
  Object.values(record) as Array<T[keyof T]>;

export const text = (value: TValue | undefined) =>
  typeof value === "string" && value ? value : undefined;

export const enumKey = <T extends object>(
  record: T,
  value: TValue | undefined,
) => {
  const normalized = text(value);

  if (!normalized || !Object.hasOwn(record, normalized)) return;

  return normalized as Extract<keyof T, string>;
};
