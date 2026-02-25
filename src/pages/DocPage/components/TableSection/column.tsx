import { Column, Tag } from "@admiral-ds/react-ui";
import { EDocStatus, EDocType, EOrderStatus } from "@entities/documents/types";
import { TTag } from "@shared/types/types";
import React from "react";

export const orderStatusConfig: TTag<keyof typeof EOrderStatus> = {
  PASSED_VERIFICATION: {
    kind: "success",
    text: EOrderStatus.PASSED_VERIFICATION,
  },
  UNDER_VERIFICATION: {
    kind: "warning",
    text: EOrderStatus.UNDER_VERIFICATION,
  },
  DOCUMENT_ERROR: {
    kind: "danger",
    text: EOrderStatus.DOCUMENT_ERROR,
  },
};

export const statusConfig: TTag<keyof typeof EDocStatus> = {
  CREATED: {
    kind: "neutral",
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
  PROCESSED: {
    kind: "warning",
    text: EDocStatus.PROCESSED,
  },
  COMPLETED: {
    kind: "success",
    text: EDocStatus.COMPLETED,
  },
  ERROR: {
    kind: "danger",
    text: EDocStatus.ERROR,
  },
};

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
    renderCell: (status: string) => {
      const config = orderStatusConfig[status];

      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
  {
    name: "docType",
    title: "Вид документа",
    width: "14.2%",
    renderCell(docType): React.ReactNode {
      return EDocType[docType];
    },
  },
  {
    name: "status",
    title: "Статус обработки документа",
    width: "14.2%",
    renderCell: (status: string) => {
      const config = statusConfig[status];

      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
  {
    name: "availableAt",
    title: "Дата доступности записи для обработки",
    width: "14.2%",
  },
];
