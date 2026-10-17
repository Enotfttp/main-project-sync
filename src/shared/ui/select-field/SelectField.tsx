import { ISelectOption } from "../select/Select";
import { Option, SelectField, SelectProps } from "@admiral-ds/react-ui";
import React from "react";
import { Field, FieldProps } from "react-final-form";
import styled from "styled-components";

const StyledSelectField = styled(SelectField)`
  label {
    color: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;

type TProps = Omit<FieldProps<string> & SelectProps, "children"> & {
  label: string;
  name: string;
  multiline?: boolean;
  width?: string;
  options?: ISelectOption[];
};

export const SelectFieldUI = ({ options = [], ...props }: TProps) => {
  return (
    <Field type={props.type} data-testid="form-select-field" {...props}>
      {({ input, meta }) => {
        return (
          <StyledSelectField
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
          </StyledSelectField>
        );
      }}
    </Field>
  );
};
