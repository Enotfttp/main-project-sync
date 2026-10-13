export type TPaginationData = {
  pageSize: number;
  pageSizes: number[];
  totalItems: number;
  page: number;
};

export type TPaginationTable = {
  page: number;
  pageSize: number;
};

export type FilterWithPagination = {
  filters?: Record<string, string>;
  pagination?: TPaginationTable;
};

export interface TableDataWithPagination<T> {
  data: T[];
  pagination: TPaginationData;
}
