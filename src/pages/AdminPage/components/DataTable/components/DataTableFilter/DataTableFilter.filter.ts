import { FilterField } from "@shared/ui/Filter/Filter.types.ts";

export const filterFields: FilterField[] = [
  {
    id: "id",
    name: "id",
    type: "text",
    label: "ID",
    placeholder: "Введите ID...",
  },
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Название",
    placeholder: "Введите название...",
  },
  {
    id: "value",
    name: "value",
    type: "range",
    label: "Значение",
    min: 0,
    max: 1000,
    step: 10,
  },
  {
    id: "date",
    name: "date",
    type: "date",
    label: "Дата",
    placeholder: "Выберите дату",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус",
    options: [
      {
        value: "completed",
        label: "Выполнено",
      },
      {
        value: "danger",
        label: "Ошибка",
      },
      {
        value: "pending",
        label: "В процессе",
      },
    ],
    placeholder: "Выберите статус",
  },
];
