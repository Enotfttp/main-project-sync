import { FilterSection, ScheduleDetail, TableSection } from "./components";
import { StyledPeriodsPage } from "./PeriodsPage.styled";
import { Divider, T } from "@admiral-ds/react-ui";
import { useFilter } from "@features/Filter/useFilter";
import * as React from "react";
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
    onRowClick,
  } = useFilter();

  // TODO закомментировал, чтобы не мешать работе автомоков
  // useEffect(() => {
  //   if (filters && Object.keys(filters).length > 0) return;
  //
  //   setFilters((prevState) =>
  //     handleSetFilters({  "serviceId: value: id }, prevState),
  //   );
  // }, [filters]);

  return (
    <StyledPeriodsPage>
      <ScheduleDetail />
      <Divider />
      <T font="Header/H1">Периоды</T>
      <FilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
      <TableSection
        tableKey={tableKey}
        filters={filters}
        onRowClick={onRowClick}
      />
    </StyledPeriodsPage>
  );
};

export default PeriodsPage;
