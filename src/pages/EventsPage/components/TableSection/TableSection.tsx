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
  id: string;
}

export const TableSection: FC<IProps> = ({ tableKey, filters, id }) => {
  const { data } = useGetEventsList({ ...filters, serviceId: id });

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(data)}
      queryKey="events-list"
    />
  );
};
