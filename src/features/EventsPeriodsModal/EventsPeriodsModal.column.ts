import { Column } from '@admiral-ds/react-ui';

export const columnEventsList: Column[] = [
  {
    name: 'eventDate',
    title: 'Дата регистрации',
    type: 'date',
    width: '16.5%',
    sortable: true,
  },
  {
    name: 'eventType',
    title: 'Вид события',
    width: '16.5%',
  },
  {
    name: 'execDate',
    title: 'Дата испольнения',
    width: '16.5%',
    type: 'date',
    sortable: true,
  },
  {
    name: 'docs',
    title: 'Документы',
    width: '16.5%',
  },
  {
    name: 'order',
    title: 'Основание',
    sortable: true,
    type: 'date',
    width: '16.5%',
  },
  {
    name: 'reqHist',
    title: 'История изменения реквизитов',
    sortable: true,
    type: 'date',
    width: '16.5%',
  },
];

export const columnPeriodsList: Column[] = [
  {
    name: 'serviceName',
    title: 'Пакеты услуг/ Опции ПУ',
    width: '13%',
  },
  {
    name: 'dateBegin',
    title: 'Дата начала',
    type: 'date',
    width: '13%',
  },
  {
    name: 'dateEnd',
    title: 'Дата окончания',
    type: 'date',
    width: '13%',
  },
  {
    name: 'datePayBeg',
    title: 'Дата начала оплаты',
    type: 'date',
    width: '13%',
  },
  {
    name: 'datePayEnd',
    title: 'Дата окончания оплаты',
    sortable: true,
    type: 'date',
    width: '13%',
  },
  {
    name: 'datePayFact',
    title: 'Дата оплаты фактическая',
    sortable: true,
    type: 'date',
    width: '13%',
  },
  {
    name: 'dateReg',
    title: 'Дата учёта',
    sortable: true,
    type: 'date',
    width: '13%',
  },
  {
    name: 'status',
    title: 'Состояние',
    sortable: true,
    width: '13%',
  },
  {
    name: 'sumPay',
    title: 'Сумма оплаты',
    sortable: true,
    width: '13%',
  },
  {
    name: 'bnkBaseSumPay',
    title: 'Базовая сумма оплаты',
    sortable: true,
    width: '13%',
  },
  {
    name: 'sumInc',
    title: 'Доход',
    sortable: true,
    width: '13%',
  },
  {
    name: 'sumDbp',
    title: 'ДБП',
    sortable: true,
    width: '13%',
  },
  {
    name: 'ctbSumRegDest',
    title: 'Сумма учёта требований',
    sortable: true,
    width: '13%',
  },
  {
    name: 'ctbSumRgDtAd',
    title: 'Сумма доучёта требований',
    sortable: true,
    width: '13%',
  },
  {
    name: 'docs',
    title: 'Документы оплаты',
    sortable: true,
    width: '13%',
  },
];
