import * as React from 'react';
import { T } from '@admiral-ds/react-ui';
import { useParams } from 'react-router-dom';
import { StyledEventsPage } from './EventsPage.styled';
import { columnList } from './EventsPage.columns';
import { TableSort } from '@shared/index';
import { SearchWithFilter } from '@features/index';
import { TFiltersEvents, useGetEventsList } from '@entities/events';

const EventsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Вы не выбрали подписку');
  }
  const [filters, setFilters] = React.useState<TFiltersEvents>();
  const { data } = useGetEventsList({ ...filters, serviceId: id as string });

  return (
    <StyledEventsPage>
      <T font="Header/H1">События</T>
      <SearchWithFilter<TFiltersEvents>
        selectPlaceholder="Выберите поле из выпадающего списка"
        columnList={columnList}
        setFilters={setFilters}
        searchPlaceholder="Введите значение для поиска"
      />
      <TableSort columnList={columnList} rowList={data || []} queryKey="events-list" />
    </StyledEventsPage>
  );
};

export default EventsPage;
