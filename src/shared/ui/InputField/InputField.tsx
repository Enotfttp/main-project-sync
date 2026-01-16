import { InputField, InputFieldProps } from "@admiral-ds/react-ui";
import React, { ChangeEvent } from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = Omit<FieldProps<string> & InputFieldProps, "children"> & {
  name: string;
  label?: string;
  maxLength?: number;
  multiline?: boolean;
  width?: string;
};

export const InputFieldUI = ({ maxLength = 255, ...props }: TProps) => {
  return (
    <Field {...props} component="input">
      {({ input, meta }) => {
        const handleChange = ({
          currentTarget: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          // Ограничиваем ввод, если указан maxLength (admiral-ds предупреждает, но не ограничивает)
          if (value.length === maxLength + 1) {
            return;
          }

          input.onChange(value);
        };

        return (
          <InputField
            {...input}
            {...props}
            onChange={handleChange}
            status={meta.touched && meta.error && "error"}
            extraText={meta.touched && (meta.error || "")}
          />
        );
      }}
    </Field>
  );
};
