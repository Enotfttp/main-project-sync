import { FilterVariant } from "../model/DynamicFilters.types";
import { IRenderField } from "../model/RenderFields.types";

export const getVariantFields = (
  variants: readonly FilterVariant[],
  variant?: string,
): IRenderField[] => {
  const matched = variants.find((item) => item.label === variant);

  return (matched ?? variants[0]).fields;
};
