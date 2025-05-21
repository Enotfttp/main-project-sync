import { HttpResponse, http } from 'msw';
import { IPeriodsList } from '@entities/periods';

const mockedPeriodsList1 = [
  {
    id: '1',
    serviceName: 'Пакет услуг "Самое важное 1',
    dateBegin: '07.04.2025',
    dateEnd: '30.04.2025',
    datePayBeg: '07.04.2025',
    datePayEnd: '31.04.2025',
    datePayFact: '',
    dateReg: '',
    status: 'Действует',
    sumPay: '2000',
    bnkBaseSumPay: '',
    sumInc: '',
    sumDbp: '',
    ctbSumRegDest: '4000',
    ctbSumRgDtAd: '',
    docs: 'Документы 1',
  },
  {
    id: '2',
    serviceName: 'Пакет услуг "Самое важное 2',
    dateBegin: '10.04.2025',
    dateEnd: '30.04.2025',
    datePayBeg: '10.04.2025',
    datePayEnd: '31.04.2025',
    datePayFact: '',
    dateReg: '',
    status: 'Действует',
    sumPay: '1500',
    bnkBaseSumPay: '',
    sumInc: '',
    sumDbp: '',
    ctbSumRegDest: '3000',
    ctbSumRgDtAd: '',
    docs: 'Документы 2',
  },
];

const mockedPeriodsList2 = [
  {
    id: '3',
    serviceName: 'Пакет услуг "Не самое важное 1',
    dateBegin: '20.02.2025',
    dateEnd: '30.02.2025',
    datePayBeg: '20.02.2025',
    datePayEnd: '29.02.2025',
    datePayFact: '',
    dateReg: '',
    status: 'Не действует',
    sumPay: '15000',
    bnkBaseSumPay: '',
    sumInc: '',
    sumDbp: '',
    ctbSumRegDest: '40000',
    ctbSumRgDtAd: '',
    docs: 'Документы 3',
  },
  {
    id: '4',
    serviceName: 'Пакет услуг "Не самое важное 2',
    dateBegin: '20.03.2025',
    dateEnd: '30.03.2025',
    datePayBeg: '20.03.2025',
    datePayEnd: '31.03.2025',
    datePayFact: '',
    dateReg: '',
    status: 'Не действует',
    sumPay: '500',
    bnkBaseSumPay: '',
    sumInc: '',
    sumDbp: '',
    ctbSumRegDest: '10000',
    ctbSumRgDtAd: '',
    docs: 'Документы 4',
  },
];

export const periodsHandlers = [
  http.get('/api/periods-list/:id', ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json<IPeriodsList[]>(mockedPeriodsList1);
    }
    return HttpResponse.json<IPeriodsList[]>(mockedPeriodsList2);
  }),
];
