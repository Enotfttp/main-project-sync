import { Column } from "@admiral-ds/react-ui";
import {
  DocStatusText,
  DocTypeText,
  OrderStatusText,
} from "@entities/documents/types";
import React from "react";

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "14.2%",
  },
  {
    name: "processDate",
    title: "Плановая дата обработки документа",
    width: "14.2%",
  },
  {
    name: "executionDate",
    title: "Дата окончания периода действия",
    width: "14.2%",
    sortable: true,
    type: "date",
  },
  {
    name: "orderStatus",
    title: "Статус исполнения документа РОЮЛ",
    width: "14.2%",
    renderCell(orderStatus): React.ReactNode {
      return orderStatus ? OrderStatusText[orderStatus] : "";
    },
  },
  {
    name: "docType",
    title: "Вид документа",
    width: "14.2%",
    renderCell(docType): React.ReactNode {
      return DocTypeText[docType];
    },
  },
  {
    name: "status",
    title: "Статус обработки документа",
    width: "14.2%",
    renderCell(status): React.ReactNode {
      return DocStatusText[status];
    },
  },
  {
    name: "availableAt",
    title: "Дата доступности записи для обработки",
    width: "14.2%",
  },
];
