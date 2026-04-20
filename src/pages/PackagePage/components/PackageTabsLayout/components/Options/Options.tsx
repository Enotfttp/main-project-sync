import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage } from "./Options.styled";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";

export const Options = () => {
  const { handleResetFilters, handleApplyFilters, filters, tableKey } =
    useFilter();

  return (
    <StyledPackagesPage>
      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection tableKey={tableKey} filters={filters} />
    </StyledPackagesPage>
  );
};
