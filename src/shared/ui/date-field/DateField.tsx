import { CalendarAnchor, StyledDateField } from "./DateFieldUI.styled";
import { DateFieldProps, DropdownProvider } from "@admiral-ds/react-ui";
import { calculateMaxDate, parseStringToDate } from "@shared/lib";
import React, { RefObject, useRef } from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = Omit<FieldProps<string> & DateFieldProps, "children"> & {
  label: string;
  name: string;
  multiline?: boolean;
  width?: string;
  dateDifference?: string;
  errorText?: string;
};

export const DateFieldUI = ({ ...props }: TProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const validateDateRange = (value: string) => {
    if (props.type === "date-range" && props?.dateDifference && value) {
      const [dateFrom, dateTo] = value.split("-").map((s) => s?.trim());

      if (!dateFrom || !dateTo || dateTo.includes("__")) return undefined;

      const maxDate = calculateMaxDate(dateFrom, props.dateDifference);
      const parsedDateTo = parseStringToDate(dateTo);

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
          <DropdownProvider
            rootRef={calendarRef as unknown as RefObject<HTMLElement>}
          >
            <CalendarAnchor ref={calendarRef}>
              <StyledDateField
                {...input}
                {...props}
                alignDropdown="flex-end"
                dropdownContaierStyle={{ marginLeft: "auto" }}
                type={props.type}
                onChange={handleChange}
                required={props?.required}
                status={meta.touched && meta.error && "error"}
                extraText={meta.touched && (meta.error || "")}
                data-testid={`form-date-${input.name}`}
              />
            </CalendarAnchor>
          </DropdownProvider>
        );
      }}
    </Field>
  );
};
