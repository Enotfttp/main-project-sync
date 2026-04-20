import { RenderField, TValue } from "@features/Fields/RenderFields.types";

export type FilterValue = Record<string, TValue>;

export interface FilterConfig {
  fields: RenderField[];
  onApply?: (values: FilterValue) => void;
  onReset?: () => void;
  isVisibleAdditionalBlock?: boolean;
}
