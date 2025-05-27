import { HttpResponse, http } from 'msw';
import { IServiceConnectionList } from '@entities/serviceConnect';
import { TFiltersBodyMSW } from '@mocks/msw/types/filters.types';

const mockedServiceConnectsList = [
  {
    id: '1',
    idRKO: '1',
    idServiceContract: '1',
    idSrvPackage: '1',
    conNumber: '1',
    conDate: '28.04.2025',
    srvPackages: 'Название ПУ 1',
    srvOptions: 'Название опции 1',
    dateBeg: '28.04.2025',
    dateEnd: '28.05.2025',
    dateClose: '28.06.2025',
  },
  {
    id: '2',
    idRKO: '1',
    idServiceContract: '2',
    idSrvPackage: '2',
    conNumber: '2',
    conDate: '29.04.2025',
    srvPackages: 'Название ПУ 2',
    srvOptions: 'Название опции ПУ 2',
    dateBeg: '29.04.2025',
    dateEnd: '29.05.2025',
    dateClose: '29.06.2025',
  },
  {
    id: '3',
    idRKO: '2',
    idServiceContract: '3',
    idSrvPackage: '3',
    conNumber: '3',
    conDate: '30.04.2025',
    srvPackages: 'Название ПУ 3',
    srvOptions: 'Название опции ПУ 3',
    dateBeg: '28.04.2025',
    dateEnd: '28.05.2025',
    dateClose: '28.06.2025',
  },
];

export const serviceConnectsHandlers = [
  http.post('/api/service-connects/:idRKO', async ({ request }) => {
    const body = (await request.json()) as TFiltersBodyMSW<IServiceConnectionList>;
    const filters = body?.filters || {};
    let filtered = mockedServiceConnectsList;

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        filtered = filtered.filter((item) => value?.includes(item[key]));
      }
    });

    return HttpResponse.json<IServiceConnectionList[]>(filtered);
  }),
];
