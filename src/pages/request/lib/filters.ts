import { EventType, RequestStatus } from "@entities/request/model";
import { FilterVariant, IRenderField } from "@features/dynamic-filters";

const standardFields: IRenderField[] = [
  {
    id: "requestId",
    name: "requestId",
    type: "number",
    label: "Идентификатор записи",
    placeholder: "Введите идентификатор записи...",
    validate: (value) => {
      if (!value) return;

      if (Number(value) < 0) {
        return "Идентификатор не может быть меньше 0";
      }
    },
  },
  {
    id: "requestStatus",
    name: "requestStatus",
    type: "select",
    label: "Статус запроса",
    placeholder: "Введите статус запроса...",
    options: Object.entries(RequestStatus).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "eventType",
    name: "eventType",
    type: "select",
    label: "Тип события",
    placeholder: "Введите тип события...",
    options: Object.entries(EventType).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "date",
    name: "date",
    type: "date",
    label: "Дата поступления",
    placeholder: "Введите дату поступления...",
  },
];

const commonFields: IRenderField[] = [
  {
    id: "accountCode",
    name: "accountCode",
    type: "number",
    label: "Номер счёта",
    placeholder: "Введите номер счёта...",
  },
  {
    id: "inn",
    name: "inn",
    type: "number",
    label: "ИНН",
    placeholder: "Введите ИНН...",
    validate: (value) => {
      if (!value) return;

      if (!/^\d{10}(\d{2})?$/.test(String(value))) {
        return "ИНН должен содержать 10 или 12 цифр";
      }
    },
  },
];

export const filterVariants: FilterVariant[] = [
  { label: "Стандартный", fields: standardFields },
  { label: "Общий", fields: commonFields },
];
