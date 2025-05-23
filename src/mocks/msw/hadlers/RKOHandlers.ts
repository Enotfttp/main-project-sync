import { HttpResponse, http } from 'msw';
import { IRKOList } from '@entities/rko';
import { TFiltersBodyMSW } from '@mocks/msw/types/filters.types.ts';

const mockedRKOList = [
  {
    id: '1',
    idRKO: '1',
    typeDoc: 'Пример 1',
    regNum: '1234567890',
    client: 'МБАУМ ООО',
    bankAccount: '001232131231',
    idServicePackages: '1234567890',
    curRemainder: '3000',
  },
  {
    id: '2',
    idRKO: '2',
    typeDoc: 'Пример 2',
    regNum: '2222222222',
    client: 'МБАУМ ООО',
    bankAccount: '123123123',
    idServicePackages: '0987654321',
    curRemainder: '1000',
  },
];

export const RKOHandlers = [
  http.post('/api/rko-list', async ({ request }) => {
    const body = (await request.json()) as TFiltersBodyMSW<IRKOList>;
    const filters = body?.filters || {};
    let filtered = mockedRKOList;

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        filtered = filtered.filter((item) => item[key]?.includes(value));
      }
    });

    return HttpResponse.json<IRKOList[]>(filtered);
  }),
];
