import { FilterSection, TableSection } from "./components";
import { StyledPackagesPage } from "./PackagesPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useFilter } from "@features/Filter/useFilter";
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

export default PackagesPage;
