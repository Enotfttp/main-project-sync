import { CheckboxField, CheckboxFieldProps } from "@admiral-ds/react-ui";
import React from "react";
import { Field, FieldProps } from "react-final-form";
import styled from "styled-components";

const StyledCheckboxField = styled(CheckboxField)`
  label {
    color: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;

type TProps = Omit<FieldProps<string> & CheckboxFieldProps, "children"> & {
  name: string;
  multiline?: boolean;
  width?: string;
};

export const CheckboxFieldUI = ({ ...props }: TProps) => {
  return (
    <Field type={props.type} data-testid="form-checkbox-field" {...props}>
      {({ input, meta }) => {
        return (
          <StyledCheckboxField
            {...input}
            {...props}
            error={meta.touched && meta.error}
            extraText={meta.touched && (meta.error || "")}
            data-testid={`form-checkbox-${input.name}`}
          >
            props?.label
          </StyledCheckboxField>
        );
      }}
    </Field>
  );
};
