import { FilterValue } from "@shared/ui/Filter/Filter.types";

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
  filters?: FilterValue[];
  pagination?: TPaginationTable;
};

export interface TableDataWithPagination<T> {
  data: T[];
  pagination: TPaginationData;
}
