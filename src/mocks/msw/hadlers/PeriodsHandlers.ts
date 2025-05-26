import { HttpResponse, http } from 'msw';
import { IPeriodsList } from '@entities/periods';
import { TFiltersBodyMSW } from '@mocks/msw/types/filters.types.ts';

const mockedPeriodsList: IPeriodsList[] = [
  {
    id: '1',
    serviceId: '1',
    dateBegin: '07.04.2025',
    dateEnd: '30.04.2025',
    datePayBeg: '07.04.2025',
    datePayEnd: '31.04.2025',
    datePayFact: '31.04.2025',
    status: 'Неоплачено',
    chargeAmount: '1000',
    additionalChargeAmount: '2000',
    amountAccountRequirements: '4000',
    sumPay: '2000',
    sumInc: '20000',
    sumDbp: '10000',
    paymentBehavior: 'Пени',
    paymentPriorities: '40',
    orderMeaning: 'Оплаты услуги',
  },
  {
    id: '2',
    serviceId: '1',
    dateBegin: '10.04.2025',
    dateEnd: '30.04.2025',
    datePayBeg: '10.04.2025',
    datePayEnd: '31.04.2025',
    datePayFact: '31.04.2025',
    status: 'Ожидает оплаты',
    chargeAmount: '2000',
    additionalChargeAmount: '3000',
    amountAccountRequirements: '5000',
    sumPay: '4000',
    sumInc: '30000',
    sumDbp: '15000',
    paymentBehavior: 'Пени',
    paymentPriorities: '20',
    orderMeaning: 'Оплаты услуги',
  },
  {
    id: '3',
    serviceId: '2',
    dateBegin: '20.02.2025',
    dateEnd: '30.02.2025',
    datePayBeg: '20.02.2025',
    datePayEnd: '29.02.2025',
    datePayFact: '29.02.2025',
    status: 'Ожидает оплаты',
    chargeAmount: '500',
    additionalChargeAmount: '1000',
    amountAccountRequirements: '3000',
    sumPay: '200',
    sumInc: '25000',
    sumDbp: '5000',
    paymentBehavior: 'Пени',
    paymentPriorities: '90',
    orderMeaning: 'Оплаты услуги',
  },
  {
    id: '4',
    serviceId: '1',
    dateBegin: '20.03.2025',
    dateEnd: '30.03.2025',
    datePayBeg: '20.03.2025',
    datePayEnd: '31.03.2025',
    datePayFact: '31.03.2025',
    status: 'Оплачено',
    chargeAmount: '1000',
    additionalChargeAmount: '2000',
    amountAccountRequirements: '4000',
    sumPay: '2000',
    sumInc: '20000',
    sumDbp: '10000',
    paymentBehavior: 'Пени',
    paymentPriorities: '10',
    orderMeaning: 'Оплаты услуги',
  },
];

export const periodsHandlers = [
  http.post('/api/periods-list/:id', async ({ request }) => {
    const body = (await request.json()) as TFiltersBodyMSW<IPeriodsList>;
    const filters = body?.filters || {};
    let filtered = mockedPeriodsList;

    Object.entries(filters).forEach(([key, value]) => {
      if (value?.length) {
        filtered = filtered.filter((item) => value?.includes(item[key]));
      }
    });

    return HttpResponse.json<IPeriodsList[]>(filtered);
  }),
];
