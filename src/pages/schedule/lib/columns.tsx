import { Column } from "@admiral-ds/react-ui";
import { mapProcessCode } from "@entities/schedule/model";
import { ScheduleStatusTag } from "@entities/schedule/ui";
import { normalizedDate } from "@shared/lib";
import React from "react";

export const columnList: Column[] = [
  {
    name: "scheduleSourceGuid",
    title: "Идентификатор",
    width: "14%",
    sortable: true,
  },
  {
    name: "date",
    title: "Дата поступления",
    width: "13%",
    sortable: true,
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "scheduleStatus",
    title: "Статус графика",
    width: "13%",
    sortable: true,
    renderCell(status) {
      return <ScheduleStatusTag status={status} />;
    },
  },
  {
    name: "startDate",
    title: "Дата начала оплаты",
    width: "13%",
    sortable: true,
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "endDate",
    title: "Дата окончани оплаты",
    width: "13%",
    sortable: true,
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "amountFullCur",
    title: "Сумма оплаты",
    width: "12%",
    sortable: true,
  },
  {
    name: "priority",
    title: "Приоритет",
    width: "12%",
    sortable: true,
  },
  {
    name: "processCode",
    title: "Код управляющего признака",
    width: "12%",
    sortable: true,
    renderCell(status) {
      return mapProcessCode(status);
    },
  },
];
