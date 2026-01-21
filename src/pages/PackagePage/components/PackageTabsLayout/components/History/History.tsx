import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage, StyledWhiteBlock } from "./History.styled";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";

export const History = () => {
  const { handleResetFilters, handleApplyFilters, filters, tableKey } =
    useFilter();

  return (
    <StyledPackagesPage>
      <StyledWhiteBlock>
        <FilterSection
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </StyledWhiteBlock>

      <StyledWhiteBlock>
        <TableSection tableKey={tableKey} filters={filters} />
      </StyledWhiteBlock>
    </StyledPackagesPage>
  );
};
