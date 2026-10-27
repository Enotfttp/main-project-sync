export type TPaginationTable = {
  page: number;
  pageSize: number;
};

export type TPaginationData = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type TSortDirection = "asc" | "desc";

export type TSort<T extends object> = {
  field: keyof T & string;
  direction: TSortDirection;
};

/**
 * @template F Фильтры списка
 * @template S Строка таблицы, по полям которой доступна сортировка
 */
export type TFilterPaginationRequest<F extends object, S extends object = F> = {
  filters?: F;
  page?: TPaginationTable;
  sort?: TSort<S>[];
};

export interface ITableDataPaginationResponse<T> extends TPaginationData {
  content: T[];
}
