import { Column } from '@admiral-ds/react-ui';

export const columnList: Column[] = [
  {
    name: 'conNumber',
    title: 'Номер подключения',
    type: 'number',
    width: '16.5%',
  },
  {
    name: 'conDate',
    title: 'Дата подключения',
    type: 'date',
    width: '16.5%',
  },
  {
    name: 'srvPackages',
    title: 'Пакет услуг/ Опции ПУ',
    type: 'date',
    width: '16.5%',
  },
  {
    name: 'dateBeg',
    title: 'Дата начала',
    type: 'date',
    width: '16.5%',
  },
  {
    name: 'dateEnd',
    title: 'Дата окончания',
    sortable: true,
    type: 'date',
    width: '16.5%',
  },
  {
    name: 'dateClose',
    title: 'Дата прекращения действия',
    sortable: true,
    type: 'date',
    width: '16.5%',
  },
];
