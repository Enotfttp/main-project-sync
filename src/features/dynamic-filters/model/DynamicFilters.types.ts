import { IRenderField, TValue } from "./RenderFields.types";

export type TFilterValue = Record<string, TValue>;

export interface FilterVariant {
  label: string;
  fields: IRenderField[];
}

export interface FilterCancelActions {
  reset(): void;
}

interface FilterHandlers {
  onApply?: (values: TFilterValue, variant?: string) => void;
  onVariantChange?: (variant: string) => void;
  onReset?: () => void;
  onCancel?: () => void;
  isShowFilters?: boolean;
}

export type FilterConfig = FilterHandlers &
  (
    | {
        fields: IRenderField[];
        variants?: never;
      }
    | {
        fields?: never;
        variants: readonly FilterVariant[];
      }
  );
