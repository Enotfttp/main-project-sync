import { FilterSection, PeriodDetail, TableSection } from "./components";
import { StyledDocumentsPage } from "./DocumentsPage.styled";
import { Divider, T } from "@admiral-ds/react-ui";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";
import { useParams } from "react-router-dom";

const DocumentsPage = () => {
  const { idPeriod } = useParams();

  if (!idPeriod) {
    throw new Error("Вы не выбрали документ");
  }
  const { handleResetFilters, handleApplyFilters, filters, tableKey } =
    useFilter();

  // TODO закомментировал, чтобы не мешать работе автомоков
  // useEffect(() => {
  //   if (filters && Object.keys(filters).length > 0) return;
  //
  //   setFilters((prevState) =>
  //     handleSetFilters({  "serviceId: value: idPeriod }, prevState),
  //   );
  // }, [filters]);

  return (
    <StyledDocumentsPage>
      <PeriodDetail />
      <Divider />
      <T font="Header/H1">Документы</T>
      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
      <TableSection tableKey={tableKey} filters={filters} />
    </StyledDocumentsPage>
  );
};

export default DocumentsPage;
