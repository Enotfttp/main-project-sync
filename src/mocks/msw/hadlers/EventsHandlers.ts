import { HttpResponse, http } from 'msw';
import { IEventsList } from '@entities/events';

const mockedEventsList = [
  {
    id: '1',
    eventDate: '24.02.2025',
    eventType: 'Тип события',
    execDate: '24.03.2025',
    docs: 'Документы 1',
    order: 'Основание 1',
    reqHist: 'История 1',
  },
  {
    id: '2',
    eventDate: '21.02.2025',
    eventType: 'Тип события 2',
    execDate: '21.03.2025',
    docs: 'Документы 2',
    order: 'Основание 2',
    reqHist: 'История 2',
  },
  {
    id: '3',
    eventDate: '31.03.3035',
    eventType: 'Тип события 3',
    execDate: '31.03.3035',
    docs: 'Документы 3',
    order: 'Основание 3',
    reqHist: 'История 3',
  },
];

export const eventsHandlers = [
  http.get('/api/events-list/:id', () => {
    return HttpResponse.json<IEventsList[]>(mockedEventsList);
  }),
];
