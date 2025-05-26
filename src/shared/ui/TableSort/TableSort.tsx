import * as React from 'react';
import { Table, TableRow } from '@admiral-ds/react-ui';
import type { TableProps, Column } from '@admiral-ds/react-ui';
import { useIsFetching } from '@tanstack/react-query';
import { Loader } from '@shared/index';

const StrToTime = (str: string) => {
  const res = str.split('.').reverse().join('-');
  return new Date(res).getTime();
};

const MAX_SORT_LEVEL = 2;

type SortColumn = { [key: string]: { sort: 'asc' | 'desc'; type?: string } };

export const TableSort = ({ queryKey, ...props }: TableProps & { queryKey: string }) => {
  const isFetching = useIsFetching({ queryKey: [queryKey] });
  const [rows, setRows] = React.useState([...props.rowList]);
  const [cols, setCols] = React.useState([...props.columnList]);
  const [sortLevel, setSortLevel] = React.useState<number>(0);

  const calcSortOrder = (columns: Array<Column>): Array<Column> => {
    const newCols = [...columns];

    const sortColumns = [...newCols]
      .filter((column) => !!column.sort)
      .sort((a, b) => {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });

    sortColumns.forEach((col, index) => {
      if (index < MAX_SORT_LEVEL) {
        col.sortOrder = index + 1;
      } else {
        col.sortOrder = undefined;
        col.sort = undefined;
      }
    });
    setSortLevel(sortColumns.length);

    return newCols;
  };

  const getOrderedSortColumns = (columns: Array<Column>): SortColumn => {
    const sortColumns = columns
      .filter((column) => !!column.sort)
      .sort((a, b) => {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });

    return sortColumns.reduce((acc: SortColumn, { name, sort, type }: Column) => {
      if (sort) acc[name] = { sort, type };
      return acc;
    }, {});
  };

  const handleSort = ({ name, sort }: { name: string; sort: 'asc' | 'desc' | 'initial' }) => {
    if (sort === 'initial') {
      const newCols = [...cols].map((col) => (col.name === name ? { ...col, sort: undefined, sortOrder: undefined } : { ...col }));
      setCols(calcSortOrder(newCols));
    } else {
      if (sort === 'asc') {
        if (sortLevel === MAX_SORT_LEVEL) {
          const firstOrderCol = cols.find((col) => col.sortOrder === 1);
          if (firstOrderCol) {
            if (firstOrderCol.sort) firstOrderCol.sort = undefined;
            if (firstOrderCol.sortOrder) firstOrderCol.sortOrder = undefined;
          }
        }

        const newCols = [...cols].map((col) => {
          const newCol = { ...col };

          if (col.name === name) {
            newCol.sort = 'asc';
            newCol.sortOrder = sortLevel + 1;
          }

          return newCol;
        });
        setCols(calcSortOrder(newCols));
      } else {
        setCols([...cols].map((col) => (col.name === name ? { ...col, sort: 'desc' } : { ...col })));
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const compare = (a: any, b: any, colName: string, sort: 'asc' | 'desc', colType?: string) => {
    if (sort === 'asc') {
      switch (colType) {
        case 'date':
          return StrToTime(a[colName]) - StrToTime(b[colName]);
        case 'number':
        default:
          return Number(a[colName].replace(/\D/g, '')) - Number(b[colName].replace(/\D/g, ''));
      }
    } else {
      switch (colType) {
        case 'date':
          return StrToTime(b[colName]) - StrToTime(a[colName]);
        case 'number':
        default:
          return Number(b[colName].replace(/\D/g, '')) - Number(a[colName].replace(/\D/g, ''));
      }
    }
  };

  React.useEffect(() => {
    const sortColumns = getOrderedSortColumns(cols);

    if (Object.keys(sortColumns).length === 0) {
      setRows([...props.rowList]);
    } else {
      const names = Object.keys(sortColumns);
      const newRows = [...rows].sort((a: TableRow, b: TableRow) => {
        const result = compare(a, b, names[0], sortColumns[names[0]].sort, sortColumns[names[0]].type);

        if (!result && names.length > 1) {
          return compare(a, b, names[1], sortColumns[names[1]].sort, sortColumns[names[1]].type);
        } else {
          return result;
        }
      });

      setRows(newRows);
    }
  }, [props.rowList, cols]);

  const handleResize = ({ name, width }: { name: string; width: string }) => {
    const newCols = cols.map((col) => (col.name === name ? { ...col, width } : col));
    setCols(newCols);
  };

  if (isFetching) {
    return <Loader />;
  }

  return <Table {...props} onSortChange={handleSort} onColumnResize={handleResize} />;
};
