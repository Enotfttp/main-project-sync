import {
  Option,
  Select as SelectTemplate,
  SelectProps,
} from "@admiral-ds/react-ui";

export interface ISelectOption {
  value: string;
  label: string;
}

interface ISelect extends SelectProps {
  placeholder: string;
  options: ISelectOption[];
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
        <Option value={value} key={value}>
          {label}
        </Option>
      ))}
    </SelectTemplate>
  );
};
