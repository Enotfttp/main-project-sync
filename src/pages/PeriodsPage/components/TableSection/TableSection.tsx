import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetPeriods } from "@entities/periods/hook";
import { FilterValue } from "@features/Filter/Filter.types";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue;
  onRowClick(rowId: string | number): void;
}

export const TableSection: FC<IProps> = ({ tableKey, filters, onRowClick }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();
  const { data: dataPeriod } = useGetPeriods({
    filters: filters,
    pagination: pagination,
  });

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.packages.detail.periods.documents.shortPath(rowId));
  };

  return (
    <TableSort
      isVisibleAdditionalBlock
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataPeriod?.data)}
      onRowClick={handleRowClick}
      queryKey="periods"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataPeriod?.pagination}
    />
  );
};
