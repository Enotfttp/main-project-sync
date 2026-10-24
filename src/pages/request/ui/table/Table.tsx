import { columnList } from "../../lib/columns";
import { routesPath } from "@app/providers";
import { useGetRequests } from "@entities/request/api/hook.ts";
import { TFilterValue } from "@features/dynamic-filters";
import { TPaginationTable } from "@shared/types";
import { TableSort } from "@shared/ui";
import * as React from "react";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  tableKey: number;
  filters?: TFilterValue;
}

export const Table: FC<IProps> = ({ tableKey, filters }) => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<TPaginationTable>();
  const { data: requests } = useGetRequests({
    filters: filters,
    pagination: pagination,
  });

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
      rowList={[]}
      onRowClick={handleRowClick}
      queryKey="documents"
      handlePaginationChange={handlePaginationChange}
      // pagination={requests?.page}
    />
  );
};
