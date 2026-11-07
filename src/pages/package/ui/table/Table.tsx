import { columnList } from "../../lib/columns";
import { toPackageFilter } from "../../lib/filters";
import { useGetPackages } from "@entities/package/api/hook";
import { hasFilledFilter, TFilterValue } from "@features/dynamic-filters";
import { addIdAndHoverTableRowData } from "@shared/lib";
import { TPaginationTable } from "@shared/types";
import { TableSort } from "@shared/ui";
import { FC, useCallback, useMemo, useState } from "react";

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
  const [pagination, setPagination] = useState<TPaginationTable>();
  const hasFilters = hasFilledFilter(filters);
  const { data } = useGetPackages(
    {
      filters: toPackageFilter(filters),
      page: pagination,
    },
    { enabled: hasFilters, staleTime: FRESH_TIME },
  );
  const rows = useMemo(
    () =>
      hasFilters
        ? addIdAndHoverTableRowData(
            "packageSubscriptionId",
            data?.content,
            true,
          )
        : [],
    [data?.content, hasFilters],
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

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
      queryKey="packages"
      handlePaginationChange={handlePaginationChange}
      pagination={hasFilters ? data : undefined}
    />
  );
};
