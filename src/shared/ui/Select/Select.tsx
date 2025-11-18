import {
  Option,
  Select as SelectTemplate,
  SelectProps,
} from "@admiral-ds/react-ui";
import { ISearchWithFilter } from "@features/SearchWithFilter/SearchWithFilter.types";

interface ISelect extends SelectProps {
  placeholder: string;
  options: ISearchWithFilter[];
}

export const Select = ({ placeholder = "", options, ...props }: ISelect) => {
  const clearButtonProps = { "data-testid": "selectClearButton" };
  const openButtonProps = { "data-testid": "selectOpenButton" };

  return (
    <SelectTemplate
      {...props}
      placeholder={placeholder}
      dropContainerClassName="dropContainerClass"
      clearButtonPropsConfig={() => clearButtonProps}
      openButtonPropsConfig={() => openButtonProps}
    >
      {options.map(({ value, label }) => (
        <Option value={label} key={value}>
          {label}
        </Option>
      ))}
    </SelectTemplate>
  );
};
