import { Column, InputExFieldProps } from '@admiral-ds/react-ui';
import * as React from 'react';
import { useState } from 'react';
import { Search, Select } from '../index';
import { ISearchWithFilter } from './SearchWithFilter.types';
import { StyledSearchWithFilter } from './SearchWithFilter.styled';
import { StyledChip } from '@features/Search/Search.styled.ts';

interface ISearchWithFilterProps<T = Record<string, React.ReactNode | string[] | undefined>> extends InputExFieldProps {
  columnList: Column[];
  selectPlaceholder: string;
  searchPlaceholder: string;
  setFilters: (options: T) => void;
  multiple?: boolean;
}

export const SearchWithFilter = <T,>({
  columnList,
  selectPlaceholder,
  searchPlaceholder,
  multiple,
  setFilters,
  ...props
}: ISearchWithFilterProps<T>) => {
  //TODO.FIX расширить для мультеселекта
  const [curOption, setCurOption] = React.useState<string | Array<string>>('');
  const [listValue, setListValue] = useState<React.ComponentProps<typeof StyledChip>[]>([]);

  const options = columnList.reduce((acc, elem) => {
    acc.push({ key: elem.name, value: String(elem.title) });
    return acc;
  }, [] as ISearchWithFilter[]);

  React.useEffect(() => {
    if (!listValue.length) return;
    if (!Array.isArray(curOption)) {
      setFilters({ [curOption]: listValue.map((item) => item?.children) } as T);
    }
  }, [curOption, listValue, setFilters]);

  React.useEffect(() => {
    if (curOption) setListValue([]);
  }, [curOption]);

  return (
    <StyledSearchWithFilter>
      <Search listValue={listValue} setListValue={setListValue} placeholder={searchPlaceholder} {...props} />
      <Select setCurOption={setCurOption} options={options} placeholder={selectPlaceholder} multiple={multiple} />
    </StyledSearchWithFilter>
  );
};
