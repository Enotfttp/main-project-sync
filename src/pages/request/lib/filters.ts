import { FilterVariant, IRenderField } from "@features/dynamic-filters";

const standartFields: IRenderField[] = [
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
    validate: (value) => {
      if (!value) return;

      if (!/^\d{10}(\d{2})?$/.test(String(value))) {
        return "ИНН должен содержать 10 или 12 цифр";
      }
    },
  },
  {
    id: "accountNumber",
    name: "accountNumber",
    type: "text",
    label: "Номер счёта",
    placeholder: "Введите номер счёта...",
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
    type: "date-range",
    label: "Дата отключения подписки",
    placeholder: "Введите дату отключения подписки...",
  },
];

const commonFields: IRenderField[] = [
  {
    id: "accountNumber",
    name: "accountNumber",
    type: "date",
    label: "Дата подключения подписки",
    placeholder: "Введите дату подключения подписки...",
  },
  {
    id: "accountNumber",
    name: "accountNumber",
    type: "date",
    label: "Дата подключения подписки",
    placeholder: "Введите дату подключения подписки...",
  },
];

export const filterVariants: FilterVariant[] = [
  { label: "Стандартный", fields: standartFields },
  { label: "Общий", fields: commonFields },
];
