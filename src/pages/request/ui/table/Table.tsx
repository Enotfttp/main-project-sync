import { columnList } from "../../lib/columns";
import { routesPath } from "@app/providers";
import { useGetRequests } from "@entities/request/api/hook";
import { TFilterValue } from "@features/dynamic-filters";
import { addIdTableRowData } from "@shared/lib";
import { TPaginationTable } from "@shared/types";
import { TableSort } from "@shared/ui";
import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<TPaginationTable>();
  const { data } = useGetRequests(
    {
      filters: filters,
      page: pagination,
    },
    { enabled: !!filters, staleTime: FRESH_TIME },
  );
  const rows = useMemo(
    () => addIdTableRowData("requestId", data?.content),
    [data?.content],
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = () => {
    navigate(routesPath.package.root);
  };

  return (
    <TableSort
      isPagination
      key={tableKey}
      columnList={columnList}
      rowList={rows}
      onRowClick={handleRowClick}
      queryKey="documents"
      handlePaginationChange={handlePaginationChange}
      pagination={data}
    />
  );
};
