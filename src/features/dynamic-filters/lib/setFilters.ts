import { TFilterValue } from "../model/DynamicFilters.types";

export const handleSetFilters = (
  newFilters: TFilterValue,
  prevState?: TFilterValue,
) => ({ ...prevState, ...newFilters });
