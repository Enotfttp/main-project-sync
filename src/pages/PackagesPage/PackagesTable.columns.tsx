import { Column } from '@admiral-ds/react-ui';

export const columnList: Column[] = [
  {
    name: 'comStatusPrd',
    title: 'Состояние',
    width: '9%',
  },
  {
    name: 'orderType',
    title: 'Вид заяления',
    type: 'date',
    width: '9%',
  },
  {
    name: 'dateReg',
    title: 'Дата регистрации',
    type: 'date',
    width: '9%',
  },
  {
    name: 'dateExec',
    title: 'Дата исполнения',
    type: 'date',
    width: '9%',
  },
  {
    name: 'datePay',
    title: 'Дата оплаты комиссии',
    type: 'date',
    width: '9%',
  },
  {
    name: 'ctbCloseRKO',
    title: 'Перед закрытием РКО',
    type: 'number',
    width: '9%',
  },
  {
    name: 'servPackages',
    title: 'Пакет услуг',
    sortable: true,
    type: 'number',
    width: '9%',
  },
  {
    name: 'newServPackages',
    title: 'Новый пакет услуг',
    sortable: true,
    type: 'number',
    width: '9%',
  },
  {
    name: 'bankAccount',
    title: 'Текущий остаток',
    sortable: true,
    type: 'number',
    width: '9%',
  },
  {
    name: 'ctbSumComiss',
    title: 'Сумма комиссии по заявлению',
    sortable: true,
    type: 'number',
    width: '9%',
  },
  {
    name: 'curRemainder',
    title: 'Текущий остаток',
    sortable: true,
    type: 'number',
    width: '9%',
  },
];
