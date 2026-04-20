import { columnList } from "./column";
import { useGetDocuments } from "@entities/documents/hook";
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
  const { data: dataDoc } = useGetDocuments({
    filters: filters,
    pagination: pagination,
  });

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  return (
    <TableSort
      isVisibleAdditionalBlock
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataDoc?.data)}
      queryKey="documents"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataDoc?.pagination}
    />
  );
};
