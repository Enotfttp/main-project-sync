import { EOptionStatus } from "@entities/options/types";
import { RenderField } from "@features/Fields/RenderFields.types";

export const filterFields: RenderField[] = [
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
    options: Object.entries(EOptionStatus).map(([key, val]) => ({
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
