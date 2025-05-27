import { HttpResponse, http } from 'msw';
import { IEventsList } from '@entities/events';
import { TFiltersBodyMSW } from '@mocks/msw/types/filters.types';

const mockedEventsList: IEventsList[] = [
  {
    id: '1',
    serviceId: '1',
    eventDate: '24.02.2025',
    eventType: 'Тип события',
    execDate: '24.03.2025',
    rollbackDate: '28.03.2025',
  },
  {
    id: '2',
    serviceId: '1',
    eventDate: '21.02.2025',
    eventType: 'Тип события 2',
    execDate: '21.03.2025',
    rollbackDate: '29.03.2025',
  },
  {
    id: '3',
    serviceId: '2',
    eventDate: '31.03.3035',
    eventType: 'Тип события 3',
    execDate: '31.03.3035',
    rollbackDate: '01.05.2025',
  },
];

export const eventsHandlers = [
  http.post('/api/events-list/:id', async ({ request }) => {
    const body = (await request.json()) as TFiltersBodyMSW<IEventsList>;
    const filters = body?.filters || {};
    let filtered = mockedEventsList;

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        filtered = filtered.filter((item) => value?.includes(item[key]));
      }
    });

    return HttpResponse.json<IEventsList[]>(filtered);
  }),
];
