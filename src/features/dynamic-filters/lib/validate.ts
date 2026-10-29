import { TFilterValue } from "../model/DynamicFilters.types";
import { IRenderField } from "../model/RenderFields.types";
import { required } from "@shared/lib";

export const validate = (values: TFilterValue, fields: IRenderField[]) => {
  const errors: Partial<IRenderField> = {};

  fields.forEach((field) => {
    const value = values[field.name];

    if (field?.required) {
      const message = required(value);
      if (message) {
        errors[field.name] = field.errorText || message;
        return;
      }
    }

    const customError = field.validate?.(value, values);
    if (customError) {
      errors[field.name] = customError;
    }
  });

  return errors;
};
