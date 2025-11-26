import { Column, Tag } from "@admiral-ds/react-ui";
import React from "react";

export const statusConfig = {
  completed: {
    kind: "success" as const,
    text: "Выполнено",
    extraText: "Успешные операции",
  },
  danger: {
    kind: "danger" as const,
    text: "Ошибка",
    extraText: "Ошибки",
  },
  pending: {
    kind: "warning" as const,
    text: "В процессе",
    extraText: "Операции в процессе",
  },
};

export const columns: Column[] = [
  {
    title: "ID",
    name: "id",
    width: "12%",
  },
  {
    title: "Название",
    name: "name",
    width: "22%",
  },
  {
    title: "Значение",
    name: "value",
    renderCell: (value: number) => (
      <span style={{ fontWeight: 500 }}>{value}</span>
    ),
    width: "22%",
  },
  {
    title: "Дата",
    name: "date",
    width: "22%",
  },
  {
    title: "Статус",
    name: "status",
    width: "22%",
    renderCell: (status: string) => {
      const config = statusConfig[status as keyof typeof statusConfig];

      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
];
