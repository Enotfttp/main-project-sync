import {
  EDocStatus,
  EDocType,
  EOrderStatus,
  EProcessDoc,
  ERequestProcessCode,
} from "@entities/documents/types";
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
    id: "vkus",
    name: "vkus",
    type: "text",
    label: "Внутренний код учетного события",
    placeholder: "Введите внутренний код учетного события...",
  },
  {
    id: "orderStatus",
    name: "orderStatus",
    type: "select",
    label: "Статус исполнения документа РОЮЛ",
    placeholder: "Выберите статус исполнения документа РОЮЛ...",
    options: Object.entries(EOrderStatus).map(([key, val]) => ({
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
    options: Object.entries(EDocType).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "processDocProcessCode",
    name: "processDocProcessCode",
    type: "select",
    label: "Управляющий признак",
    placeholder: "Выберите управляющий признак...",
    options: Object.entries(EProcessDoc).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "requestProcessCode",
    name: "requestProcessCode",
    type: "select",
    label: "Код управляющего признака",
    placeholder: "Введите код управляющего признака...",
    options: Object.entries(ERequestProcessCode).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "processEndDate",
    name: "processEndDate",
    type: "date",
    label: "Дата и время окончания списания комиссии",
    placeholder: "Введите дату и время окончания списания комиссии...",
  },
  {
    id: "processAccDate",
    name: "processAccDate",
    type: "date",
    label: "Дата начала учёта требований",
    placeholder: "Введите дату начала учёта требований...",
  },
  {
    id: "attemptsCount",
    name: "attemptsCount",
    type: "number",
    label: "Количество попыток отправки тикета",
    placeholder: "Введите количество попыток отправки тикета...",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус обработки документа",
    placeholder: "Выберите статус обработки документа...",
    options: Object.entries(EDocStatus).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
];
