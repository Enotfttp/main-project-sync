import { Column, Tag } from "@admiral-ds/react-ui";
import { EPackageStatus } from "@entities/package/types";
import { TTag } from "@shared/types/types";
import React from "react";

export const statusConfig: TTag<keyof typeof EPackageStatus> = {
  CREATED: {
    kind: "primary",
    text: EPackageStatus.CREATED,
  },
  ACTIVE: {
    kind: "success",
    text: EPackageStatus.ACTIVE,
  },
  INACTIVE: {
    kind: "neutral",
    text: EPackageStatus.INACTIVE,
  },
};

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
    renderCell: (status: string) => {
      const config = statusConfig[status];

      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
  {
    name: "optionSubscriptionId",
    title: "Индификатор подписки",
    width: "20%",
  },
  {
    name: "activationDateTime",
    title: "Дата подключения подписки",
    width: "20%",
  },
  {
    name: "deactivationDateTime",
    title: "Дата отключения подписки",
    width: "20%",
  },
];
