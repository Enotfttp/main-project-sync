import { StyledRKOPage } from "./RKOPage.styled";
import { columnList } from "./RKOTable.columns.tsx";
import { T } from "@admiral-ds/react-ui";
import { routesPath } from "@app/index";
import { TFiltersRKO, useGetRKOList } from "@entities/rko";
import { SearchWithFilter } from "@features/index";
import { additionalHover } from "@shared/common";
import { TableSort } from "@shared/ui";
import { useCallback } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const RKOPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState<TFiltersRKO>();
  const { data } = useGetRKOList(filters);

  const onRowClick = useCallback(
    (rowId: string | number) => {
      navigate(routesPath.rko.service.fullPath(rowId));
    },
    [navigate],
  );

  return (
    <StyledRKOPage>
      <T font="Header/H1">Договора РКО</T>
      <SearchWithFilter<TFiltersRKO>
        selectPlaceholder="Выберите поле из выпадающего списка"
        columnList={columnList}
        setFilters={setFilters}
        searchPlaceholder="Введите значение для поиска"
      />
      <TableSort
        columnList={columnList}
        rowList={additionalHover(data)}
        onRowClick={onRowClick}
        queryKey="rko-list"
      />
    </StyledRKOPage>
  );
};

export default RKOPage;
