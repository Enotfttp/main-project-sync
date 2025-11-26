import { FilterField } from "@shared/ui/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "client",
    name: "client",
    type: "text",
    label: "Клиент",
    placeholder: "Введите клиента...",
  },
  {
    id: "bankAccount",
    name: "bankAccount",
    type: "text",
    label: "Банковский счёт",
    placeholder: "Введите банковский счёт...",
  },
];
