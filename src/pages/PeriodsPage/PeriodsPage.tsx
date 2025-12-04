import { FilterSection, TableSection } from "./components";
import { StyledPeriodsPage, StyledWhiteBlock } from "./PeriodsPage.styled";
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
    if (Array.isArray(filters) && filters?.length > 0) return;

    setFilters((prevState) =>
      handleSetFilters([{ fieldId: "serviceId", value: id }], prevState),
    );
  }, [filters]);

  return (
    <StyledPeriodsPage>
      <StyledWhiteBlock>
        <FilterSection
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </StyledWhiteBlock>

      <StyledWhiteBlock>
        <TableSection tableKey={tableKey} filters={filters} />
      </StyledWhiteBlock>
    </StyledPeriodsPage>
  );
};

export default PeriodsPage;
