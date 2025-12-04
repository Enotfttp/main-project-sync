import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetRKOList } from "@entities/rko";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
  onRowClick(rowId: string | number): void;
}

export const TableSection: FC<IProps> = ({ tableKey, filters, onRowClick }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();

  const { data: dataRKO } = useGetRKOList({
    filters: filters,
    pagination: pagination,
  });

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.rko.service.fullPath(rowId));
  };

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataRKO?.data)}
      onRowClick={handleRowClick}
      queryKey="rko-list"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataRKO?.pagination}
    />
  );
};
