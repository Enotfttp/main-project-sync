import { FilterSection, TableSection } from "./components";
import { StyledEventsPage } from "./EventsPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";
import { useParams } from "react-router-dom";

const EventsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали подписку");
  }
  const { handleResetFilters, handleApplyFilters, filters, tableKey } =
    useFilter();

  return (
    <StyledEventsPage>
      <T font="Header/H1">События</T>

      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection tableKey={tableKey} filters={filters} id={id} />
    </StyledEventsPage>
  );
};

export default EventsPage;
