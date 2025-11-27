import { FilterSection, TableSection } from "./components";
import { StyledTableHeader, StyledTableTitle } from "./DataTable.styled";
import { Notification } from "@shared/ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import React from "react";
import { useParams } from "react-router-dom";

interface DataTableProps {
  selectedChartSection: { id: string; title: string } | null;
}

export const DataTable: React.FC<DataTableProps> = ({
  selectedChartSection,
}) => {
  const { serviceId } = useParams();

  const { handleResetFilters, handleApplyFilters, filters, tableKey } =
    useFilter();

  if (!selectedChartSection?.id) {
    return (
      <Notification
        status="info"
        title="Выберите категорию"
        body="Нажмите на любую категорию в диаграмме для отображения детальных данных"
      />
    );
  }

  return (
    <>
      <StyledTableHeader>
        <StyledTableTitle>{`Детальные данные: ${selectedChartSection?.title}`}</StyledTableTitle>

        <FilterSection
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </StyledTableHeader>

      <TableSection
        tableKey={tableKey}
        filters={filters}
        serviceId={serviceId}
        selectedChartSection={selectedChartSection?.id}
      />
    </>
  );
};
