import { Column } from '@admiral-ds/react-ui';

export const columnList: Column[] = [
  {
    name: 'idRKO',
    title: '№ Договора',
    width: '14%',
  },
  {
    name: 'typeDoc',
    title: 'Вид договтора',
    type: 'date',
    width: '14%',
  },
  {
    name: 'regNum',
    title: 'Рег. №',
    type: 'number',
    width: '14%',
  },
  {
    name: 'client',
    title: 'Клиент',
    width: '14%',
  },
  {
    name: 'bankAccount',
    title: 'Бакнвоский счёт',
    type: 'number',
    width: '14%',
  },
  {
    name: 'idServicePackages',
    title: 'Пакет услуг',
    type: 'number',
    width: '14%',
  },
  {
    name: 'curRemainder',
    title: 'Текущий остаток',
    sortable: true,
    type: 'number',
    width: '14%',
  },
];
