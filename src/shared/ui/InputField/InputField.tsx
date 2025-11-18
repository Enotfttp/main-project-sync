import { InputField, InputFieldProps } from "@admiral-ds/react-ui";
import React, { ChangeEvent } from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = FieldProps<string> &
  Omit<InputFieldProps, "children"> & {
    label: string;
    maxLength?: number;
    multiline?: boolean;
    width?: string;
  };

export const InputFieldUI = ({ label, maxLength = 255, ...props }: TProps) => {
  const [isTouch, setTouch] = React.useState(false);

  return (
    <Field {...props} component="input">
      {({ input, meta }) => {
        const handleChange = ({
          currentTarget: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          setTouch(true);
          // Ограничиваем ввод, если указан maxLength (admiral-ds предупреждает, но не ограничивает)
          if (value.length === maxLength + 1) {
            return;
          }

          input.onChange(value);
        };
        return (
          <InputField
            {...input}
            label={label}
            onChange={handleChange}
            status={isTouch && meta.error && "error"}
            extraText={isTouch && (meta.error || "")}
          />
        );
      }}
    </Field>
  );
};
