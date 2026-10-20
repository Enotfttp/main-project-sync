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

export interface IRenderField {
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
  /**
   * Проверка значения поля. Возвращает текст ошибки или ничего, если значение подходит.
   * Второй аргумент - все значения фильтра, чтобы сверять поля между собой.
   */
  validate?: (
    value: TValue | undefined,
    values: Record<string, TValue>,
  ) => string | undefined;
  defaultValue?:
    | string
    | number
    | boolean
    | Date
    | { min: number; max: number }
    | string[];
  includeField?: Record<string, Partial<IRenderField>>;
}

export type TValue =
  | string
  | number
  | boolean
  | Date
  | { min: number; max: number }
  | string[]
  | null;
