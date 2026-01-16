import { CheckboxField, CheckboxFieldProps } from "@admiral-ds/react-ui";
import React from "react";
import { Field, FieldProps } from "react-final-form";

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
          <CheckboxField
            {...input}
            {...props}
            error={meta.touched && meta.error}
            extraText={meta.touched && (meta.error || "")}
            data-testid={`form-checkbox-${input.name}`}
          >
            props?.label
          </CheckboxField>
        );
      }}
    </Field>
  );
};
