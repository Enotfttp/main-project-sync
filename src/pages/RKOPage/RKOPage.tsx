import { FilterSection, TableSection } from "./components";
import { StyledRKOPage, StyledWhiteBlock } from "./RKOPage.styled";
import { T } from "@admiral-ds/react-ui";
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
    </StyledRKOPage>
  );
};

export default RKOPage;
