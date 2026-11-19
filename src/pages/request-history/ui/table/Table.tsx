import { columnList } from "../../lib/columns";
import { useGetRequestHistory } from "@entities/request/api/hook";
import { IRequestHistoryInfo } from "@entities/request/model";
import { addIdAndHoverTableRowData } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onTotalElementsChange }) => {
  const { id } = useParams();

  if (!id) throw new Error("Нет id запроса");

  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IRequestHistoryInfo>();

  const { data } = useGetRequestHistory({ id, page, sort });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () => addIdAndHoverTableRowData("requestHistoryId", data?.content),
    [data?.content],
  );

  return (
    <TableSort
      isPagination
      columnList={columnList}
      rowList={rows}
      queryKey={["request", "history"]}
      sort={sort}
      handleSortChange={handleSortChange}
      handlePaginationChange={handlePaginationChange}
      pagination={data}
    />
  );
};
