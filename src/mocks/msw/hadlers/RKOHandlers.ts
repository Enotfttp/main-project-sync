import { HttpResponse, http } from 'msw';
import { IRKOList } from '@entities/rko';
import { TFiltersBodyMSW } from '@mocks/msw/types/filters.types.ts';

const mockedRKOList = [
  {
    id: '1',
    client: 'МБАУМ ООО',
    bankAccount: '001232131231',
  },
  {
    id: '2',
    client: 'МБАУМ ООО',
    bankAccount: '123123123',
  },
];

export const RKOHandlers = [
  http.post('/api/rko-list', async ({ request }) => {
    const body = (await request.json()) as TFiltersBodyMSW<IRKOList>;
    const filters = body?.filters || {};
    let filtered = mockedRKOList;

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        filtered = filtered.filter((item) => value?.includes(item[key]));
      }
    });

    return HttpResponse.json<IRKOList[]>(filtered);
  }),
];
