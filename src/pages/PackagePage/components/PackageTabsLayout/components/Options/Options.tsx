import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage, StyledWhiteBlock } from "./Options.styled";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";

export const Options = () => {
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
