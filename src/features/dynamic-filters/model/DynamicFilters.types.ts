import { IRenderField, TValue } from "./RenderFields.types";

export type TFilterValue = Record<string, TValue>;

export interface FilterVariant {
  label: string;
  fields: IRenderField[];
}

interface FilterHandlers {
  onApply?: (values: TFilterValue, variant?: string) => void | Promise<void>;
  onVariantChange?: (variant: string) => void;
  onReset?: () => void;
  onCancel?: () => void;
  isShowFilters?: boolean;
  filtersValue?: TFilterValue;
  variant?: string;
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
