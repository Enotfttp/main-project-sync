import * as React from 'react';
import { T } from '@admiral-ds/react-ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { StyledConnectionsPage } from './ConnectionsPage.styled';
import { columnList } from './ConnectionsTable.columns';
import { useGetConnectionList, TFiltersServiceConnection } from '@entities/serviceConnect';
import { additionalHover } from '@shared/index';
import { TableSort } from '@shared/index';
import { SearchWithFilter } from '@features/index';
import { routesPath } from '@app/providers';
import { Breadcrumbs } from '@widgets/breadcrumbs/Breadcrumbs.tsx';

const ConnectionsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Вы не выбрали документ РКО');
  }
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState<TFiltersServiceConnection>();
  const onRowClick = useCallback(
    (rowId: string | number) => {
      navigate(routesPath.service.periods.shortPath(rowId));
    },
    [navigate],
  );

  const { data } = useGetConnectionList({ ...filters, idRKO: id });

  return (
    <StyledConnectionsPage>
      <Breadcrumbs />
      <T font="Header/H1">Подписки</T>
      <SearchWithFilter<TFiltersServiceConnection>
        selectPlaceholder="Выберите поле из выпадающего списка"
        columnList={columnList}
        setFilters={setFilters}
        searchPlaceholder="Введите значение для поиска"
      />
      <TableSort columnList={columnList} rowList={additionalHover(data)} onRowClick={onRowClick} queryKey="serviceConnection-list" />
    </StyledConnectionsPage>
  );
};

export default ConnectionsPage;
