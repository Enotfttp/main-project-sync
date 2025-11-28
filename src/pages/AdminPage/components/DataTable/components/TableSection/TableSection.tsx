import { columns } from "./column";
import { StyledTableEmpty, StyledTableTitle } from "../../DataTable.styled";
import { TableData, useTableData } from "@entities/admin";
import { Loader, Notification, TableSort } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import * as React from "react";
import { FC, useEffect } from "react";

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
  const {
    data: tableData,
    isLoading,
    error,
  } = useTableData(serviceId || "", selectedChartSection, filters);

  const [cols, setCols] = React.useState<TableData[]>([]);

  const handleSelectionChange = (ids: Record<string, boolean>): void => {
    const updRows = cols.map((row) => ({
      ...row,
      selected: ids[row.id],
    }));
    setCols(updRows);
  };

  useEffect(() => {
    setCols(tableData ?? []);
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

  if (isLoading) {
    return <Loader />;
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
      />

      {!tableData?.length && (
        <StyledTableEmpty>
          Нет данных, соответствующих выбранным фильтрам
        </StyledTableEmpty>
      )}
    </>
  );
};
