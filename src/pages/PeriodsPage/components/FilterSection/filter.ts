import {
  PeriodsResultTypeText,
  PeriodsStatusText,
} from "@entities/periods/types";
import { FilterField } from "@shared/ui/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "id",
    name: "id",
    type: "number",
    label: "Индификатор записи",
    placeholder: "Введите индификатор записи...",
  },
  {
    id: "resultType",
    name: "resultType",
    type: "select",
    label: "Статус оплаты",
    placeholder: "Введите cтатус оплаты...",
    options: Object.entries(PeriodsResultTypeText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "startDate",
    name: "startDate",
    type: "date",
    label: "Дата начала периода действия",
    placeholder: "Введите дату начала периода действия...",
  },
  {
    id: "endDate",
    name: "endDate",
    type: "date",
    label: "Дата окончания периода действия",
    placeholder: "Введите дату окончания периода действия...",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус",
    placeholder: "Выберите статус...",
    options: Object.entries(PeriodsStatusText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "amount",
    name: "amount",
    type: "number",
    label: "Сумма начисления в валюте",
    placeholder: "Введите сумму начисления в валюте...",
  },
  {
    id: "additionalAmount",
    name: "additionalAmount",
    type: "number",
    label: "Сумма доначисления в валюте",
    placeholder: "Введите сумму доначисления в валюте...",
  },
];
