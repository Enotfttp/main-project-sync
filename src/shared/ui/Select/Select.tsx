import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ThemeProvider } from 'styled-components';
import { Select as SelectTemplate, LIGHT_THEME, Option, SelectProps } from '@admiral-ds/react-ui';
import { ISearchWithFilter } from '@features/SearchWithFilter/SearchWithFilter.types';

interface ISelect extends SelectProps {
  placeholder: string;
  options: ISearchWithFilter[];
  setCurOption: (value: string | Array<string>) => void;
}

export const Select = ({ placeholder = '', options, setCurOption, ...props }: ISelect) => {
  const clearButtonProps = { 'data-testid': 'selectClearButton' };
  const openButtonProps = { 'data-testid': 'selectOpenButton' };
  const [selectValue, setSelectValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value);

  const handleSelectedChange = (value: string | Array<string>) => {
    setCurOption(value);
  };

  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <SelectTemplate
        {...props}
        value={selectValue}
        onChange={onChange}
        onSelectedChange={handleSelectedChange}
        placeholder={placeholder}
        dropContainerClassName="dropContainerClass"
        clearButtonPropsConfig={() => clearButtonProps}
        openButtonPropsConfig={() => openButtonProps}
      >
        {options.map(({ key, value }) => (
          <Option value={key} key={key}>
            {value}
          </Option>
        ))}
      </SelectTemplate>
    </ThemeProvider>
  );
};
