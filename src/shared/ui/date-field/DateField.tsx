import { StyledDateField } from "./DateFieldUI.styled";
import { DateFieldProps } from "@admiral-ds/react-ui";
import {
  calculateMaxDate,
  DATE_RANGE_SEPARATOR,
  parseIsoDate,
  toDisplayDateValue,
  toIsoDateValue,
} from "@shared/lib";
import { useLayoutEffect, useRef } from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";

type TProps = Omit<FieldProps<string> & DateFieldProps, "children"> & {
  label: string;
  name: string;
  multiline?: boolean;
  width?: string;
  dateDifference?: string;
  errorText?: string;
};

type TInputProps = TProps & Pick<FieldRenderProps<string>, "input" | "meta">;

/**
 * Поле ввода даты показывает дату по маске dd.mm.yyyy,
 * а в значении формы хранит её в формате iso yyyy-mm-dd.
 * Пока дата заполнена не полностью, в форме лежит null.
 * Маска остаётся неуправляемой: запись value из React сбрасывает курсор,
 * и следующая цифра попадает не в ту ячейку.
 * Пустая строка и null при сверке считаются одним значением.
 */
const committedValue = (value?: string | null) => value || null;

const DateInput = ({
  input,
  meta,
  dateDifference: _dateDifference,
  errorText: _errorText,
  ...props
}: TInputProps) => {
  const isRange = props.type === "date-range";
  const fieldRef = useRef<HTMLInputElement>(null);
  // Последнее значение, которое поле само положило в форму
  const ownValue = useRef<string | null>(committedValue(input.value));

  useLayoutEffect(() => {
    const node = fieldRef.current;
    if (!node || committedValue(input.value) === ownValue.current) return;

    ownValue.current = committedValue(input.value);
    const display = toDisplayDateValue(input.value || "", isRange);
    if (node.value !== display) node.value = display;
  }, [input.value, isRange]);

  const handleChange = ({
    currentTarget: { value },
  }: {
    currentTarget: { value: string };
  }) => {
    const isoValue = toIsoDateValue(value, isRange);

    ownValue.current = committedValue(isoValue);
    input.onChange(isoValue);
  };

  const { value: _formValue, onChange: _formOnChange, ...fieldProps } = input;

  return (
    <StyledDateField
      {...fieldProps}
      {...props}
      ref={fieldRef}
      type={props.type}
      defaultValue={toDisplayDateValue(input.value || "", isRange)}
      onChange={handleChange}
      required={props?.required}
      status={meta.touched && meta.error && "error"}
      extraText={meta.touched && (meta.error || "")}
      data-testid={`form-date-${input.name}`}
    />
  );
};

export const DateFieldUI = ({ ...props }: TProps) => {
  const validateDateRange = (value?: string | null) => {
    if (props.type !== "date-range" || !props.dateDifference || !value) return;

    const [isoDateFrom, isoDateTo] = value.split(DATE_RANGE_SEPARATOR);
    const maxDate = calculateMaxDate(isoDateFrom, props.dateDifference);
    const dateTo = parseIsoDate(isoDateTo);

    if (maxDate && dateTo && dateTo > maxDate) return props.errorText;
  };

  return (
    <Field
      {...props}
      data-testid="form-date-field"
      validate={validateDateRange}
    >
      {({ input, meta }) => <DateInput {...props} input={input} meta={meta} />}
    </Field>
  );
};
