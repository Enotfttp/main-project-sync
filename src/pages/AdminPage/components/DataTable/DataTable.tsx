import { columns, statusConfig } from "./DataTable.columns";
import { filterFields } from "./DataTable.filter";
import {
  StyledTableEmpty,
  StyledTableHeader,
  StyledTableTitle,
} from "./DataTable.styled";
import { Table } from "@admiral-ds/react-ui";
import { TableData, useTableData } from "@entities/admin";
import { Filter, Loader } from "@shared/ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import { Notification } from "@shared/ui/Notification/Notification";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

interface DataTableProps {
  selectedChartSection: string | null;
}

export const DataTable: React.FC<DataTableProps> = ({
  selectedChartSection,
}) => {
  const { serviceId } = useParams();
  const [cols, setCols] = React.useState<TableData[]>([]);
  const { filterValues, updateFilter, resetFilter } = useFilter();
  const {
    data: tableData,
    isLoading,
    error,
    refetch,
  } = useTableData(serviceId || "", selectedChartSection, filterValues);

  const handleApply = useCallback(() => {
    console.log("filterValues2 = ", filterValues);
    refetch();
  }, []);

  const handleResize = ({ name, width }: { name: string; width: string }) => {
    const newCols = cols.map((col) =>
      col.name === name ? { ...col, width } : col,
    );
    setCols(newCols);
  };

  const handleSelectionChange = (ids: Record<string, boolean>): void => {
    const updRows = cols.map((row) => ({
      ...row,
      selected: ids[row.id],
    }));
    setCols(updRows);
  };

  const getTableTitle = () => {
    if (!tableData?.length) return "Детальные данные";

    const status = tableData[0]?.status;
    return `Детальные данные: ${statusConfig[status].extraText || "Данные"}`;
  };

  useEffect(() => {
    setCols(tableData ?? []);
  }, [tableData]);

  if (!serviceId) {
    return (
      <Notification
        status="info"
        title="Выберите сервис"
        body="Пожалуйста, выберите сервис для отображения данных"
      />
    );
  }

  if (!selectedChartSection) {
    return (
      <Notification
        status="info"
        title="Выберите категорию"
        body="Нажмите на любую категорию в диаграмме для отображения детальных данных"
      />
    );
  }

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
  console.log("tableData: ");
  return (
    <>
      <StyledTableHeader>
        <StyledTableTitle>{[...getTableTitle()]}</StyledTableTitle>
        <Filter
          fields={filterFields}
          values={filterValues}
          onChange={updateFilter}
          onApply={handleApply}
          onReset={resetFilter}
        />
      </StyledTableHeader>

      <Table
        displayRowSelectionColumn
        rowList={cols || []}
        columnList={columns}
        onColumnResize={handleResize}
        onRowSelectionChange={handleSelectionChange}
      />

      {!tableData?.length && (
        <StyledTableEmpty>
          Нет данных, соответствующих выбранным фильтрам
        </StyledTableEmpty>
      )}
    </>
  );
};
