import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage, StyledWhiteBlock } from "./SchedulePage.styled";
import { useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";

const SchedulePage = () => {
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

export default SchedulePage;
