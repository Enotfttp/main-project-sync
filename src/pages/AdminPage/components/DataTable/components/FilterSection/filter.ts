import { RenderField } from "@features/Fields/RenderFields.types";

export const filterFields: RenderField[] = [
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
];
