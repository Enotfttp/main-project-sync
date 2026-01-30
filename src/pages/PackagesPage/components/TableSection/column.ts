import { Column } from "@admiral-ds/react-ui";
import { PackageStatusText } from "@entities/package/types";
import React from "react";

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "20%",
  },
  {
    name: "status",
    title: "Статус",
    width: "20%",
    renderCell(status): React.ReactNode {
      return PackageStatusText[status];
    },
  },
  {
    name: "accountNumber",
    title: "Номер счёта",
    width: "20%",
  },
  {
    name: "activationDateTime",
    title: "Дата подключения подписки",
    width: "20%",
    sortable: true,
    type: "date",
  },
  {
    name: "deactivationDateTime",
    title: "Дата отключения подписки",
    width: "20%",
  },
];
