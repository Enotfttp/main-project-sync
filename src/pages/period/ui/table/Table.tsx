import { columnList } from "../../lib/columns";
import { useGetSchedulePeriods } from "@entities/schedule/api/hook";
import { addIdAndHoverTableRowData, resolveChildPath } from "@shared/lib";
import { TPaginationTable } from "@shared/types";
import { TableSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IProps {
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onTotalElementsChange }) => {
  const { id, idSchedule } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const scheduleSourceGuid = id || idSchedule;

  if (!scheduleSourceGuid) throw new Error("Нет id графика");

  const [pagination, setPagination] = useState<TPaginationTable>();

  const { data } = useGetSchedulePeriods({
    scheduleSourceGuid,
    page: pagination,
  });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () => addIdAndHoverTableRowData("periodId", data?.content, true),
    [data?.content],
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleRowClick = useCallback(
    (rowId: string | number) => {
      const documentPath = resolveChildPath(pathname, "document", {
        idPeriod: String(rowId),
      });

      if (documentPath) navigate(documentPath);
    },
    [pathname],
  );

  return (
    <TableSort
      isPagination
      columnList={columnList}
      rowList={rows}
      onRowClick={handleRowClick}
      queryKey="periods"
      handlePaginationChange={handlePaginationChange}
      pagination={(data?.totalElements || 0) > 25 ? data : undefined}
    />
  );
};
