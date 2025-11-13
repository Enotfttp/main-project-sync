import {
  Select as SelectTemplate,
  LIGHT_THEME,
  Option,
  SelectProps,
} from "@admiral-ds/react-ui";
import { ISearchWithFilter } from "@features/SearchWithFilter/SearchWithFilter.types";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { ThemeProvider } from "styled-components";

interface ISelect extends SelectProps {
  placeholder: string;
  options: ISearchWithFilter[];
}

export const Select = ({ placeholder = "", options, ...props }: ISelect) => {
  const clearButtonProps = { "data-testid": "selectClearButton" };
  const openButtonProps = { "data-testid": "selectOpenButton" };
  const [selectValue, setSelectValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectValue(e.target.value);

  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <SelectTemplate
        {...props}
        value={selectValue}
        onChange={onChange}
        placeholder={placeholder}
        dropContainerClassName="dropContainerClass"
        clearButtonPropsConfig={() => clearButtonProps}
        openButtonPropsConfig={() => openButtonProps}
      >
        {options.map(({ value, label }) => (
          <Option value={value} key={value}>
            {label}
          </Option>
        ))}
      </SelectTemplate>
    </ThemeProvider>
  );
};
