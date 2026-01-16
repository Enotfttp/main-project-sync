import { CheckboxFieldProps, SliderRangeField } from "@admiral-ds/react-ui";
import React from "react";
import { Field, FieldProps } from "react-final-form";

type TProps = Omit<FieldProps<string> & CheckboxFieldProps, "children"> & {
  name: string;
  multiline?: boolean;
  width?: string;
};

export const RangeWithInput = ({ ...props }: TProps) => {
  const minValue = props?.min || 0;
  const maxValue = props?.max || 10;

  return (
    <Field type={props.type} data-testid="form-rangeInput-field" {...props}>
      {({ input }) => {
        const handleChange = (range: { str: string; num: number }[]) => {
          const rangeNumbers = range.reduce((acc, elem, index) => {
            if (index === 0) acc = { ...acc, min: elem.num };
            if (index === 1) acc = { ...acc, max: elem.num };
            return acc;
          }, {});

          input.onChange(rangeNumbers);
        };

        return (
          <SliderRangeField
            {...props}
            data-container-id="rangeInput"
            onChange={handleChange}
            defaultValue={[String(minValue), String(maxValue)]}
            minValue={minValue}
            maxValue={maxValue}
          />
        );
      }}
    </Field>
  );
};
