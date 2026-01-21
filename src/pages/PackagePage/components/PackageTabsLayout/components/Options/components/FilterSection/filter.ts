import { OptionStatusText } from "@entities/options/types";
import { FilterField } from "@features/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "id",
    name: "id",
    type: "number",
    label: "Индификатор записи",
    placeholder: "Введите индификатор записи...",
  },
  {
    id: "optionSubscriptionId",
    name: "optionSubscriptionId",
    type: "text",
    label: "Индификатор подписки",
    placeholder: "Введите индификатор подписки...",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус",
    placeholder: "Выберите статус...",
    options: Object.entries(OptionStatusText).map(([key, val]) => ({
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
