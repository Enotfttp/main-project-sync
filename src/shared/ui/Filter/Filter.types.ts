export type FilterFieldType =
  | "text"
  | "number"
  | "date"
  | "date-range"
  | "select"
  | "multiselect"
  | "boolean"
  | "range";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  id: string;
  name: string;
  type: FilterFieldType;
  label: string;
  // label для Range
  additionalLabel?: string;
  errorText?: string;
  placeholder?: string;
  options?: FilterOption[];
  /**
   * Строка должна быть в формате 1d, 1m, 1y
   * где d-дни, m-месяца, y-года
   */
  dateDifference?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  defaultValue?:
    | string
    | number
    | boolean
    | Date
    | { min: number; max: number }
    | string[];
}

export type TValue =
  | string
  | number
  | boolean
  | Date
  | { min: number; max: number }
  | string[]
  | null;

export type FilterValue = Record<string, TValue>;

export interface FilterConfig {
  fields: FilterField[];
  onApply?: (values: FilterValue) => void;
  onReset?: () => void;
}

export interface TableRow {
  id: string;
  name: string;
  value: number;
  date: string;
  status: "completed" | "danger" | "pending";
}
