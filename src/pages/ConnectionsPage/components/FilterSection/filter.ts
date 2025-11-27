import { FilterField } from "@shared/ui/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "conNumber",
    name: "conNumber",
    type: "number",
    label: "Номер подключения",
    placeholder: "Введите номер подключения...",
  },
  {
    id: "conDate",
    name: "conDate",
    type: "date",
    label: "Дата подключения",
    placeholder: "Введите дату подключения...",
  },
  {
    id: "srvPackages",
    name: "srvPackages",
    type: "text",
    label: "Пакет услуг",
    placeholder: "Введите пакет услуг...",
  },
  {
    id: "srvOptions",
    name: "srvOptions",
    type: "text",
    label: "Опции ПУ",
    placeholder: "Введите опцию ПУ...",
  },
  {
    id: "dateBeg",
    name: "dateBeg",
    type: "date",
    label: "Дата начала",
    placeholder: "Введите дату начала...",
  },
  {
    id: "dateEnd",
    name: "dateEnd",
    type: "date",
    label: "Дата окончания",
    placeholder: "Введите дату окончания...",
  },
  {
    id: "dateClose",
    name: "dateClose",
    type: "date",
    label: "Дата прекращения действия",
    placeholder: "Введите дату прекращения действия...",
  },
];
