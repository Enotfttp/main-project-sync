import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage, StyledWhiteBlock } from "./Schedule.styled";
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
      <StyledWhiteBlock>
        <FilterSection
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </StyledWhiteBlock>

      <StyledWhiteBlock>
        <TableSection
          onRowClick={onRowClick}
          tableKey={tableKey}
          filters={filters}
        />
      </StyledWhiteBlock>
    </StyledPackagesPage>
  );
};
