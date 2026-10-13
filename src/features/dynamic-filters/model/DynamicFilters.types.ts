import { RenderField, TValue } from "./RenderFields.types";

export type FilterValue = Record<string, TValue>;

export interface FilterVariant {
  label: string;
  fields: RenderField[];
}

export interface FilterCancelActions {
  reset(): void;
}

interface FilterHandlers {
  onApply?: (values: FilterValue, variant?: string) => void;
  onVariantChange?: (variant: string) => void;
  onReset?: () => void;
  onCancel?: (actions: FilterCancelActions) => void;
}

export type FilterConfig = FilterHandlers &
  (
    | {
        fields: RenderField[];
        variants?: never;
      }
    | {
        fields?: never;
        variants: readonly FilterVariant[];
      }
  );
