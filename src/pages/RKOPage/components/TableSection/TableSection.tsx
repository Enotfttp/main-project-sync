import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetRKOList } from "@entities/rko";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import * as React from "react";
import { FC } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
  onRowClick(rowId: string | number): void;
}

export const TableSection: FC<IProps> = ({ tableKey, filters, onRowClick }) => {
  const { data } = useGetRKOList(filters);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.rko.service.fullPath(rowId));
  };

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(data)}
      onRowClick={handleRowClick}
      queryKey="rko-list"
    />
  );
};
