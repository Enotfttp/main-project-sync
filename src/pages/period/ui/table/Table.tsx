import { columnList } from "../../lib/columns";
import { useGetSchedulePeriods } from "@entities/schedule/api/hook";
import { IPeriodInfo } from "@entities/schedule/model";
import { addIdAndHoverTableRowData, resolveChildPath } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo } from "react";
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

  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IPeriodInfo>();

  const { data } = useGetSchedulePeriods({
    scheduleSourceGuid,
    page,
    sort,
  });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () => addIdAndHoverTableRowData("periodId", data?.content, true),
    [data?.content],
  );

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
      queryKey={["schedule", "periods"]}
      sort={sort}
      handleSortChange={handleSortChange}
      handlePaginationChange={handlePaginationChange}
      pagination={data}
    />
  );
};
