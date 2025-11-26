import { FilterSection, TableSection } from "./components";
import { StyledTableHeader, StyledTableTitle } from "./DataTable.styled";
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
