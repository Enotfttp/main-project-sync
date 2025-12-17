import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetHistories } from "@entities/history/hook";
import {
  ComcRequestStatusText,
  ComcResultTypeText,
  RequestHistoryKafkaStatusText,
} from "@entities/history/types";
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

  const { data: dataHistory } = useGetHistories(
    {
      filters: filters,
      pagination: pagination,
    },
    {
      enabled: !filters?.length,
    },
  );

  const dataHistoryWithRusStatus = useMemo(() => {
    return dataHistory?.data.map((el) => ({
      ...el,
      status: ComcRequestStatusText[el.status],
      resultType: ComcResultTypeText[el.status],
      kafkaSendStatus: RequestHistoryKafkaStatusText[el.status],
    }));
  }, [dataHistory]);

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
      rowList={additionalHover(dataHistoryWithRusStatus)}
      onRowClick={handleRowClick}
      queryKey="histories"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataHistory?.pagination}
    />
  );
};
