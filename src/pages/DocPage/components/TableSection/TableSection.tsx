import { columnList } from "./column";
import { useGetDocuments } from "@entities/documents/hook";
import {
  DocStatusText,
  DocTypeText,
  OrderStatusText,
} from "@entities/documents/types";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
}

export const TableSection: FC<IProps> = ({ tableKey, filters }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();
  const { data: dataDoc } = useGetDocuments({
    filters: filters,
    pagination: pagination,
  });

  const dataDocWithRusStatus = useMemo(() => {
    return dataDoc?.data.map((el) => ({
      ...el,
      status: DocStatusText[el.status],
      orderStatus: el?.orderStatus ? OrderStatusText[el.orderStatus] : "",
      docType: DocTypeText[el.docType],
    }));
  }, [dataDoc, filters]);

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataDocWithRusStatus)}
      queryKey="documents"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataDoc?.pagination}
    />
  );
};
