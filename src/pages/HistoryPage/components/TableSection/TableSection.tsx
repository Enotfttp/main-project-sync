import { columnList } from "./column";
import { useGetHistories } from "@entities/history/hook";
import {
  ComcRequestStatusText,
  ComcResultTypeText,
  RequestHistoryKafkaStatusText,
} from "@entities/history/types";
import { FilterValue } from "@features/Filter/Filter.types";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue;
}

export const TableSection: FC<IProps> = ({ tableKey, filters }) => {
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

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataHistoryWithRusStatus)}
      queryKey="histories"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataHistory?.pagination}
    />
  );
};
