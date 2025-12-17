import { columnList } from "./column";
import { useGetPeriodsList } from "@entities/periods/periods.hook";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
}

export const TableSection: FC<IProps> = ({ tableKey, filters }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();
  const { data: dataPeriod } = useGetPeriodsList({
    filters: filters,
    pagination: pagination,
  });

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataPeriod?.data)}
      queryKey="periods-list"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataPeriod?.pagination}
    />
  );
};
