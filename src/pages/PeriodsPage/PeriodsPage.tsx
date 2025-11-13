import { columnList } from "./PeriodsPage.columns";
import { StyledPeriodsPage } from "./PeriodsPage.styled";
import { T } from "@admiral-ds/react-ui";
import { TFiltersPeriods, useGetPeriodsList } from "@entities/periods";
import { SearchWithFilter } from "@features/index";
import { TableSort } from "@shared/ui";
import * as React from "react";
import { useParams } from "react-router-dom";

const PeriodsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали подписку");
  }
  const [filters, setFilters] = React.useState<TFiltersPeriods>();
  const { data } = useGetPeriodsList({ ...filters, serviceId: id });

  return (
    <StyledPeriodsPage>
      <T font="Header/H1">Периоды</T>
      <SearchWithFilter<TFiltersPeriods>
        selectPlaceholder="Выберите поле из выпадающего списка"
        columnList={columnList}
        setFilters={setFilters}
        searchPlaceholder="Введите значение для поиска"
      />
      <TableSort
        columnList={columnList}
        rowList={data || []}
        queryKey="periods-list"
      />
    </StyledPeriodsPage>
  );
};

export default PeriodsPage;
