import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ThemeProvider } from 'styled-components';
import {Select as SelectTemplate, LIGHT_THEME, Option,  SelectProps} from '@admiral-ds/react-ui';

interface ISelect extends SelectProps{
    placeholder:string,
    options:{key:string, value:string}[],
}


export const Select = ({
  placeholder = '',
  options,
  ...props
}: ISelect) => {
  const clearButtonProps = { 'data-testid': 'selectClearButton' };
  const openButtonProps = { 'data-testid': 'selectOpenButton' };
  const [selectValue, setSelectValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value);

  const handleSelectedChange = (value: string | Array<string>) => {

    console.log(value);
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
        {options.map(({key, value})=>(
          <Option value={value} key={key}>{value}</Option>
        ))}
      </SelectTemplate>
    </ThemeProvider>
  );
};
