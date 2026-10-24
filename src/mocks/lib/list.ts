import { readJson } from "./api";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
  TPaginationTable,
} from "@shared/types";

const DEFAULT_PAGE_SIZE = 8;

/**
 * Сервисы отправляют тело вида `{ filters: { filters, page } }`.
 */
export const readListRequest = async <F extends object>(request: Request) => {
  const body = await readJson<{ filters?: TFilterPaginationRequest<F> }>(
    request,
  );

  return {
    filters: body?.filters?.filters,
    page: body?.filters?.page,
  };
};

const isEmpty = (value: unknown) =>
  value === undefined || value === null || value === "";

const compare = (
  itemValue: unknown,
  filterValue: unknown,
  operator: "from" | "to",
) => {
  if (typeof itemValue === "string" && typeof filterValue === "string") {
    const left = itemValue.slice(0, filterValue.length);
    return operator === "from" ? left >= filterValue : left <= filterValue;
  }
  return operator === "from"
    ? Number(itemValue) >= Number(filterValue)
    : Number(itemValue) <= Number(filterValue);
};

/**
 * Универсальная фильтрация по соглашению имён фильтров:
 * - `<field>From` / `<field>To` — диапазон по полю `<field>`;
 * - строки — регистронезависимый поиск по вхождению;
 * - остальное — строгое равенство.
 * Фильтры по полям, которых нет у элемента, игнорируются.
 */
export const filterItems = <T extends object>(
  items: T[],
  filters?: object,
): T[] => {
  if (!filters) return items;

  const entries = Object.entries(filters).filter(
    ([, value]) => !isEmpty(value),
  );

  return items.filter((item) =>
    entries.every(([key, value]) => {
      const range = key.match(/^(.+)(From|To)$/);
      if (range && range[1] in item) {
        const operator = range[2] === "From" ? "from" : "to";
        return compare(item[range[1] as keyof T], value, operator);
      }

      if (!(key in item)) return true;

      const itemValue = item[key as keyof T];
      if (typeof itemValue === "string" && typeof value === "string") {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }
      return itemValue === value;
    }),
  );
};

export const paginate = <T>(
  items: T[],
  pagination?: TPaginationTable,
): ITableDataPaginationResponse<T> => {
  const size = pagination?.pageSize || DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const number = Math.min(Math.max(pagination?.page || 1, 1), totalPages);
  const start = (number - 1) * size;

  return {
    data: items.slice(start, start + size),
    page: {
      size,
      number,
      totalPages,
      totalElements: items.length,
    },
  };
};
