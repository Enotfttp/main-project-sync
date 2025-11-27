import { columnList } from "./column";
import { useGetPeriodsList } from "@entities/periods";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import * as React from "react";
import { FC } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
}

export const TableSection: FC<IProps> = ({ tableKey, filters }) => {
  const { data } = useGetPeriodsList(filters);

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(data)}
      queryKey="periods-list"
    />
  );
};
