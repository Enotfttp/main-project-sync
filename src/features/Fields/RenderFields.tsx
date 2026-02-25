import { RenderField } from "./RenderFields.types";
import {
  CheckboxFieldUI,
  DateFieldUI,
  InputFieldUI,
  RangeWithInput,
  SelectFieldUI,
} from "@shared/ui";
import React from "react";

export const renderField = (field: RenderField) => {
  switch (field?.type) {
    case "number":
    case "text":
      return <InputFieldUI {...field} dimension="m" />;

    case "date":
    case "date-range":
      return <DateFieldUI {...field} dimension="m" />;

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
      return <CheckboxFieldUI {...field} dimension="m" />;

    case "range": {
      return <RangeWithInput {...field} dimension="m" />;
    }

    default:
      return null;
  }
};
