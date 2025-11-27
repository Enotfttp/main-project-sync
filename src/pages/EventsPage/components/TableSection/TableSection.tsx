import { columnList } from "./column";
import { useGetEventsList } from "@entities/events";
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
  const { data } = useGetEventsList(filters);

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(data)}
      queryKey="events-list"
    />
  );
};
