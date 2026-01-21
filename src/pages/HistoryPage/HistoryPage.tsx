import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage, StyledWhiteBlock } from "./HistoryPage.styled";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";

const HistoryPage = () => {
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

export default HistoryPage;
