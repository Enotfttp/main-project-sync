import { StyledDateField } from "./DateFieldUI.styled";
import { DateFieldProps } from "@admiral-ds/react-ui";
import {
  calculateMaxDate,
  DATE_RANGE_SEPARATOR,
  parseIsoDate,
  toDisplayDateValue,
  toIsoDateValue,
} from "@shared/lib";
import { useRef, useState } from "react";
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
 * Пока дата заполнена не полностью, в форме лежит null,
 * поэтому маска хранится в своём состоянии.
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
  const [maskValue, setMaskValue] = useState(() =>
    toDisplayDateValue(input.value, isRange),
  );
  // Последнее значение, которое поле само положило в форму
  const ownValue = useRef<string | null>(committedValue(input.value));

  const displayValue = toDisplayDateValue(input.value || "", isRange);

  // Значение формы изменили извне (сброс фильтра, новые значения фильтров)
  if (committedValue(input.value) !== ownValue.current) {
    ownValue.current = committedValue(input.value);
    setMaskValue(displayValue);
  }

  const handleChange = ({ currentTarget: { value } }) => {
    const isoValue = toIsoDateValue(value, isRange);

    setMaskValue(value);
    ownValue.current = committedValue(isoValue);
    input.onChange(isoValue);
  };

  return (
    <StyledDateField
      {...input}
      {...props}
      type={props.type}
      value={maskValue}
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
