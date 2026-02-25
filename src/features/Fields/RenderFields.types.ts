export type RenderFieldType =
  | "text"
  | "number"
  | "date"
  | "date-range"
  | "select"
  | "multiselect"
  | "boolean"
  | "range";

export interface IOption {
  value: string;
  label: string;
}

export interface RenderField {
  id: string;
  name: string;
  type: RenderFieldType;
  label: string;
  title?: string;
  // label для Range
  additionalLabel?: string;
  errorText?: string;
  placeholder?: string;
  dimension?: "s" | "m";
  options?: IOption[];
  /**
   * Строка должна быть в формате 1d, 1m, 1y
   * где d-дни, m-месяца, y-года
   */
  dateDifference?: string;
  withTime?: boolean;
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
  includeField?: Record<string, Partial<RenderField>>;
}

export type TValue =
  | string
  | number
  | boolean
  | Date
  | { min: number; max: number }
  | string[]
  | null;
