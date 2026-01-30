import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetPackages } from "@entities/package/hook";
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

  const { data: dataPackage } = useGetPackages(
    {
      filters: filters,
      pagination: pagination,
    },
    {
      // enabled: !!filters?.length,
      // enabled: !filters?.length,
    },
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.packages.detail.shortPath(rowId));
  };

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataPackage?.data)}
      onRowClick={handleRowClick}
      queryKey="packages"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataPackage?.pagination}
    />
  );
};
