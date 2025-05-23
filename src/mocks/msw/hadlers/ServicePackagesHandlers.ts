import { HttpResponse, http } from 'msw';
import { IServicePackageList } from '@entities/servicePackage';
import { TFiltersBodyMSW } from '@mocks/msw/types/filters.types';

const mockedServicePackagesList = [
  {
    id: '1',
    idRKO: '1',
    idServiceConnect: '1',
    idServicePackages: '1',
    idServiceOrder: '1',
    idNewServicePackages: '1',
    comStatusPrd: 'Пойдёт',
    orderType: 'Пример типа',
    dateReg: '24.05.25',
    dateExec: '24.06.25',
    datePay: '22.06.25',
    idFolderPay: '21',
    ctbCloseRKO: 'Да',
    servPackages: 'Текущий ПУ 1',
    newServPackages: 'Новый ПУ 1',
    bankAccount: '001232131231',
    ctbSumComiss: '100',
    curRemainder: '3000',
  },
  {
    id: '2',
    idRKO: '1',
    idServiceConnect: '1',
    idServicePackages: '1',
    idServiceOrder: '1',
    idNewServicePackages: '1',
    comStatusPrd: 'Пойдёт',
    orderType: 'Пример типа',
    dateReg: '24.05.25',
    dateExec: '24.06.25',
    datePay: '22.06.25',
    idFolderPay: '21',
    ctbCloseRKO: 'Да',
    servPackages: 'Текущий ПУ 2',
    newServPackages: 'Новый ПУ 2',
    bankAccount: '001232131231',
    ctbSumComiss: '100',
    curRemainder: '3000',
  },
  {
    id: '3',
    idRKO: '2',
    idServiceConnect: '1',
    idServicePackages: '1',
    idServiceOrder: '1',
    idNewServicePackages: '1',
    comStatusPrd: 'Пойдёт',
    orderType: 'Пример типа',
    dateReg: '24.05.25',
    dateExec: '24.06.25',
    datePay: '22.06.25',
    idFolderPay: '21',
    ctbCloseRKO: 'Да',
    servPackages: 'Текущий ПУ 2',
    newServPackages: 'Новый ПУ 2',
    bankAccount: '001232131231',
    ctbSumComiss: '100',
    curRemainder: '4000',
  },
];

export const servicePackagesHandlers = [
  http.post('/api/service-packages/:idRKO', async ({ request }) => {
    const body = (await request.json()) as TFiltersBodyMSW<IServicePackageList>;
    const filters = body?.filters || {};
    let filtered = mockedServicePackagesList;

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        filtered = filtered.filter((item) => item[key]?.includes(value));
      }
    });

    return HttpResponse.json<IServicePackageList[]>(filtered);
  }),
];
