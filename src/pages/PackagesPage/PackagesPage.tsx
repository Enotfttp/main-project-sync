import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage, StyledWhiteBlock } from "./PackagesPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";

const PackagesPage = () => {
  const {
    handleResetFilters,
    handleApplyFilters,
    filters,
    onRowClick,
    tableKey,
  } = useFilter();

  return (
    <StyledPackagesPage>
      <T font="Header/H1">Пакеты</T>
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

export default PackagesPage;
