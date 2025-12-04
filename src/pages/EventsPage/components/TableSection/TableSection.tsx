import { columnList } from "./column";
import { useGetEventsList } from "@entities/events";
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
  const { data: dataEvent } = useGetEventsList({
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
      rowList={additionalHover(dataEvent?.data)}
      queryKey="events-list"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataEvent?.pagination}
    />
  );
};
