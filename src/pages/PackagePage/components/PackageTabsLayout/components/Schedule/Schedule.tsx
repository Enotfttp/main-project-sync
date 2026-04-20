import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage } from "./Schedule.styled";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";

export const Schedule = () => {
  const {
    handleResetFilters,
    handleApplyFilters,
    filters,
    onRowClick,
    tableKey,
  } = useFilter();

  return (
    <StyledPackagesPage>
      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection
        onRowClick={onRowClick}
        tableKey={tableKey}
        filters={filters}
      />
    </StyledPackagesPage>
  );
};
