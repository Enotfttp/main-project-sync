import { FilterField } from "@shared/ui/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "eventDate",
    name: "eventDate",
    type: "date",
    label: "Дата события",
    placeholder: "Введите дату события...",
  },
  {
    id: "eventType",
    name: "eventType",
    type: "text",
    label: "Вид события",
    placeholder: "Введите вид события...",
  },
  {
    id: "rollbackDate",
    name: "rollbackDate",
    type: "date",
    label: "Дата отката события",
    placeholder: "Введите дату отката события...",
  },
  {
    id: "execDate",
    name: "execDate",
    type: "date",
    label: "Дата испольнения",
    placeholder: "Введите дату испольнения...",
  },
];
