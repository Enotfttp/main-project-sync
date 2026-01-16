import { Option, SelectField, SelectProps } from "@admiral-ds/react-ui";
import { ISearchWithFilter } from "@features/SearchWithFilter/SearchWithFilter.types";
import React from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = Omit<FieldProps<string> & SelectProps, "children"> & {
  label: string;
  name: string;
  multiline?: boolean;
  width?: string;
  options?: ISearchWithFilter[];
};

export const SelectFieldUI = ({ options = [], ...props }: TProps) => {
  return (
    <Field type={props.type} data-testid="form-select-field" {...props}>
      {({ input, meta }) => {
        return (
          <SelectField
            {...input}
            {...props}
            data-container-id="selectFieldId"
            status={meta.touched && meta.error && "error"}
            extraText={meta.touched && (meta.error || "")}
          >
            {options.map(({ value, label }) => (
              <Option value={value} key={value}>
                {label}
              </Option>
            ))}
          </SelectField>
        );
      }}
    </Field>
  );
};
