import { FilterSection, TableSection } from "./components";
import { StyledConnectionsPage } from "./ConnectionsPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useFilter } from "@shared/ui/Filter/useFilter";
import { Breadcrumbs } from "@widgets/breadcrumbs/Breadcrumbs";
import * as React from "react";
import { useParams } from "react-router-dom";

const ConnectionsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали документ РКО");
  }
  const {
    handleResetFilters,
    handleApplyFilters,
    filters,
    onRowClick,
    tableKey,
  } = useFilter();

  return (
    <StyledConnectionsPage>
      <Breadcrumbs />
      <T font="Header/H1">Подписки</T>

      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <TableSection
        onRowClick={onRowClick}
        tableKey={tableKey}
        filters={filters}
        id={id}
      />
    </StyledConnectionsPage>
  );
};

export default ConnectionsPage;
