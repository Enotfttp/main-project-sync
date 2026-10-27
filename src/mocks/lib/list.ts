import { readJson } from "./api";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
  TPaginationTable,
  TSort,
  TSortDirection,
} from "@shared/types";

const DEFAULT_PAGE_SIZE = 8;

/**
 * Сервисы отправляют фильтры в body,
 * а пагинацию и сортировку в query: `?sort=field,asc&page=1&size=25`
 */
export const readListRequest = async <F extends object, S extends object = F>(
  request: Request,
): Promise<TFilterPaginationRequest<F, S>> => {
  const params = new URL(request.url).searchParams;

  const page = params.has("page")
    ? {
        page: Number(params.get("page")),
        pageSize: Number(params.get("size")) || DEFAULT_PAGE_SIZE,
      }
    : undefined;

  const sort = params.getAll("sort").map((value) => {
    const [field, direction = "asc"] = value.split(",");
    return { field, direction: direction as TSortDirection } as TSort<S>;
  });

  return {
    filters: await readJson<F>(request),
    page,
    sort,
  };
};

/**
 * Сортировка по нескольким полям в порядке их передачи
 */
export const sortItems = <T extends object>(
  items: T[],
  sort?: TSort<T>[],
): T[] => {
  if (!sort?.length) return items;

  return [...items].sort((a, b) => {
    for (const { field, direction } of sort) {
      const left = a[field];
      const right = b[field];
      if (left === right) continue;
      if (left === undefined || left === null) return 1;
      if (right === undefined || right === null) return -1;

      const result = left > right ? 1 : -1;
      return direction === "desc" ? -result : result;
    }
    return 0;
  });
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
  console.log("items: ", items, filters);
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
    content: items.slice(start, start + size),
    size,
    number,
    totalPages,
    totalElements: items.length,
  };
};
