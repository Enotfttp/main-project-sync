import { Column } from '@admiral-ds/react-ui';

export const columnList: Column[] = [
  {
    name: 'dateBegin',
    title: 'Дата начала',
    type: 'date',
    width: '6.6%',
  },
  {
    name: 'dateEnd',
    title: 'Дата окончания',
    type: 'date',
    width: '6.6%',
  },
  {
    name: 'datePayBeg',
    title: 'Дата начала оплаты',
    type: 'date',
    width: '6.6%',
  },
  {
    name: 'datePayEnd',
    title: 'Дата окончания оплаты',
    type: 'date',
    width: '6.6%',
  },
  {
    name: 'datePayFact',
    title: 'Дата оплаты',
    type: 'date',
    width: '6.6%',
  },
  {
    name: 'status',
    title: 'Состояние',
    width: '6.6%',
  },
  {
    name: 'chargeAmount',
    title: 'Сумма начисления',
    width: '6.6%',
  },
  {
    name: 'additionalChargeAmount',
    title: 'Сумма доначисления',
    width: '6.6%',
  },
  {
    name: 'amountAccountRequirements',
    title: 'Сумма с учётом требований',
    width: '6.6%',
  },
  {
    name: 'sumPay',
    title: 'Сумма оплаты',
    width: '6.6%',
  },
  {
    name: 'sumInc',
    title: 'Доход',
    width: '6.6%',
  },
  {
    name: 'sumDbp',
    title: 'ДБП',
    width: '6.6%',
  },
  {
    name: 'paymentBehavior',
    title: 'Поведение при неоплате',
    width: '6.6%',
  },
  {
    name: 'paymentPriorities',
    title: 'Приоритеты оплаты',
    width: '6.6%',
  },
  {
    name: 'orderMeaning',
    title: 'Значение поручения',
    width: '6.6%',
  },
];
