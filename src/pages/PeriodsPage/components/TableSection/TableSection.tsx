import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetPeriodsList } from "@entities/periods/periods.hook";
import {
  PeriodsResultTypeText,
  PeriodsStatusText,
} from "@entities/periods/periods.types";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
  onRowClick(rowId: string | number): void;
}

export const TableSection: FC<IProps> = ({ tableKey, filters, onRowClick }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();
  const { data: dataPeriod } = useGetPeriodsList({
    filters: filters,
    pagination: pagination,
  });

  const dataPeriodWithRusStatus = useMemo(() => {
    return dataPeriod?.data.map((el) => ({
      ...el,
      status: PeriodsStatusText[el.status],
      resultType: PeriodsResultTypeText[el.resultType],
    }));
  }, [dataPeriod]);

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.packages.detail.periods.documents.shortPath(rowId));
  };

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataPeriodWithRusStatus)}
      onRowClick={handleRowClick}
      queryKey="periods"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataPeriod?.pagination}
    />
  );
};
