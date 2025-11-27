import { columnList } from "./column";
import { routesPath } from "@app/providers";
import { useGetConnectionList } from "@entities/serviceConnect";
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
  const { data } = useGetConnectionList(filters);

  const handleRowClick = (rowId: string | number) => {
    onRowClick(routesPath.rko.service.periods.shortPath(rowId));
  };

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(data)}
      onRowClick={handleRowClick}
      queryKey="serviceConnection-list"
    />
  );
};
