import * as React from 'react';
import { T } from '@admiral-ds/react-ui';
import { useParams } from 'react-router-dom';
import { StyledConnectionsPage } from './ConnectionsPage.styled';
import { columnList } from './ConnectionsTable.columns';
import { useGetConnectionList, TFiltersServiceConnection } from '@entities/serviceConnect';
import { additionalHover } from '@shared/index';
import { TableSort } from '@shared/index';
import { SearchWithFilter, EventsPeriodsModal, useEventsPeriodsModalState } from '@features/index';

const ConnectionsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Вы не выбрали документ РКО');
  }
  const [filters, setFilters] = React.useState<TFiltersServiceConnection>();

  const modalState = useEventsPeriodsModalState();
  const { data } = useGetConnectionList({ ...filters, idRKO: id });

  return (
    <StyledConnectionsPage>
      <T font="Header/H1">Подписки</T>
      <SearchWithFilter<TFiltersServiceConnection>
        selectPlaceholder="Выберите поле из выпадающего списка"
        columnList={columnList}
        setFilters={setFilters}
        searchPlaceholder="Введите номер подписки"
      />
      <TableSort columnList={columnList} rowList={additionalHover(data)} onRowClick={modalState.openModal} queryKey="serviceConnection-list" />
      <EventsPeriodsModal {...modalState} />
    </StyledConnectionsPage>
  );
};

export default ConnectionsPage;
