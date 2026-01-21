import { DocStatusText } from "@entities/documents/types";
import { FilterField } from "@features/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "inn",
    name: "inn",
    type: "number",
    label: "Инн",
    placeholder: "Введите инн...",
  },
  {
    id: "executionDate",
    name: "executionDate",
    type: "date-range",
    required: true,
    dateDifference: "1m",
    label: "Даты исполнения документа РОЮЛ",
    errorText: "Разница должна не привышать 1 месяц",
    placeholder: "Введите даты исполнения документа РОЮЛ...",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус обработки документа",
    placeholder: "Выберите статус обработки документа...",
    options: Object.entries(DocStatusText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
];
