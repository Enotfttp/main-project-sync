import { StyledPagination, StyledTableSort } from "./TableSort.styled";
import {
  DEFAULT_PAGE_SIZE,
  TPaginationData,
  TPaginationTable,
  TTableSort,
} from "../../types";
import { PaginationTable } from "./components/PaginationTable";
import {
  Column,
  PaginationOneProps,
  Table,
  TableProps,
} from "@admiral-ds/react-ui";
import { Loader } from "@shared/ui";
import { useIsFetching } from "@tanstack/react-query";
import * as React from "react";

/** Один выбранный столбец. Следующий клик по другому столбцу заменяет его. */
const MAX_SORT_LEVEL = 1;

type SortChange = {
  name: string;
  sort: "asc" | "desc" | "initial";
};

type TableSortProps = {
  queryKey: string;
  sort?: TTableSort[];
  handleSortChange?(sort: TTableSort[]): void;
} & (
  | ({
      handlePaginationChange?(pagination: TPaginationTable): void;
      pagination?: TPaginationData;
      isPagination?: true;
      paginationProp?: PaginationOneProps;
    } & TableProps)
  | ({
      isPagination?: never;
    } & TableProps)
);

const hasManyRows = (totalElements?: number) =>
  (totalElements ?? 0) > DEFAULT_PAGE_SIZE;

const nextSort = (current: TTableSort[] | undefined, change: SortChange) => {
  const list = current ?? [];

  if (change.sort === "initial") {
    return list.filter((item) => item.field !== change.name);
  }

  if (change.sort === "desc") {
    return list.map((item) =>
      item.field === change.name
        ? { ...item, direction: "desc" as const }
        : item,
    );
  }

  const rest = list.filter((item) => item.field !== change.name);
  const room =
    rest.length >= MAX_SORT_LEVEL
      ? rest.slice(rest.length - MAX_SORT_LEVEL + 1)
      : rest;

  return [...room, { field: change.name, direction: "asc" as const }];
};

const withSort = (columns: Column[], sort?: TTableSort[]) =>
  columns.map((column) => {
    const index = sort?.findIndex((item) => item.field === column.name) ?? -1;
    if (index < 0) {
      return { ...column, sort: undefined, sortOrder: undefined };
    }

    return {
      ...column,
      sort: sort?.[index].direction,
      sortOrder: index + 1,
    };
  });

export const TableSort = ({
  queryKey,
  sort,
  handleSortChange,
  ...props
}: TableSortProps) => {
  const isFetching = useIsFetching({ queryKey: [queryKey] });
  const [widths, setWidths] = React.useState<Record<string, string>>({});
  const pagination = props.isPagination ? props.pagination : undefined;
  const paginationProp = props.isPagination ? props.paginationProp : undefined;
  const onPageChange = props.isPagination
    ? props.handlePaginationChange
    : undefined;

  const cols = React.useMemo(
    () =>
      withSort(props.columnList, sort).map((column) =>
        widths[column.name]
          ? { ...column, width: widths[column.name] }
          : column,
      ),
    [props.columnList, sort, widths],
  );

  const handleSort = (change: SortChange) => {
    handleSortChange?.(nextSort(sort, change));
  };

  const handleResize = ({ name, width }: { name: string; width: string }) => {
    setWidths((current) => ({ ...current, [name]: width }));
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <StyledTableSort>
      <Table
        {...props}
        columnList={cols}
        rowList={props.rowList}
        dimension="m"
        onSortChange={handleSort}
        onColumnResize={handleResize}
      />
      {pagination && hasManyRows(pagination.totalElements) && (
        <StyledPagination>
          <PaginationTable
            {...paginationProp}
            handlePaginationChange={onPageChange}
            pageSize={pagination.size}
            totalItems={pagination.totalElements}
            page={pagination.number}
          />
        </StyledPagination>
      )}
    </StyledTableSort>
  );
};
