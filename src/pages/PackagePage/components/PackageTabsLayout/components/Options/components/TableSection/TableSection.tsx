import { columnList } from "./column";
import { useGetOptions } from "@entities/options/hook";
import { PackageStatusText } from "@entities/package/types";
import { FilterValue } from "@features/Filter/Filter.types";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue;
}

export const TableSection: FC<IProps> = ({ tableKey, filters }) => {
  const [pagination, setPagination] = useState<TPaginationTable>();

  const { data: dataOptions } = useGetOptions(
    {
      filters: filters,
      pagination: pagination,
    },
    {
      // enabled: !!filters?.length,
      enabled: !filters?.length,
    },
  );

  const dataOptionsWithRusStatus = useMemo(() => {
    return dataOptions?.data.map((el) => ({
      ...el,
      status: PackageStatusText[el.status],
    }));
  }, [dataOptions]);

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  return (
    <TableSort
      key={tableKey}
      columnList={columnList}
      rowList={additionalHover(dataOptionsWithRusStatus)}
      queryKey="options"
      isPagination
      handlePaginationChange={handlePaginationChange}
      pagination={dataOptions?.pagination}
    />
  );
};
