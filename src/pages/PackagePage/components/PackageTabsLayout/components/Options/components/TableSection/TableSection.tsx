import { columnList } from "./column";
import { useGetOptions } from "@entities/options/hook";
import { FilterValue } from "@features/Filter/Filter.types";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue;
}

export const TableSection: FC<IProps> = ({ tableKey, filters }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();

  const { data: dataOptions } = useGetOptions(
    {
      filters: filters,
      pagination: pagination,
    },
    {
      // enabled: !!filters?.length,
      enabled: !filters?.length,
    },
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  return (
    <TableSort
      isVisibleAdditionalBlock
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataOptions?.data)}
      queryKey="options"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataOptions?.pagination}
    />
  );
};
