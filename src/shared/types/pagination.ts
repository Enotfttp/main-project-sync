export type TPaginationTable = {
  page: number;
  pageSize: number;
};

export type TPaginationFilter<T extends object> = {
  filters: T;
};
