import { FilterSection, TableSection } from "./components";
import { StyledConnectionsPage } from "./ConnectionsPage.styled";
import { Divider, T } from "@admiral-ds/react-ui";
import { handleSetFilters, useFilter } from "@shared/ui/Filter/useFilter";
import { Breadcrumbs } from "@widgets/breadcrumbs/Breadcrumbs";
import * as React from "react";
import { useEffect } from "react";
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
    setFilters,
  } = useFilter();

  useEffect(() => {
    if (Array.isArray(filters) && filters?.length > 0) return;
    setFilters((prevState) =>
      handleSetFilters([{ fieldId: "idRKO", value: id }], prevState),
    );
  }, [filters]);

  return (
    <StyledConnectionsPage>
      <Breadcrumbs />
      <T font="Header/H1">Подписки</T>
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
    </StyledConnectionsPage>
  );
};

export default ConnectionsPage;
