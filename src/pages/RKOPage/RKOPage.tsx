import { FilterSection, TableSection } from "./components";
import { StyledRKOPage } from "./RKOPage.styled";
import { Divider, T } from "@admiral-ds/react-ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";

const RKOPage = () => {
  const {
    handleResetFilters,
    handleApplyFilters,
    filters,
    onRowClick,
    tableKey,
  } = useFilter();

  return (
    <StyledRKOPage>
      <T font="Header/H1">Договора РКО</T>
      <Divider />

      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection
        onRowClick={onRowClick}
        tableKey={tableKey}
        filters={filters}
      />
    </StyledRKOPage>
  );
};

export default RKOPage;
