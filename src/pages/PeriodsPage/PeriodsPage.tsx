import { FilterSection, TableSection } from "./components";
import { StyledPeriodsPage } from "./PeriodsPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";
import { useParams } from "react-router-dom";

const PeriodsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали подписку");
  }
  const { handleResetFilters, handleApplyFilters, filters, tableKey } =
    useFilter();

  return (
    <StyledPeriodsPage>
      <T font="Header/H1">Периоды</T>

      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection tableKey={tableKey} filters={filters} id={id} />
    </StyledPeriodsPage>
  );
};

export default PeriodsPage;
