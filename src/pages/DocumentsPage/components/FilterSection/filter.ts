import {
  DocStatusText,
  DocTypeText,
  OrderStatusText,
} from "@entities/documents/types";
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
    id: "processDate",
    name: "processDate",
    type: "date",
    label: "Плановая дата обработки документа",
    placeholder: "Введите плановую дату обработки документа...",
  },
  {
    id: "executionDate",
    name: "executionDate",
    type: "date",
    label: "Дата исполнения документа РОЮЛ",
    placeholder: "Введите дату исполнения документа РОЮЛ...",
  },
  {
    id: "orderStatus",
    name: "orderStatus",
    type: "select",
    label: "Статус исполнения документа РОЮЛ",
    placeholder: "Выберите статус исполнения документа РОЮЛ...",
    options: Object.entries(OrderStatusText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "docType",
    name: "docType",
    type: "select",
    label: "Вид документа",
    placeholder: "Выберите вид документа...",
    options: Object.entries(DocTypeText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус обработки документа",
    placeholder: "Выберите статус обработки документа...",
    options: Object.entries(DocStatusText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "availableAt",
    name: "additionalAmount",
    type: "date",
    label: "Дата доступности записи для обработки",
    placeholder: "Введите дату доступности записи для обработки...",
  },
];
