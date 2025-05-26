import { Column } from '@admiral-ds/react-ui';

export const columnList: Column[] = [
  {
    name: 'eventDate',
    title: 'Дата события',
    type: 'date',
    width: '25%',
    sortable: true,
  },
  {
    name: 'eventType',
    title: 'Вид события',
    width: '16.5%',
  },
  {
    name: 'rollbackDate',
    title: 'Дата отката события',
    type: 'date',
    width: '25%',
  },
  {
    name: 'execDate',
    title: 'Дата испольнения',
    width: '25%',
    type: 'date',
    sortable: true,
  },
];
