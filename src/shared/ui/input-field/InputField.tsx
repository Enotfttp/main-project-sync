import {
  StyledInputField,
  StyledNumberInputField,
} from "./InputFieldUI.styled";
import { maskUuid, UUID_LENGTH } from "./uuidMask";
import { InputFieldProps } from "@admiral-ds/react-ui";
import { ChangeEvent } from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = Omit<
  FieldProps<string> & InputFieldProps,
  "children" | "type"
> & {
  name: string;
  label?: string;
  maxLength?: number;
  multiline?: boolean;
  width?: string;
  precision?: number;
  type?: InputFieldProps["type"] | "uuid";
};

const toLimit = (value?: string | number) =>
  value === undefined || value === "" ? undefined : Number(value);

export const InputFieldUI = ({
  maxLength = 255,
  type,
  min,
  max,
  step,
  precision = 2,
  ...props
}: TProps) => {
  const isNumber = type === "number";
  const isUuid = type === "uuid";

  return (
    <Field {...props} component="input">
      {({ input, meta }) => {
        const handleChange = ({
          currentTarget: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          const limit = isUuid ? UUID_LENGTH : maxLength;

          // Ограничиваем ввод, если указан maxLength (admiral-ds предупреждает, но не ограничивает)
          if (value.length === limit + 1) return;

          input.onChange(value);
        };

        const showError = (meta.touched || meta.submitFailed) && meta.error;
        const status = showError && "error";
        const extraText = showError && (meta.error || "");

        if (isNumber) {
          return (
            <StyledNumberInputField
              {...input}
              {...props}
              precision={precision}
              thousand=""
              displayPlusMinusIcons={false}
              minValue={toLimit(min) ?? 0}
              maxValue={toLimit(max)}
              step={toLimit(step)}
              maxLength={maxLength}
              onChange={handleChange}
              status={status}
              extraText={extraText}
            />
          );
        }

        return (
          <StyledInputField
            {...input}
            {...props}
            type={isUuid ? "text" : type}
            maxLength={isUuid ? UUID_LENGTH : maxLength}
            handleInput={isUuid ? maskUuid : undefined}
            onChange={handleChange}
            status={status}
            extraText={extraText}
          />
        );
      }}
    </Field>
  );
};
