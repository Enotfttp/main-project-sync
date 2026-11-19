import { columnList } from "../../lib/columns";
import { toRequestFilter } from "../../lib/filters";
import { useGetRequests } from "@entities/request/api/hook";
import { IRequestInfo } from "@entities/request/model";
import { hasFilledFilter, TFilterValue } from "@features/dynamic-filters";
import { addIdAndHoverTableRowData } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useCallback, useMemo } from "react";

/**
 * Список уже загружается при применении фильтров, поэтому ответ какое-то время
 * считается свежим — иначе таблица повторит тот же запрос сразу после закрытия формы
 */
const FRESH_TIME = 5_000;

interface IProps {
  tableKey: number;
  filters?: TFilterValue;
  onRowClick: (id: string) => void;
}

export const Table: FC<IProps> = ({ tableKey, filters, onRowClick }) => {
  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IRequestInfo>();
  const hasFilters = hasFilledFilter(filters);
  const { data } = useGetRequests(
    {
      filters: toRequestFilter(filters),
      page,
      sort,
    },
    { enabled: hasFilters, staleTime: FRESH_TIME },
  );
  const rows = useMemo(
    () =>
      hasFilters
        ? addIdAndHoverTableRowData("requestId", data?.content, true)
        : [],
    [data?.content, hasFilters],
  );

  const handleRowClick = useCallback(
    (rowId: string | number) => {
      onRowClick(String(rowId));
    },
    [onRowClick],
  );

  return (
    <TableSort
      isPagination
      key={tableKey}
      columnList={columnList}
      rowList={rows}
      onRowClick={handleRowClick}
      queryKey="requests"
      sort={sort}
      handleSortChange={handleSortChange}
      handlePaginationChange={handlePaginationChange}
      pagination={hasFilters ? data : undefined}
    />
  );
};
