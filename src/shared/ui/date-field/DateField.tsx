import { StyledDateField } from "./DateFieldUI.styled";
import { DateFieldProps } from "@admiral-ds/react-ui";
import {
  calculateMaxDate,
  DATE_RANGE_SEPARATOR,
  toDisplayDateValue,
  toIsoDateValue,
} from "@shared/lib";
import React, { useRef, useState } from "react";
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
 */
const DateInput = ({ input, meta, ...props }: TInputProps) => {
  const isRange = props.type === "date-range";
  const [maskValue, setMaskValue] = useState(() =>
    toDisplayDateValue(input.value, isRange),
  );
  // Последнее значение, которое поле само положило в форму
  const ownValue = useRef(input.value);

  // Значение формы изменили извне (сброс фильтра, новые значения фильтров)
  if (input.value !== ownValue.current) {
    ownValue.current = input.value;
    setMaskValue(toDisplayDateValue(input.value, isRange));
  }

  const handleChange = ({ currentTarget: { value } }) => {
    const isoValue = toIsoDateValue(value, isRange);

    setMaskValue(value);
    ownValue.current = isoValue ?? "";
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
    if (props.type === "date-range" && props?.dateDifference && value) {
      const [isoDateFrom, isoDateTo] = value.split(DATE_RANGE_SEPARATOR);

      const maxDate = calculateMaxDate(isoDateFrom, props.dateDifference);
      const dateTo = new Date(isoDateTo ?? "");

      if (maxDate && dateTo > maxDate) {
        return props?.errorText || "";
      }
    }
    return undefined;
  };

  return (
    <Field
      data-testid="form-date-field"
      validate={validateDateRange}
      {...props}
    >
      {({ input, meta }) => <DateInput {...props} input={input} meta={meta} />}
    </Field>
  );
};
