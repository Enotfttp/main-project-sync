import { columns } from "./column";
import { StyledTableTitle } from "../../DataTable.styled";
import { TableData, useTableData } from "@entities/admin";
import { Notification, TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";
import * as React from "react";
import { FC, useCallback, useEffect, useState } from "react";

interface IProps {
  tableKey: number;
  filters?: FilterValue[];
  serviceId?: string;
  selectedChartSection?: string;
}

export const TableSection: FC<IProps> = ({
  tableKey,
  filters,
  serviceId,
  selectedChartSection,
}) => {
  const [pagination, setPagination] = useState<TPaginationTable>();
  const [cols, setCols] = React.useState<TableData[]>([]);

  const { data: tableData, error } = useTableData(
    serviceId || "",
    selectedChartSection,
    { filters: filters, pagination: pagination },
  );

  const handlePaginationChange = useCallback((pagination: TPaginationTable) => {
    setPagination(pagination);
  }, []);

  const handleSelectionChange = useCallback(
    (ids: Record<string, boolean>): void => {
      const updRows = cols.map((row) => ({
        ...row,
        selected: ids[row.id],
      }));
      setCols(updRows);
    },
    [],
  );

  useEffect(() => {
    setCols(tableData?.data ?? []);
  }, [tableData]);

  if (error) {
    return (
      <Notification
        status="error"
        title="Ошибка загрузки"
        body="Не удалось загрузить данные таблицы"
      />
    );
  }

  return (
    <>
      <StyledTableTitle>Детальные данные:</StyledTableTitle>
      <TableSort
        key={tableKey}
        displayRowSelectionColumn
        rowList={cols || []}
        columnList={columns}
        onRowSelectionChange={handleSelectionChange}
        queryKey="tableData"
        isPagination
        handlePaginationChange={handlePaginationChange}
        pagination={tableData?.pagination}
      />
    </>
  );
};
