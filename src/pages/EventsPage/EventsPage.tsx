import { FilterSection, TableSection } from "./components";
import { StyledEventsPage } from "./EventsPage.styled";
import { handleSetFilters, useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EventsPage = () => {
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
    <StyledEventsPage>
      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection tableKey={tableKey} filters={filters} />
    </StyledEventsPage>
  );
};

export default EventsPage;
