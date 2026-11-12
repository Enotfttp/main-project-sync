import { columnList } from "../../lib/columns";
import { useGetDocuments } from "@entities/document/api/hook";
import { addIdAndHoverTableRowData } from "@shared/lib";
import { TPaginationTable } from "@shared/types";
import { TableSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  onRowClick: (id: string) => void;
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onRowClick, onTotalElementsChange }) => {
  const { idOption, idPackage, idPeriod } = useParams();

  if (!idOption && !idPackage && !idPeriod) throw new Error("Нет id");

  const [pagination, setPagination] = useState<TPaginationTable>();

  const { data } = useGetDocuments({
    periodId: idPeriod,
    packageSubscriptionId: idPackage,
    optionSubscriptionId: idOption,
    page: pagination,
  });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () => addIdAndHoverTableRowData("documentId", data?.content, true),
    [data?.content],
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = useCallback(
    (rowId: string | number) => {
      onRowClick(String(rowId));
    },
    [onRowClick],
  );
  return (
    <TableSort
      isPagination
      columnList={columnList}
      rowList={rows}
      onRowClick={handleRowClick}
      queryKey="documents"
      handlePaginationChange={handlePaginationChange}
      pagination={(data?.totalElements || 0) > 25 ? data : undefined}
    />
  );
};
