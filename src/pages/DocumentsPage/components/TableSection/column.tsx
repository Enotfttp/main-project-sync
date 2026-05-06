import { DocumentsInvoiceOutline } from "@admiral-ds/icons";
import { Column, DARK_THEME, LIGHT_THEME, Tag } from "@admiral-ds/react-ui";
import {
  EDocStatus,
  EDocType,
  EOrderStatus,
  EProcessDoc,
  ERequestProcessCode,
} from "@entities/documents/types";
import { normalizedDate } from "@shared/common";
import { TTag } from "@shared/types/types";
import React from "react";

export const orderStatusConfig = (
  theme: typeof DARK_THEME | typeof LIGHT_THEME,
): TTag<keyof typeof EOrderStatus> => ({
  CREATED: {
    text: EOrderStatus.CREATED,
    kind: {
      background: `var(--admiral-color-Neutral_Neutral50, ${theme.color["Neutral/Neutral 50"]})`,
    },
    icon: <DocumentsInvoiceOutline />,
  },
  FORMED: {
    kind: {
      background: `var(--admiral-color-Neutral_Neutral50, ${theme.color["Neutral/Neutral 50"]})`,
    },
    text: EOrderStatus.FORMED,
  },
  FRM_ERR: {
    kind: "danger",
    text: EOrderStatus.FRM_ERR,
  },
  SENT: {
    kind: "primary",
    text: EOrderStatus.SENT,
  },
  ACCEPTED: {
    kind: "success",
    text: EOrderStatus.ACCEPTED,
  },
  REJECTED: {
    kind: "danger",
    text: EOrderStatus.REJECTED,
  },
  KART: {
    kind: "primary",
    text: EOrderStatus.KART,
  },
  PROV: {
    kind: "success",
    text: EOrderStatus.PROV,
  },
  QUEUE: {
    kind: "warning",
    text: EOrderStatus.QUEUE,
  },
  REVOKED: {
    kind: "warning",
    text: EOrderStatus.REVOKED,
  },
  DELETED: {
    kind: "danger",
    text: EOrderStatus.DELETED,
  },
  OVRDUE_DEBT: {
    kind: "primary",
    text: EOrderStatus.OVRDUE_DEBT,
  },
  INVOICE_CREATED: {
    kind: "primary",
    text: EOrderStatus.INVOICE_CREATED,
  },
  INVOICE_PAYED: {
    kind: "success",
    text: EOrderStatus.INVOICE_PAYED,
  },
  INVOICE_DELETED: {
    kind: "danger",
    text: EOrderStatus.INVOICE_DELETED,
  },
});

export const statusConfig = (
  theme: typeof DARK_THEME | typeof LIGHT_THEME,
): TTag<keyof typeof EDocStatus> => ({
  CREATED: {
    kind: {
      background: `var(--admiral-color-Neutral_Neutral50, ${theme.color["Neutral/Neutral 50"]})`,
    },
    text: EDocStatus.CREATED,
  },
  SENT: {
    kind: "primary",
    text: EDocStatus.SENT,
  },
  DELIVERED: {
    kind: "warning",
    text: EDocStatus.DELIVERED,
  },
  VALIDATION_ERROR: {
    kind: "danger",
    text: EDocStatus.VALIDATION_ERROR,
  },
  ACCEPTED: {
    kind: "success",
    text: EDocStatus.ACCEPTED,
  },
  REJECTED: {
    kind: "danger",
    text: EDocStatus.REJECTED,
  },
  COMPLETED: {
    kind: "success",
    text: EDocStatus.COMPLETED,
  },
  ANNULLED: {
    kind: "danger",
    text: EDocStatus.ANNULLED,
  },
});

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "10%",
  },
  {
    name: "vkus",
    title: "Внутренний код учетного события",
    width: "10%",
  },
  {
    name: "orderStatus",
    title: "Статус исполнения документа РОЮЛ",
    width: "10%",
    renderCell: (status: string) => {
      const themeStorage = localStorage.getItem("theme");
      let shortNameTheme = "light";
      let config;
      if (themeStorage) {
        shortNameTheme = JSON.parse(themeStorage).state.shortNameTheme;
      }

      if (shortNameTheme === "dark") {
        config = orderStatusConfig(DARK_THEME)[status];
      } else {
        config = orderStatusConfig(LIGHT_THEME)[status];
      }
      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
  {
    name: "docType",
    title: "Вид документа",
    width: "10%",
    renderCell(docType): React.ReactNode {
      return EDocType[docType];
    },
  },
  {
    name: "processDocProcessCode",
    title: "Управляющий признак",
    width: "10%",
    renderCell(processDocProcessCode): React.ReactNode {
      return EProcessDoc[processDocProcessCode];
    },
  },
  {
    name: "requestProcessCode",
    title: "Код управляющего признака",
    width: "10%",
    renderCell(requestProcessCode): React.ReactNode {
      return ERequestProcessCode[requestProcessCode];
    },
  },
  {
    name: "processEndDate",
    title: "Дата и время окончания списания комиссии",
    width: "10%",
    renderCell(processEndDate): React.ReactNode {
      return normalizedDate(processEndDate);
    },
  },
  {
    name: "processAccDate",
    title: "Дата начала учёта требований",
    width: "10%",
    renderCell(processAccDate): React.ReactNode {
      return normalizedDate(processAccDate);
    },
  },
  {
    name: "attemptsCount",
    title: "Количество попыток отправки тикета",
    width: "10%",
  },
  {
    name: "status",
    title: "Статус обработки документа",
    width: "10%",
    renderCell: (status: string) => {
      const themeStorage = localStorage.getItem("theme");
      let shortNameTheme = "light";
      let config;
      if (themeStorage) {
        shortNameTheme = JSON.parse(themeStorage).state.shortNameTheme;
      }

      if (shortNameTheme === "dark") {
        config = statusConfig(DARK_THEME)[status];
      } else {
        config = statusConfig(LIGHT_THEME)[status];
      }
      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
];
