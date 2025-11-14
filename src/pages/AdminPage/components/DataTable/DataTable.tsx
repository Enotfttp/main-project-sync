import { columns, statusConfig } from "./DataTable.columns";
import {
  StyledTableTitle,
  StyledTableHeader,
  StyledTableEmpty,
} from "./DataTable.styled";
import { Table } from "@admiral-ds/react-ui";
import { useTableData } from "@entities/admin/api/admin.service";
import { TableData } from "@entities/admin/types/admin.types";
import { DataTableFilter } from "@pages/AdminPage/components/DataTable/components/DataTableFilter/DataTableFilter";
import { Loader } from "@shared/ui";
import { TableRow } from "@shared/ui/Filter/Filter.types";
import { Notification } from "@shared/ui/Notification/Notification";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DataTableProps {
  selectedChartSection: string | null;
}

export const DataTable: React.FC<DataTableProps> = ({
  selectedChartSection,
}) => {
  const { serviceId } = useParams();
  const [cols, setCols] = React.useState<TableData[]>([]);
  const {
    data: tableData,
    isLoading,
    error,
  } = useTableData(serviceId || "", selectedChartSection);

  const [filteredData, setFilteredData] = useState<TableRow[]>([]);

  // Инициализируем filteredData при загрузке данных
  useEffect(() => {
    if (tableData) {
      setFilteredData(tableData);
    }
  }, [tableData]);

  const handleFilterChange = (filteredData: TableRow[]) => {
    setFilteredData(filteredData);
  };

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

  const getTableTitle = () => {
    if (!tableData?.length) return "Детальные данные";

    const status = tableData[0]?.status;
    return `Детальные данные: ${statusConfig[status].extraText || "Данные"}`;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <StyledTableHeader>
        <StyledTableTitle>{[...getTableTitle()]}</StyledTableTitle>
        {tableData && tableData.length > 0 && (
          <DataTableFilter
            data={tableData}
            onFilterChange={handleFilterChange}
          />
        )}
      </StyledTableHeader>

      <Table
        displayRowSelectionColumn
        rowList={cols || []}
        columnList={columns}
        onColumnResize={handleResize}
        onRowSelectionChange={handleSelectionChange}
      />

      {filteredData.length === 0 && tableData && tableData.length > 0 && (
        <StyledTableEmpty>
          Нет данных, соответствующих выбранным фильтрам
        </StyledTableEmpty>
      )}
    </>
  );
};
