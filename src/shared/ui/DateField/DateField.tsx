import { DateField, DateFieldProps } from "@admiral-ds/react-ui";
import { FilterField } from "@shared/ui/Filter/Filter.types";
import { calculateMaxDate, parseDateString } from "@shared/ui/Filter/utils";
import React from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = Omit<
  FieldProps<string> & DateFieldProps & Partial<FilterField>,
  "children"
> & {
  label: string;
  name: string;
  multiline?: boolean;
  width?: string;
};

export const DateFieldUI = ({ ...props }: TProps) => {
  const validateDateRange = (value: string) => {
    if (props.type === "date-range" && props?.dateDifference && value) {
      const [dateFrom, dateTo] = value.split("-").map((s) => s?.trim());

      if (!dateFrom || !dateTo || dateTo.includes("__")) return undefined;

      const maxDate = calculateMaxDate(dateFrom, props.dateDifference);
      const parsedDateTo = parseDateString(dateTo);

      if (maxDate && parsedDateTo) {
        if (parsedDateTo > maxDate) {
          return props?.errorText || "";
        }
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
      {({ input, meta }) => {
        const handleChange = ({ currentTarget: { value } }) => {
          input.onChange(value);
        };
        return (
          <DateField
            {...input}
            {...props}
            type={props.type}
            onChange={handleChange}
            required={props?.required}
            status={meta.touched && meta.error && "error"}
            extraText={meta.touched && (meta.error || "")}
            data-testid={`form-date-${input.name}`}
          />
        );
      }}
    </Field>
  );
};
