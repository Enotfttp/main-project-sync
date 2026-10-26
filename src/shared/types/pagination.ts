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

export type TFilterPaginationRequest<T extends object> = {
  filters?: T;
  page?: TPaginationTable;
};

export interface ITableDataPaginationResponse<T> extends TPaginationData {
  content: T[];
}
