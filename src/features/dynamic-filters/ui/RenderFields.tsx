import { IRenderField } from "../model/RenderFields.types";
import {
  CheckboxFieldUI,
  DateFieldUI,
  InputFieldUI,
  RangeWithInput,
  SelectFieldUI,
} from "@shared/ui";
import React from "react";

export const renderField = (field: IRenderField) => {
  const { validate: _validate, ...inputProps } = field;

  switch (field?.type) {
    case "number":
    case "text":
      return <InputFieldUI {...inputProps} dimension="m" />;

    case "date":
    case "date-range":
      return <DateFieldUI {...inputProps} dimension="m" />;

    case "select":
    case "multiselect":
      return (
        <SelectFieldUI
          {...field}
          multiple={field.type === "multiselect"}
          dimension="m"
        />
      );

    case "boolean":
      return <CheckboxFieldUI {...inputProps} dimension="m" />;

    case "range": {
      return <RangeWithInput {...inputProps} dimension="m" />;
    }

    default:
      return null;
  }
};
