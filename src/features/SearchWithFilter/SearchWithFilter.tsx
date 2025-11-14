import { StyledSearchWithFilter } from "./SearchWithFilter.styled";
import { ISearchWithFilter } from "./SearchWithFilter.types";
import { Column, InputExFieldProps } from "@admiral-ds/react-ui";
import { usePrevious } from "@shared/common";
import { Search, Select } from "@shared/ui";
import { StyledChip } from "@shared/ui/Search/Search.styled";
import { useState } from "react";
import * as React from "react";

interface ISearchWithFilterProps<
  T = Record<string, React.ReactNode | string[] | undefined>,
> extends InputExFieldProps {
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
  const [curOption, setCurOption] = React.useState<string | Array<string>>("");
  const [listValue, setListValue] = useState<
    React.ComponentProps<typeof StyledChip>[]
  >([]);
  const previousOption = usePrevious(curOption);

  const options = columnList.reduce((acc, elem) => {
    acc.push({ value: elem.name, label: String(elem.title) });
    return acc;
  }, [] as ISearchWithFilter[]);

  React.useEffect(() => {
    // if (!listValue.length) return;
    if (curOption && !Array.isArray(curOption)) {
      setFilters({ [curOption]: listValue.map((item) => item?.children) } as T);
    }
  }, [curOption, listValue, setFilters]);

  React.useEffect(() => {
    if (previousOption) setListValue([]);
  }, [previousOption]);

  return (
    <StyledSearchWithFilter>
      <Search
        listValue={listValue}
        setListValue={setListValue}
        placeholder={searchPlaceholder}
        {...props}
      />
      <Select
        onSelectedChange={(val) => setCurOption(val)}
        options={options}
        placeholder={selectPlaceholder}
        multiple={multiple}
      />
    </StyledSearchWithFilter>
  );
};
