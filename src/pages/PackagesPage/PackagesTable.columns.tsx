import {Column} from "@admiral-ds/react-ui";

export const columnList: Column[] = [
  {
    name: 'comStatusPrd',
    title: 'Состояние',
    width: '11%',
  },
  {
    name: 'orderType',
    title: 'Вид заяления',
    type: 'date',
    width: '11%'
  },
  {
    name: 'dateReg',
    title: 'Дата регистрации',
    type: 'date',
    width: '11%',
  },
  {
    name: 'dateExec',
    title: 'Дата исполнения',
    type: 'date',
    width: '11%',
  },
  {
    name: 'datePay',
    title: 'Дата оплаты комиссии',
    type: 'date',
    width: '11%',
  },
  {
    name: 'ctbCloseRKO',
    title: 'Пакет услуг',
    type: 'number',
    width: '11%',
  },
  {
    name: 'bankAccount',
    title: 'Текущий остаток',
    sortable: true,
    type: 'number',
    width: '11%',
  },
  {
    name: 'ctbSumComiss',
    title: 'Сумма комиссии по заявлению',
    sortable: true,
    type: 'number',
    width: '11%',
  },
  {
    name: 'curRemainder',
    title: 'Текущий остаток',
    sortable: true,
    type: 'number',
    width: '11%',
  },
];
