import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetSchedule } from "@entities/schedule/hook";
import { PaymentScheduleStatusText } from "@entities/schedule/types";
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

  const { data: dataSchedule } = useGetSchedule(
    {
      filters: filters,
      pagination: pagination,
    },
    {
      enabled: !filters?.length,
    },
  );

  const dataScheduleWithRusStatus = useMemo(() => {
    return dataSchedule?.data.map((el) => ({
      ...el,
      status: PaymentScheduleStatusText[el.status],
    }));
  }, [dataSchedule]);

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.package.detail.schedule.fullPath(rowId));
  };

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataScheduleWithRusStatus)}
      onRowClick={handleRowClick}
      queryKey="schedules"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataSchedule?.pagination}
    />
  );
};
