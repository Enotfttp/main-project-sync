export type FilterFieldType =
  | "text"
  | "number"
  | "date"
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
  placeholder?: string;
  options?: FilterOption[];
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

export interface FilterValue {
  fieldId: string;
  value:
    | string
    | number
    | boolean
    | Date
    | { min: number; max: number }
    | string[]
    | null;
  operator?: string;
}

export interface FilterConfig {
  fields: FilterField[];
  values: FilterValue[];
  onChange: (values: FilterValue[]) => void;
  onApply?: () => void;
  onReset?: () => void;
}

export interface TableRow {
  id: string;
  name: string;
  value: number;
  date: string;
  status: "completed" | "danger" | "pending";
}
