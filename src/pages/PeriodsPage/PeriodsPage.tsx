import { FilterSection, TableSection } from "./components";
import { StyledPeriodsPage } from "./PeriodsPage.styled";
import { handleSetFilters, useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PeriodsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали подписку");
  }
  const {
    handleResetFilters,
    handleApplyFilters,
    filters,
    tableKey,
    setFilters,
  } = useFilter();

  useEffect(() => {
    if (!filters || filters?.length > 0) return;

    setFilters((prevState) =>
      handleSetFilters([{ fieldId: "serviceId", value: id }], prevState),
    );
  }, [filters]);

  return (
    <StyledPeriodsPage>
      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection tableKey={tableKey} filters={filters} />
    </StyledPeriodsPage>
  );
};

export default PeriodsPage;
