import { PackageStatusText } from "@entities/package/types";
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
    id: "inn",
    name: "inn",
    type: "text",
    label: "ИНН",
    placeholder: "Введите ИНН...",
  },
  {
    id: "accountNumber",
    name: "accountNumber",
    type: "text",
    label: "Номер счёта",
    placeholder: "Введите номер счёта...",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус",
    placeholder: "Выберите статус...",
    options: Object.entries(PackageStatusText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "activationDateTime",
    name: "activationDateTime",
    type: "date",
    label: "Дата подключения подписки",
    placeholder: "Введите дату подключения подписки...",
  },
  {
    id: "deactivationDateTime",
    name: "deactivationDateTime",
    type: "date",
    label: "Дата отключения подписки",
    placeholder: "Введите дату отключения подписки...",
  },
];
