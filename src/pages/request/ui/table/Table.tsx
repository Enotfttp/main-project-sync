import { columnList } from "../../lib/columns";
import { RequestDetails } from "../details/RequestDetails";
import { useGetRequests } from "@entities/request/api/hook";
import { hasFilledFilter, TFilterValue } from "@features/dynamic-filters";
import { addIdTableRowData } from "@shared/lib";
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
}

export const Table: FC<IProps> = ({ tableKey, filters }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();
  const [requestId, setRequestId] = useState<string>();
  const hasFilters = hasFilledFilter(filters);
  const { data } = useGetRequests(
    {
      filters: filters,
      page: pagination,
    },
    { enabled: hasFilters, staleTime: FRESH_TIME },
  );
  const rows = useMemo(
    () => (hasFilters ? addIdTableRowData("requestId", data?.content) : []),
    [data?.content, hasFilters],
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = (rowId: string | number) => {
    setRequestId(String(rowId));
  };

  return (
    <>
      <TableSort
        isPagination
        key={tableKey}
        columnList={columnList}
        rowList={rows}
        onRowClick={handleRowClick}
        queryKey="documents"
        handlePaginationChange={handlePaginationChange}
        pagination={hasFilters ? data : undefined}
      />
      {requestId && (
        <RequestDetails id={requestId} onClose={() => setRequestId(undefined)} />
      )}
    </>
  );
};
