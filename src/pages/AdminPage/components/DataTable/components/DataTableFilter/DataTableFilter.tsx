import { filterFields } from "./DataTableFilter.filter";
import { Filter } from "@shared/ui";
import { FilterValue, TableRow } from "@shared/ui/Filter/Filter.types.ts";
import { useFilter } from "@shared/ui/Filter/useFilter";
import React from "react";

interface DataTableFilterProps {
  data: TableRow[];
  onFilterChange: (filteredData: TableRow[]) => void;
}

export const DataTableFilter: React.FC<DataTableFilterProps> = ({
  data,
  onFilterChange,
}) => {
  const { filterValues, updateFilter, resetFilter } = useFilter();

  // Функция фильтрации данных
  const filterData = (filters: FilterValue[]): TableRow[] => {
    let filteredData = [...data];

    filters.forEach((filter) => {
      if (
        filter.value === null ||
        filter.value === undefined ||
        filter.value === ""
      ) {
        return;
      }

      switch (filter.fieldId) {
        case "id": {
          // Приводим к строке и затем используем toLowerCase
          const idValue = String(filter.value);
          filteredData = filteredData.filter((item) =>
            item.id.toLowerCase().includes(idValue.toLowerCase()),
          );
          break;
        }

        case "name": {
          // Приводим к строке и затем используем toLowerCase
          const nameValue = String(filter.value);
          filteredData = filteredData.filter((item) =>
            item.name.toLowerCase().includes(nameValue.toLowerCase()),
          );
          break;
        }

        case "value": {
          if (
            typeof filter.value === "object" &&
            "min" in filter.value &&
            "max" in filter.value
          ) {
            const min = filter.value.min ?? 0;
            const max = filter.value.max ?? Number.MAX_SAFE_INTEGER;
            filteredData = filteredData.filter(
              (item) => item.value >= min && item.value <= max,
            );
          } else if (typeof filter.value === "number") {
            filteredData = filteredData.filter(
              (item) => item.value === filter.value,
            );
          }
          break;
        }

        case "date": {
          let dateToFilter: Date;

          if (filter.value instanceof Date) {
            dateToFilter = filter.value;
          } else if (typeof filter.value === "string") {
            dateToFilter = new Date(filter.value);
          } else {
            break;
          }

          const filterDate = dateToFilter.toDateString();
          filteredData = filteredData.filter(
            (item) => new Date(item.date).toDateString() === filterDate,
          );

          break;
        }

        case "status": {
          if (typeof filter.value === "string") {
            filteredData = filteredData.filter(
              (item) => item.status === filter.value,
            );
          }
          break;
        }
        default:
          break;
      }
    });

    return filteredData;
  };

  const handleFilterChange = (values: FilterValue[]) => {
    updateFilter(values);
    const filteredData = filterData(values);
    onFilterChange(filteredData);
  };

  const handleApply = () => {
    const filteredData = filterData(filterValues);
    onFilterChange(filteredData);
  };

  const handleReset = () => {
    resetFilter();
    onFilterChange(data);
  };

  return (
    <Filter
      fields={filterFields}
      values={filterValues}
      onChange={handleFilterChange}
      onApply={handleApply}
      onReset={handleReset}
    />
  );
};
