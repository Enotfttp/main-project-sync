import { Column } from '@admiral-ds/react-ui';

export const columnList: Column[] = [
  {
    name: 'conNumber',
    title: 'Номер подключения',
    type: 'number',
    width: '14.2%',
  },
  {
    name: 'conDate',
    title: 'Дата подключения',
    type: 'date',
    width: '14.2%',
  },
  {
    name: 'srvPackages',
    title: 'Пакет услуг',
    width: '14.2%',
  },
  {
    name: 'srvOptions',
    title: 'Опции ПУ',
    width: '14.2%',
  },
  {
    name: 'dateBeg',
    title: 'Дата начала',
    type: 'date',
    width: '14.2%',
  },
  {
    name: 'dateEnd',
    title: 'Дата окончания',
    sortable: true,
    type: 'date',
    width: '14.2%',
  },
  {
    name: 'dateClose',
    title: 'Дата прекращения действия',
    sortable: true,
    type: 'date',
    width: '14.2%',
  },
];
