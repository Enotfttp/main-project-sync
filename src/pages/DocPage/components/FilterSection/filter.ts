import { DocStatusText } from "@entities/documents/types";
import { FilterField } from "@shared/ui/Filter/Filter.types";

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
    type: "date",
    label: "Дата исполнения документа РОЮЛ",
    placeholder: "Введите дату исполнения документа РОЮЛ...",
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
