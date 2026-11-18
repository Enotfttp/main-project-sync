import { columnList } from "../../lib/columns";
import { useGetOptions } from "@entities/option/api/hook";
import { IOptionInfo } from "@entities/option/model";
import { addIdAndHoverTableRowData } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  onRowClick: (id: string) => void;
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onRowClick, onTotalElementsChange }) => {
  const { idPackage } = useParams();

  if (!idPackage) throw new Error("Нет id пакета");

  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IOptionInfo>();

  const { data } = useGetOptions({
    packageSubscriptionId: idPackage,
    page,
    sort,
  });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () =>
      addIdAndHoverTableRowData("optionSubscriptionId", data?.content, true),
    [data?.content],
  );

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
      queryKey="options"
      sort={sort}
      handleSortChange={handleSortChange}
      handlePaginationChange={handlePaginationChange}
      pagination={data}
    />
  );
};
